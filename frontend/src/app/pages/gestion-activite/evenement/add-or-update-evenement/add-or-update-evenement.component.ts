import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AddOrUpdatePartenariatComponent } from 'src/app/pages/gestion-partenariat/partenariat/add-or-update-partenariat/add-or-update-partenariat.component';
import { Partenaire } from 'src/app/pages/gestion-partenariat/shared/model/partenaire.model';
import { PartenaireService } from 'src/app/pages/gestion-partenariat/shared/service/partenaire.service';
import { Compte } from 'src/app/pages/gestion-utilisateurs/shared/model/compte.model';
import { CompteService } from 'src/app/pages/gestion-utilisateurs/shared/services/compte.service';
import { TypePartenariatService } from 'src/app/pages/parametrage/shared/service/type-partenariat.service';
import { Agent } from 'src/app/shared/model/agent.model';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogUtil, NotificationUtil } from 'src/app/shared/util/util';
import { Evenement } from '../../shared/model/evenement.model';
import { EvenementService } from '../../shared/service/evenement.service';
@Component({
  selector: 'fury-add-or-update-evenement',
  templateUrl: './add-or-update-evenement.component.html',
  styleUrls: ['./add-or-update-evenement.component.scss' ,'../../../../shared/util/bootstrap4.css']
})
export class AddOrUpdateEvenementComponent implements OnInit {

  username: string;
  compte: Compte;
  agent: Agent;
  evenement: Evenement;
  //
  form: FormGroup;
  //
  partenaires: Partenaire[];
  mode: "create" | "update" = "create";

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Evenement,
    private dialogRef: MatDialogRef<AddOrUpdatePartenariatComponent>,
    private fb: FormBuilder,
    private evenementService: EvenementService,
    private partenaireService: PartenaireService,
    private typePartenaireService: TypePartenariatService,
    private authService: AuthenticationService,
    private compteService: CompteService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.username = this.authService.getUsername();
    this.getAllPartenaire();

    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
    });

    if (this.defaults) {
      this.mode = "update";
      this.evenement = this.defaults;
    

    } else {
      this.defaults = {} as Evenement;
    }

    // FormGroup
    this.form = this.fb.group({
      code: new FormControl(this.defaults.code ),
      libelle: new FormControl(this.defaults.libelle || "", [Validators.required,]),
      datedebut: [new Date(this.defaults.datedebut) || '', Validators.required],
      datefin: [new Date(this.defaults.datefin) || '', Validators.required],
      commentaire: new FormControl(this.defaults.commentaire|| "", [Validators.required,]),
      statut: new FormControl(this.defaults.statut?.toString()|| "1", [Validators.required,]),
      active: new FormControl(this.defaults.active || false, [Validators.required,]),
      partenaires: new FormControl(this.defaults.partenaires || "", [Validators.required,]),

    });
  }

  save() {
    if (this.mode === "create") {
      this.createEvenement();
    } else if (this.mode === "update") {
      this.updateEvenement();
    }
  }
  getAllPartenaire() {
    this.partenaireService.getAll()
      .subscribe(response => {
        this.partenaires = response.body;
      },
        (err) => { },
        () => {
      });
  }

  createEvenement() {
    let evenement: Evenement = this.form.value;

    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.evenementService.create(evenement).subscribe((response) => {
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

  updateEvenement() {
    let evenement: Evenement = this.form.value;
    evenement.id = this.defaults.id;
    evenement.datedebut = new Date(this.form.value.datedebut);
    evenement.datefin = new Date(this.form.value.datefin);
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        
        this.evenementService.update(evenement).subscribe((response) => {
          this.notificationService.success(NotificationUtil.modification);
          this.dialogRef.close(evenement);
          
        }, err => {
          this.notificationService.warn(NotificationUtil.echec);},
        () => { })
       } else {
        this.dialogRef.close();
      }
    })
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
