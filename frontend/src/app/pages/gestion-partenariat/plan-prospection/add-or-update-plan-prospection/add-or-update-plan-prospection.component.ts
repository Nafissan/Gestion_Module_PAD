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
import { PlanProspection } from '../../shared/model/plan-prospection.model';
import { PlanProspectionService } from '../../shared/service/plan-prospection.service';
@Component({
  selector: 'fury-add-or-update-plan-prospection',
  templateUrl: './add-or-update-plan-prospection.component.html',
  styleUrls: ['./add-or-update-plan-prospection.component.scss']
})
export class AddOrUpdatePlanProspectionComponent implements OnInit {

 username: string;
 compte: Compte;
 agent: Agent;
 planprospection: PlanProspection;
 form: FormGroup;
 mode: "create" | "update" = "create";

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: PlanProspection,
    private dialogRef: MatDialogRef<AddOrUpdatePlanProspectionComponent>,
    private fb: FormBuilder,
    private planprospectionService: PlanProspectionService,
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
      this.planprospection = this.defaults;
    } else {
      this.defaults = {} as PlanProspection;
    }

    // FormGroup
    this.form = this.fb.group({
      
      libelle: new FormControl(this.defaults.libelle || "", [Validators.required,]),
      code: new FormControl(this.defaults.code ),
      annee: new FormControl(this.defaults.annee || "", [Validators.required,]),
      active: new FormControl(this.defaults.active || "", [Validators.required,]),
    });
  }
  save() {
    if (this.mode === "create") {
      this.createPlanProspection();
    } else if (this.mode === "update") {
      this.updatePlanProspection();
    }
  }
  createPlanProspection() {
    let planprospection: PlanProspection    = this.form.value;

    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.planprospectionService.create(planprospection).subscribe((response) => {
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

  updatePlanProspection() {
    let planprospection: PlanProspection    = this.form.value;
    planprospection.id = this.planprospection.id;

    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.planprospectionService.update(planprospection).subscribe((response) => {
          this.notificationService.success(NotificationUtil.modification);
          this.dialogRef.close(planprospection);
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
