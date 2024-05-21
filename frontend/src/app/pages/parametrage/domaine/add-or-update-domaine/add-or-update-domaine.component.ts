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
import { Domaine } from '../../shared/model/domaine.model';

import { DomaineService } from '../../shared/service/domaine.service';

@Component({
  selector: 'fury-add-or-update-domaine',
  templateUrl: './add-or-update-domaine.component.html',
  styleUrls: ['./add-or-update-domaine.component.scss']
})
export class AddOrUpdateDomaineComponent implements OnInit {

 username: string;
 compte: Compte;
 agent: Agent;
 
 domaine: Domaine;
 form: FormGroup;
 mode: "create" | "update" = "create";

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Domaine,
    private dialogRef: MatDialogRef<AddOrUpdateDomaineComponent>,
    private fb: FormBuilder,
    private domaineService: DomaineService,
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
      this.domaine = this.defaults;
    } else {
      this.defaults = {} as Domaine;
    }
    
    // FormGroup
    this.form = this.fb.group({
      libelle: new FormControl(this.defaults.libelle || "", [Validators.required,]),
      type: new FormControl(this.defaults.type || "", [Validators.required,]),
      code: new FormControl(this.defaults.code ),
     
      active: new FormControl(this.defaults.active ),
    });
  }
  save() {
    if (this.mode === "create") {
      this.createDomaine();
    } else if (this.mode === "update") {
      this.updateDomaine();
    }
  }
  createDomaine() {
    let domaine: Domaine   = this.form.value;

    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.domaineService.create(domaine).subscribe((response) => {
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

  updateDomaine() {
    let domaine: Domaine    = this.form.value;
    domaine.id= this.domaine.id;

    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.domaineService.update(domaine).subscribe((response) => {
          this.notificationService.success(NotificationUtil.modification);
          this.dialogRef.close(domaine);
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

