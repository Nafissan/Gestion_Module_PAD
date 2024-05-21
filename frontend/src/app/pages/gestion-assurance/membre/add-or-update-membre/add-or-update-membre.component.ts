
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Compte } from 'src/app/pages/gestion-utilisateurs/shared/model/compte.model';
import { CompteService } from 'src/app/pages/gestion-utilisateurs/shared/services/compte.service';
import { Agent } from 'src/app/shared/model/agent.model';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogUtil, NotificationUtil } from 'src/app/shared/util/util';
import { FormBuilder, FormGroup, Form, Validators, FormControl, FormArray, } from "@angular/forms";
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { Observable } from 'rxjs';
import { Membre } from '../../shared/model/membre.model';
import { MembreService } from '../../shared/service/membre.service';
import { AgentService } from 'src/app/shared/services/agent.service';
import { map, startWith } from 'rxjs/operators';
import { JoindrePhotoComponent } from '../joindre-photo/joindre-photo.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'fury-add-or-update-membre',
  templateUrl: './add-or-update-membre.component.html',
  styleUrls: ['./add-or-update-membre.component.scss','../../../../shared/util/bootstrap4.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],


})
export class AddOrUpdateMembreComponent implements OnInit {

  username: string;
  compte: Compte;
  agent: Agent;
  membre: Membre;
  membres: Membre[];
  agents: Agent[];
  filtereAgent: Observable<any[]>;
  agentCtrl: FormControl = new FormControl();
 
  filterePointfocal: Observable<any[]>;
  pointCtrl: FormControl = new FormControl();
  form: FormGroup;
  mode: "create" | "update" = "create";

   constructor(
     @Inject(MAT_DIALOG_DATA) public defaults: Membre,
     private dialogRef: MatDialogRef<AddOrUpdateMembreComponent>,
     private fb: FormBuilder,
     private membreService: MembreService,
     private authService: AuthenticationService,
     private compteService: CompteService,
     private agentService: AgentService,
     private dialog: MatDialog,
     private dialogConfirmationService: DialogConfirmationService,
     private notificationService:NotificationService,
     private snackbar: MatSnackBar,
   ) { }

   ngOnInit() {
     this.username = this.authService.getUsername();

     this.compteService.getByUsername(this.username).subscribe((response) => {
       this.compte = response.body;
       this.agent = this.compte.agent;
       this.getAgent();

      
     });
     if (this.defaults) {
      this.mode = "update";
      this.membre = this.defaults;
    } else {
      this.defaults = {} as Membre;
    }
     

     // FormGroup
     this.form = this.fb.group({
     
      code: new FormControl(this.defaults.code  ),
      active: new FormControl(this.defaults.active || false, [Validators.required,]),
      principale: new FormControl(this.defaults.principale|| false, [Validators.required,]),
      membres: this.fb.array([]),
     });

     
   }
   save() {
     if (this.mode === "create") {
       this.createMembre();
     } else if (this.mode === "update") {
       this.updateMembre();
     }
   }
  
   filterAgent(name: string) {
    return this.agents.filter(agent =>
      agent.matricule.toLowerCase().indexOf(name.toLowerCase()) === 0 ||
      agent.prenom.toLowerCase().indexOf(name.toLowerCase()) === 0 ||
      agent.nom.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }
  createMembre() {
    const membres = this.form.value?.membres?.map(membre => {
      membre.agent = this.agent
      return membre;
    });

    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.membreService.create(membres).subscribe((response) => {
          this.notificationService.success(NotificationUtil.ajout);
          this.dialogRef.close(response.body);
        }, err => {
          this.notificationService.warn(NotificationUtil.echec);
        },
          () => { });
      } else {
        this.dialogRef.close();
      }
    })

  };

updateMembre() {
    let membre: Membre = this.form.value;
    membre.id = this.defaults.id;
    

    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.membreService.update(membre).subscribe((response) => {
          this.notificationService.success(NotificationUtil.modification);
          this.dialogRef.close(membre);
        }, err => {
          this.notificationService.warn(NotificationUtil.echec);
        },
          () => { })
      } else {
        this.dialogRef.close();
      }
    })
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

  setAgent(agent) {
    this.agent = agent
  }
  
  joindrePhoto(membre: Membre){
    this.dialog
    .open(JoindrePhotoComponent,{
      data: membre,
    })
    .afterClosed()
    .subscribe((fileMetaData) => {
     if(fileMetaData){
      membre.fileMetaData = fileMetaData;
     }
      
    });

}
download(membre: Membre){
  this.membreService.download(membre).subscribe((response) => {
    let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });   
    const url = window.URL.createObjectURL(blob);
    importedSaveAs(blob, membre. fileMetaData.fileName);
    this.snackbar.open('Téléchargement réussie!', null, {
      duration: 5000
    });

  });
   
}
  addMembreField(): void {
 
    const membreFormGroup = this.fb.group({
      prenom: ["", ],
      nom: ["", ],
      age: ["", ],
    });

   
    (this.form.get("membres") as FormArray).push(membreFormGroup);
  }
  removeMembreField(index: number): void {

    const membreFormArray = this.form.get("membres") as FormArray;

    
    membreFormArray.removeAt(index);
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

function importedSaveAs(blob: any, fileName: any) {
  throw new Error('Function not implemented.');
}

