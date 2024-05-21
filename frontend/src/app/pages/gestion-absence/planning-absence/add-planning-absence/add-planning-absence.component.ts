import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

import { Router, NavigationEnd } from '@angular/router';

import { Agent } from "../../../../shared/model/agent.model";
import { Compte } from "../../../gestion-utilisateurs/shared/model/compte.model";
import { AuthenticationService } from "../../../../shared/services/authentification.service";
import { CompteService } from "../../../gestion-utilisateurs/shared/services/compte.service";

import { UniteOrganisationnelle } from "../../../../shared/model/unite-organisationelle";
import { DialogConfirmationService } from "../../../../shared/services/dialog-confirmation.service";
import { DialogUtil } from "../../../../shared/util/util";
import { DossierAbsence } from "../../shared/model/dossier-absence.modele";
import { PlanningAbsence } from "../../shared/model/planning-absence.modele";
import { PlanningAbsenceService } from "../../shared/service/planning-absence.service";
import { DossierAbsenceService } from "../../shared/service/dossier-absence.service";
import { UniteOrganisationnelleService } from "../../../gestion-unite-organisationnelle/shared/services/unite-organisationnelle.service";
import { NotificationService } from "../../../../shared/services/notification.service";
import { fadeInRightAnimation } from "../../../../../@fury/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "../../../../../@fury/animations/fade-in-up.animation";


@Component({
  selector: 'fury-add-planning-absence',
  templateUrl: './add-planning-absence.component.html',
  styleUrls: ['./add-planning-absence.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class AddPlanningAbsenceComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  dialogUtil: DialogUtil = new DialogUtil();
  username: string;
  agent: Agent;
  uniteOrganisationnelle: UniteOrganisationnelle;
  compte: Compte;
  uniteSuperieureAgent:UniteOrganisationnelle;
  dossierAbsence: DossierAbsence;
   dossierAbsences:DossierAbsence[];
  // idDossierAbsence:number
 // etatPlanningConge: EtatPlanningConge = new EtatPlanningConge();
  idDossierAbsence: any

  annee: string;
  planningAbsence: PlanningAbsence;
  form: FormGroup;
  form1: FormGroup;
  mode: "create" | "update" = "create";
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: PlanningAbsence,
    private dialogRef: MatDialogRef<AddPlanningAbsenceComponent>,
    private fb: FormBuilder,
    private planningAbsenceService: PlanningAbsenceService,
    private router: Router,
    private authService: AuthenticationService,
    private compteService: CompteService,
    private dossierAbsenceService: DossierAbsenceService,
    private dialogConfirmationService: DialogConfirmationService,
    private uniteOrganisationnelleService:UniteOrganisationnelleService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {

   // this.getDossierAbsence();
    // Get ID Dossier Absence
     this.idDossierAbsence = this.router.url.slice(this.router.url.lastIndexOf('/') + 1);
    // PlanningDirectionen fonction de l'ID passe en parametre dans l'URL
    //this.getPlanningDirection();

    this.username = this.authService.getUsername();
    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
      this.uniteOrganisationnelle = this.agent.uniteOrganisationnelle;

      this.getUniteOrganisationnelleSuperieure();
    });

    if (this.defaults) {
      this.mode = "update";
    } else {
      this.defaults = {} as PlanningAbsence;
    }
    this.form = this.fb.group({
      // dateCreation: new FormControl(new Date(this.defaults.dateCreation) || "", [Validators.required]),
      // description: new FormControl(this.defaults.description || "", [
      //   Validators.required,
      // ]),
      // codePL: new FormControl({ value: this.defaults.code || "", disabled: true }),
    });
  

  this.form1 = this.fb.group({
    // dateCreation: new FormControl(new Date(this.defaults.dateCreation) || "", [Validators.required]),
    // description: new FormControl(this.defaults.description || "", [
    //   Validators.required,
    // ]),
    // codePL: new FormControl({ value: this.defaults.code || "", disabled: true }),
  });
}

  getUniteOrganisationnelleSuperieure() {
    let uniteOrganisationnelleSuperieures: UniteOrganisationnelle[];

    if (this.uniteOrganisationnelle.niveauHierarchique.position === 1 || this.uniteOrganisationnelle.niveauHierarchique.position === 0) {
      this.uniteSuperieureAgent = this.uniteOrganisationnelle;
      this.getDossierAbsence();
    }
     else {
      this.uniteOrganisationnelleService.getAllSuperieures(this.uniteOrganisationnelle.id)
        .subscribe(response => {
          uniteOrganisationnelleSuperieures = response.body;
          this.uniteSuperieureAgent = uniteOrganisationnelleSuperieures.find(e => e.niveauHierarchique.position === 1);
        }, err => {},
          () => {
            this.getDossierAbsence();
          });
    }
  }
  getDossierAbsence(){
    this.dossierAbsenceService.getAll()
            .subscribe(response => {
               this.dossierAbsences = response.body;
               this.dossierAbsences = this.dossierAbsences.filter(d => d.codeDirection === this.uniteSuperieureAgent.code);
              // this.dossierAbsence = this.dossierAbsences
               this.dossierAbsences.forEach(element => {
                 this.dossierAbsence = element;
               });
            }, err => {},
            () => {
            // this.subject$.next(this.dossierAbsences);
            });
  }


  save() {
    if (this.mode === "create") {
      this.createPlanningAbsence();
    } else if (this.mode === "update") {
      //this.updatePlanningConge();
    }
  }
  createPlanningAbsence() {
    let planningAbsence: PlanningAbsence = this.form.value;
    planningAbsence.dateCreation = new Date();
    this.annee = new Date(planningAbsence.dateCreation).getFullYear().toString();
    planningAbsence.code = "FA-" + this.uniteOrganisationnelle.code + "-" + this.annee;
   // planningAbsence.etat = this.saisi;

   planningAbsence.dossierAbsence = this.dossierAbsence;
   planningAbsence.uniteOrganisationnelle = this.uniteOrganisationnelle;

   planningAbsence.description = "Feuille D'absence "+ this.annee + "- "+this.uniteOrganisationnelle.nom
   if(planningAbsence.dossierAbsence ===  undefined){
     //this.notificationService.warn('Le dossier d\'absence de la direction doit exister d\'abord');
     this.createDossierAbsence();
  }else{
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.planningAbsenceService.create(planningAbsence).subscribe((response) => {
          this.dialogRef.close(response.body);
        })
      }
      else {
        this.dialogRef.close();
      }
    })
   }
  }
  // updatePlanningConge() {
  //   let planningConge: PlanningConge = this.form.value;
  //   planningConge.id = this.defaults.id;
  //   planningConge.code = this.defaults.code;
  //   planningConge.etat = this.defaults.etat;
  //   planningConge.dateCreation = new Date(this.defaults.dateCreation);
  //   planningConge.planningDirection = this.defaults.planningDirection;
  //   planningConge.uniteOrganisationnelle = this.defaults.uniteOrganisationnelle;

  //   this.dialogConfirmationService.confirmationDialog().subscribe(action => {
  //     if (action === this.dialogUtil.confirmer) {
  //       this.planningCongeService.update(planningConge).subscribe((response) => {
  //         this.dialogRef.close(planningConge);
  //       })
  //     }
  //     else {
  //       this.dialogRef.close();
  //     }
  //   })
  // }
  isCreateMode() {
    return this.mode === "create";
  }

  isUpdateMode() {
    return this.mode === "update";
  }


  createDossierAbsence() {
    let dossierAbsence: DossierAbsence = this.form1.value;

    dossierAbsence.matricule = this.agent.matricule;
    dossierAbsence.prenom = this.agent.prenom;
    dossierAbsence.nom = this.agent.nom;
    dossierAbsence.fonction = this.agent.fonction.nom;
    dossierAbsence.annee = new Date().getFullYear();
    dossierAbsence.codeDirection = this.uniteSuperieureAgent.code;
    dossierAbsence.code = "DA-" + dossierAbsence.annee + "-" +this.uniteSuperieureAgent.nom;
    dossierAbsence.nomDirection = this.uniteSuperieureAgent.nom;
    dossierAbsence.description = "Dossier Absence-"+ this.uniteSuperieureAgent.description;

        this.dossierAbsenceService.create(dossierAbsence).subscribe((response) => {
           this.dossierAbsence = response.body;
        },(err)=>{
        },()=>{
    
          let planningAbsence: PlanningAbsence = this.form.value;
          planningAbsence.dateCreation = new Date();
          this.annee = new Date(planningAbsence.dateCreation).getFullYear().toString();
          planningAbsence.code = "FA-" + this.uniteOrganisationnelle.code + "-" + this.annee;
         // planningAbsence.etat = this.saisi;
      
         planningAbsence.dossierAbsence = this.dossierAbsence;
         planningAbsence.uniteOrganisationnelle = this.uniteOrganisationnelle;
      
        
         planningAbsence.description = "Feuille D'absence "+ this.annee + "- "+this.uniteOrganisationnelle.nom

          this.dialogConfirmationService.confirmationDialog().subscribe(action => {
            if (action === DialogUtil.confirmer) {
              this.planningAbsenceService.create(planningAbsence).subscribe((response) => {
                this.dialogRef.close(response.body);
              })
            }
            else {
              this.dialogRef.close();
            }
          });
      }
        )}



//   createDossierInterim() {

//     let dossierInterim: DossierInterim;

//    dossierInterim  = this.form.value
//     dossierInterim.annee = 2020;
//     dossierInterim.nom = "Dossier-" +this.uniteSuperieureAgent.nom
//     dossierInterim.uniteOrganisationnelle = this.uniteSuperieureAgent
//     dossierInterim.code = this.uniteSuperieureAgent.code;
//     dossierInterim.description = "Dossier Interim "+this.uniteSuperieureAgent.nom + 2020;   
//     this.dossierInterimService.create(dossierInterim).subscribe(
//       response => { 
//         this.dossierInterim = response.body;   
      
//       },
//       (err) => {
//       }
//       ,
//       () => {
//         this.form.value.agentDepart = this.agentDepart;
//         let interim = this.form.value;
//         interim.dateSaisie = new Date
//         interim.etat = this.etatInterim.saisir
//         interim.agentArrive = this.agentArrive;
//         interim.uniteOrganisationnelle = this.uniteOrganisationnelle;
//         interim.dossierInterim = this.dossierInterim;
//     if(interim.agentDepart ===   interim.agentArrive){
//        this.notificationService.warn('l\'agent depart et l\'agent d\'arrivé ne doit pas etre le meme');
//     }else{
//       this.interimService.create(interim).subscribe(
//            response => { 
//             this.notificationService.success(NotificationUtil.ajout);     
//             this.dialogRef.close(response.body);
//            }
//       );
//   }
// });}
}
