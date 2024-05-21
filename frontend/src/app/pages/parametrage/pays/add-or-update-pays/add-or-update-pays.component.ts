import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Compte } from 'src/app/pages/gestion-utilisateurs/shared/model/compte.model';
import { CompteService } from 'src/app/pages/gestion-utilisateurs/shared/services/compte.service';
import { Agent } from 'src/app/shared/model/agent.model';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogUtil, NotificationUtil } from 'src/app/shared/util/util';
import { Pays } from '../../shared/model/pays.model';
import { PaysService } from '../../shared/service/pays.service';

@Component({
  selector: 'fury-add-or-update-pays',
  templateUrl: './add-or-update-pays.component.html',
  styleUrls: ['./add-or-update-pays.component.scss']
})
export class AddOrUpdatePaysComponent implements OnInit {

 username: string;
 compte: Compte;
 agent: Agent;
 pays: Pays;
 form: FormGroup;
 mode: "create" | "update" = "create";

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Pays,
    private dialogRef: MatDialogRef<AddOrUpdatePaysComponent>,
    private fb: FormBuilder,
    private paysService: PaysService,
    private authService: AuthenticationService,
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
    });

    if (this.defaults) {
      this.mode = "update";
      this.pays = this.defaults;
    } else {
      this.defaults = {} as Pays;
    }

    // FormGroup
    this.form = this.fb.group({
      nom: new FormControl(this.defaults.nom || "", [Validators.required,]),
      nomOfficiel: new FormControl(this.defaults.nom || "", [Validators.required,]),
      code: new FormControl(this.defaults.code || "", [Validators.required,]),
      image: new FormControl(this.defaults.image || "", [Validators.required,]),
      latitude: new FormControl(this.defaults.latitude || "", [Validators.required,]),
      longitude: new FormControl(this.defaults.longitude || "", [Validators.required,]),
      zoom: new FormControl(this.defaults.latitude || "", [Validators.required,]),
      active: new FormControl(this.defaults.active || false, [Validators.required,]),
    });
  }
  save() {
    if (this.mode === "create") {
      this.createPays();
    } else if (this.mode === "update") {
      this.updatePays();
    }
  }
  createPays() {
    let pays: Pays    = this.form.value;

    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.paysService.create(pays).subscribe((response) => {
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

  updatePays() {
    let pays: Pays    = this.form.value;
    Object.assign(pays, this.pays);

    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.paysService.update(pays).subscribe((response) => {
          this.notificationService.success(NotificationUtil.modification);
          this.dialogRef.close(pays);
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
}
