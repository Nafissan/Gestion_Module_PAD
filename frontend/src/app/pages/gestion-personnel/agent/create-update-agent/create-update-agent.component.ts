import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { Agent } from "../../../../shared/model/agent.model";
import { AgentService } from "../../../../shared/services/agent.service";
import { AuthenticationService } from "../../../../shared/services/authentification.service";
import { Compte } from "../../../gestion-utilisateurs/shared/model/compte.model";
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, startWith } from 'rxjs/operators';
import { DialogConfirmationService } from "../../../../shared/services/dialog-confirmation.service";
import { fadeInUpAnimation } from "../../../../../@fury/animations/fade-in-up.animation";
import { Fonction } from "../../../gestion-unite-organisationnelle/shared/model/fonction.model";
import { UniteOrganisationnelle } from "../../../../shared/model/unite-organisationelle";
import { FonctionService } from "../../../gestion-unite-organisationnelle/shared/services/fonction.service";
import { UniteOrganisationnelleService } from "../../../gestion-unite-organisationnelle/shared/services/unite-organisationnelle.service";
import { ValidationChamps } from "../../../../shared/util/util";
import { NotificationService } from "src/app/shared/services/notification.service";


@Component({
  selector: "fury-create-update-agent",
  templateUrl: "./create-update-agent.component.html",
  styleUrls: ["./create-update-agent.component.scss"],
  animations: [fadeInUpAnimation],
})
export class CreateUpdateAgentComponent implements OnInit {
  mode: 'create' | 'update' = 'create';
  donneesPersoFormGroup: FormGroup;
  informationsPersoFormGroup: FormGroup;
  confirmationFormGroup: FormGroup;

  verticaldonneesPersoFormGroup: FormGroup;
  verticalinformationsPersoFormGroup: FormGroup;
  verticalconfirmationFormGroup: FormGroup;

  username: string;
  agent: Agent;
  compte: Compte;
  fonction: Fonction;
  form: FormGroup;
  matrimoniales = ["Célibataire", "Marié(e)", "Divorcé(e)", "Veu(f|ve)"]
  matrimoniale: string;
  fonctions: Fonction[];
  uniteOrganisationnelles: UniteOrganisationnelle[];
  uniteOrganisationnelle: UniteOrganisationnelle

  fonctionCtrl: FormControl = new FormControl();
  filteredFonctions: Observable<any[]>;

  uniteOrganisationnelleCtrl: FormControl;
  filteredUniteOrganisationnelles: Observable<any[]>;
  responsable: Agent;
  validationChamps:ValidationChamps

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<CreateUpdateAgentComponent>,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private agentService: AgentService,
    private fonctionService: FonctionService,
    private authService: AuthenticationService,
    private uniteOrganisationnelleService: UniteOrganisationnelleService,
  ) { }

  ngOnInit() {
    this.getUniteOrganisationnelle();
    this.getFonctions();
    this.validationChamps = new ValidationChamps();
    
    /**
 * Horizontal Stepper
 * @type {FormGroup}
 */
    this.donneesPersoFormGroup = this.fb.group({      
      id: [null],
      prenom: [null, Validators.required],
      nom: [null, Validators.required],
      matrimoniale: [null, Validators.required],
      dateNaissance: [null],
      lieuNaissance: [null],
      adresse: [null,],
      telephone: [null],
      email: [null, Validators.required],
      sexe: [null, Validators.required],
      
    });

    this.informationsPersoFormGroup = this.fb.group({
      matricule: [null, Validators.required],
      fonction: [null, Validators.required],
      uniteOrganisationnelle:[null, Validators.required],
      dateEngagement: [null],
      datePriseService: [null],
      profil: [null, Validators.required],
    });

    this.confirmationFormGroup = this.fb.group({
      estChef: [false]
    });
    this.uniteOrganisationnelleCtrl= new FormControl(); 
    if (this.defaults) {
      
      this.fonction = this.defaults.fonction;
      this.fonctionCtrl.setValue(this.fonction.nom)
      this.uniteOrganisationnelle = this.defaults.uniteOrganisationnelle;
      this.donneesPersoFormGroup.setValue({
        id: this.defaults.id,
        sexe: this.defaults.sexe,
        prenom: this.defaults.prenom,        
        nom: this.defaults.nom,
        matrimoniale: this.defaults.matrimoniale,
        dateNaissance: new Date(this.defaults.dateNaissance),
        lieuNaissance: this.defaults.lieuNaissance,
        adresse: this.defaults.adresse,
        telephone: this.defaults.telephone,
        email: this.defaults.email,
      });

      this.informationsPersoFormGroup.setValue({
        matricule: this.defaults.matricule,
        fonction: this.defaults.fonction.nom,
        profil: this.defaults.profil,
        dateEngagement: new Date(this.defaults.dateEngagement),
        datePriseService: new Date(this.defaults.datePriseService),
        uniteOrganisationnelle:this.defaults.uniteOrganisationnelle.nom,

      });

      this.confirmationFormGroup.setValue({
        estChef: this.defaults.estChef
      });
        this.mode = 'update';
      } else {
        this.mode = 'create';
      }
  }

  getUniteOrganisationnelle() {
    this.uniteOrganisationnelleService.getAll().subscribe(
      (response) => {
        this.uniteOrganisationnelles = response.body;
        if (this.defaults){
          this.uniteOrganisationnelle = this.defaults.uniteOrganisationnelle
        }
        else{  
         this.uniteOrganisationnelle = response.body[0];
        } 
      },
      (err) => { },
      () => {
        // Autocomplete
        this.filteredUniteOrganisationnelles = this.uniteOrganisationnelleCtrl.valueChanges.pipe(
          startWith(''), map(uniteOrganisationnelle => uniteOrganisationnelle ? this.filterUniteOrg(uniteOrganisationnelle) : this.uniteOrganisationnelles.slice())
        );
      }
    );
  }

  getFonctions() {
    this.fonctionService.getAll().subscribe(
      (response) => {
        this.fonctions = response.body;
        this.fonction = response.body[0];
      },
      (err) => { },
      () => {
        // Autocomplete
        this.filteredFonctions = this.fonctionCtrl.valueChanges.pipe(
          startWith(''), map(fonction => fonction ? this.filterFonctions(fonction) : this.fonctions.slice())
        );
      }
    );
  }

  submit() {
    if (this.mode === "create") {
      this.createAgent();
    } else if (this.mode === "update") {
      this.updateAgent();
    }
  }

  setUniteOrganisationnelle(uniteOrganisationnelle) {
    
    this.uniteOrganisationnelle = uniteOrganisationnelle;
    // this.getFonctionsByUnite(uniteOrganisationnelle.id)    
  }

  setFonction(fonction) {
    this.fonction = fonction;
  }


  createAgent() {
    let agent = this.donneesPersoFormGroup.value;
    agent.estChef = this.confirmationFormGroup.value.estChef;
    agent.sexe=this.donneesPersoFormGroup.value.sexe;
    agent.profil=this.informationsPersoFormGroup.value.profil;
    agent.matricule = this.informationsPersoFormGroup.value.matricule;
    agent.dateEngagement = this.informationsPersoFormGroup.value.dateEngagement;
    agent.datePriseService = this.informationsPersoFormGroup.value.datePriseService;
    agent.fonction = this.fonction;
    agent.uniteOrganisationnelle = this.uniteOrganisationnelle;
    this.responsable = null;
    this.agentService.getAgentResponsable(agent.uniteOrganisationnelle.id).subscribe(
      (response) => {
        this.responsable = response.body;
      },
      (err) => {
        this.agentService.create(agent).subscribe((response) => {
          this.dialogRef.close(response.body);
          this.notificationService.success('Enregistrement réussi!')
        }, (err) => {
          this.notificationService.warn('Echec de l\'enregistrement!');
          this.dialogRef.close(agent);
        },
        () => {})
      },
      () => {
        if (!agent.estChef || this.responsable == null || this.responsable != null && this.responsable.id == agent.id) {
          this.agentService.create(agent).subscribe((response) => {
            this.dialogRef.close(agent);
            this.notificationService.success('Enregistrement réussi!')
          }, (err) => {
            this.notificationService.warn('Agent déja enregistré');
            this.dialogRef.close(agent);
          },
          () => {})
        } else {
          this.notificationService.warn(this.responsable.prenom + ' ' + this.responsable.nom + ' est déja désigné(e) comme chef de cette unité organisationnelle!');
        }
      }
    );
  }

  updateAgent() {
    let agent = this.donneesPersoFormGroup.value;
    agent.estChef = this.confirmationFormGroup.value.estChef;
    agent.sexe = this.donneesPersoFormGroup.value.sexe;
    agent.profil = this.informationsPersoFormGroup.value.profil;
    agent.matricule = this.informationsPersoFormGroup.value.matricule;
    agent.dateEngagement = this.informationsPersoFormGroup.value.dateEngagement;
    agent.datePriseService = this.informationsPersoFormGroup.value.datePriseService;

    // if (this.fonction == undefined) this.fonction = this.defaults.fonction;
    agent.fonction = this.fonction;
    agent.uniteOrganisationnelle = this.uniteOrganisationnelle;
    this.responsable = null;
    this.agentService.getAgentResponsable(agent.uniteOrganisationnelle.id).subscribe(
      (response) => {
        this.responsable = response.body;
      },
      (err) => {
        this.agentService.update(agent).subscribe((response) => {
          this.dialogRef.close(agent);
          this.snackbar.open('Mise à jour réussie!', null, {
            duration: 5000
          });
        })
      },
      () => {
        if (!agent.estChef || this.responsable == null || this.responsable != null && this.responsable.id == agent.id) {
          this.agentService.update(agent).subscribe((response) => {
            this.dialogRef.close(agent);
            this.snackbar.open('Mise à jour réussie!', null, {
              duration: 5000
            });
          })
        } else {
          this.snackbar.open(this.responsable.prenom + ' ' + this.responsable.nom + ' est déja désigné(e) comme chef de cette unité organisationnelle!', null, {
            duration: 5000
          });
        }
      }
    );
  }

  filterFonctions(name: string) {
    // if(this.fonctions){}
    return this.fonctions.filter(fonction =>
      fonction.nom.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  filterUniteOrg(uniteOrg: string) {
    return this.uniteOrganisationnelles.filter(uniteOrganisationnelle =>
      uniteOrganisationnelle.nom.toLowerCase().indexOf(uniteOrg.toLowerCase()) === 0||
      uniteOrganisationnelle.description.toLowerCase().indexOf(uniteOrg.toLowerCase()) === 0);
  }

  isCreateMode() {
    return this.mode === "create";
  }

  isUpdateMode() {
    return this.mode === "update";
  }
}
