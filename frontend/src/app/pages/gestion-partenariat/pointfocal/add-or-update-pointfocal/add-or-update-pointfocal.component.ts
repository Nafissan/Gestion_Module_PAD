
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Compte } from 'src/app/pages/gestion-utilisateurs/shared/model/compte.model';
import { CompteService } from 'src/app/pages/gestion-utilisateurs/shared/services/compte.service';
import { Agent } from 'src/app/shared/model/agent.model';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogUtil, NotificationUtil } from 'src/app/shared/util/util';
import { FormBuilder, FormGroup, Form, Validators, FormControl, } from "@angular/forms";
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pointfocal } from '../../shared/model/pointfocal.model';
import { UniteOrganisationnelle } from 'src/app/shared/model/unite-organisationelle';
import { PointfocalService } from '../../shared/service/pointfocal.service';
import { UniteOrganisationnelleService } from 'src/app/pages/gestion-unite-organisationnelle/shared/services/unite-organisationnelle.service';
import { AgentService } from 'src/app/shared/services/agent.service';


@Component({
  selector: 'fury-add-or-update-pointfocal',
  templateUrl: './add-or-update-pointfocal.component.html',
  styleUrls: ['./add-or-update-pointfocal.component.scss','../../../../shared/util/bootstrap4.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],


})
export class AddOrUpdatePointfocalComponent implements OnInit {

  username: string;
  compte: Compte;
  agent: Agent;
  pointfocal: Pointfocal;
  pointfocals: Pointfocal[];
  agents: Agent[];
  unites: UniteOrganisationnelle[];
  unite: UniteOrganisationnelle;
  filtereUnite: Observable<any[]>;
  uniteCtrl: FormControl = new FormControl();
  filtereAgent: Observable<any[]>;
  agentCtrl: FormControl = new FormControl();
  form: FormGroup;
  mode: "create" | "update" = "create";

   constructor(
     @Inject(MAT_DIALOG_DATA) public defaults: Pointfocal,
     private dialogRef: MatDialogRef<AddOrUpdatePointfocalComponent>,
     private fb: FormBuilder,
     private pointfocalService: PointfocalService,
     private uniteService: UniteOrganisationnelleService,
     private authService: AuthenticationService,
     private agentService: AgentService,
     private compteService: CompteService,
     private dialog: MatDialog,
     private dialogConfirmationService: DialogConfirmationService,
     private notificationService:NotificationService,
   ) { }

   ngOnInit() {
     this.username = this.authService.getUsername();

     this.compteService.getByUsername(this.username).subscribe((response) => {
       this.compte = response.body;
       this.agent = this.compte.agent;
       this.getUnite();
      this.getAgent();
     });

     if (this.defaults) {
       this.uniteCtrl.setValue(this.defaults.unite.description);
       this.mode = "update";
       this.pointfocal = this.defaults;
     } else {
       this.defaults = {} as Pointfocal;
     }

     // FormGroup
     this.form = this.fb.group({
      
      code: new FormControl(this.defaults.code ),
      
      active: new FormControl(this.defaults.active || false, [Validators.required,]),
      
     });

     
   }
   save() {
     if (this.mode === "create") {
       this.createPointfocal();
     } else if (this.mode === "update") {
       this.updatePointfocal();
     }
   }
   filterUnite(name: string) {
    return this.unites.filter(unite =>
      unite.code.toLowerCase().indexOf(name.toLowerCase()) === 0 ||
      unite.description.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }
  filterAgent(name: string) {
    return this.agents.filter(agent =>
      agent.matricule.toLowerCase().indexOf(name.toLowerCase()) === 0 ||
      agent.prenom.toLowerCase().indexOf(name.toLowerCase()) === 0 ||
      agent.nom.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }

  createPointfocal() {
     let pointfocal: Pointfocal   = this.form.value;
     pointfocal.unite = this.unite;
     pointfocal.agent = this.agent;
    console.log(pointfocal);
    
     this.dialogConfirmationService.confirmationDialog().subscribe(action => {
       if (action === DialogUtil.confirmer) {
         this.pointfocalService.create(pointfocal).subscribe((response) => {
             this.notificationService.success(NotificationUtil.ajout);
             this.dialogRef.close(response.body);
         }, err => {
           this.notificationService.warn(NotificationUtil.echec);},
         () => {});
       } else {
         this.dialogRef.close();
       }
     })

   };

   updatePointfocal() {
    let pointfocal: Pointfocal    = this.form.value;
    pointfocal.id= this.pointfocal.id;

    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
      //  if (this.pointfocal == null) {
      //    pointfocal.unite = this.defaults.unite;
      //  } else {
      //    pointfocal.unite = this.unite;
      //  }
      //  if (this.pointfocal == null) {
      //   pointfocal.agent = this.defaults.agent;
      // } else {
      //   pointfocal.agent = this.agent;
      // }
        this.pointfocalService.update(pointfocal).subscribe((response) => {
          this.notificationService.success(NotificationUtil.modification);
          this.dialogRef.close(pointfocal);
        }, err => {
          this.notificationService.warn(NotificationUtil.echec);},
        () => { })
       } else {
        this.dialogRef.close();
      }
    })
  }
   getUnite() {
    this.uniteService. getAll().subscribe(
      (response) => {
        this.unites = response.body;
      },err =>{

      },() => {
        this.filtereUnite = this.uniteCtrl.valueChanges.pipe(
          startWith(''),
          map(unite => unite ? this.filterUnite(unite) : this.unites.slice())
        );
        // this.listpartenaire = this.partenaires.filter(partenaire =>
        //   partenaire.partenaire==true
         
         
        // );
      }
    );
  }
  getAgent() {
    this.agentService.getAll().subscribe(
      (response) => {
        this.agents = response.body;
      },err =>{

      },() => {
        this.filtereAgent = this.agentCtrl.valueChanges.pipe(
          startWith(''),
          map(agent=> agent ? this.filterAgent(agent) : this.agents.slice())
        );
      }
    );
  }
  setUnite(unite) {
    this.unite = unite
  }
  setAgent(agent) {
    this.agent = agent
  }

   isCreateMode() {
     return this.mode === "create";
   }

   isUpdateMode() {
     return this.mode === "update";
   }
   compareObjects(o1: any, o2: any): boolean {
    if (o1 && o2) return o1.id === o2.id;
  }

}
