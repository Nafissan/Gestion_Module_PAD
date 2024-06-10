import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AuthenticationService } from "../../../../shared/services/authentification.service";
import { Agent } from "../../../../shared/model/agent.model";
import { RapportProspection } from "../../shared/model/rapport-prospection.model";
import { RapportProspectionService } from "../../shared/service/rapport-prospection.service";
import { DialogConfirmationService } from "../../../../shared/services/dialog-confirmation.service";
import { NotificationService } from "../../../../shared/services/notification.service";
import { DialogUtil, NotificationUtil } from "src/app/shared/util/util";
import * as moment from "moment";
import { Compte } from "src/app/pages/gestion-utilisateurs/shared/model/compte.model";
import { CompteService } from "src/app/pages/gestion-utilisateurs/shared/services/compte.service";

@Component({
  selector: "app-add-update-rapport-prospection",
  templateUrl: "./add-or-update-rapport-prospection.component.html",
  styleUrls: ["./add-or-update-rapport-prospection.component.scss"]
})
export class AddOrUpdateRapportProspectionComponent implements OnInit {
  form: FormGroup;
  agent: Agent;
  mode: "create" | "update" = "create";
  rapportProspection: RapportProspection;
  currentDate: Date = new Date();
  username: string;
  compte: Compte;
  fileRapportProspection: File | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: RapportProspection,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddOrUpdateRapportProspectionComponent>,
    private authService: AuthenticationService,    
    private compteService: CompteService,
    private rapportProspectionService: RapportProspectionService,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername();

    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
    });
    if (this.defaults) {
      this.mode = "update";
    } else {
      this.defaults = {} as RapportProspection;
    }

    this.form = this.fb.group({
      dateCreation: [this.defaults.dateCreation || this.currentDate, Validators.required],
      codeDossier: [ this.defaults.codeDossierColonie || "", Validators.required],
      etat: [ "A VALIDER" ],
    });

    // Désactiver le champ dateCreation en mode de mise à jour
    if (this.mode === "update") {
      this.form.get("dateCreation").disable();
    }
  }
  handleRapportProspection(files: FileList): void {
    this.fileRapportProspection = files.item(0);
  }
  save(): void {
  
      if (this.mode === "create") {
        this.createRapport();
      } else if (this.mode === "update") {
       this.updateRapportProspection();
      }

    
  }
createRapport(){
  if (this.form.valid) {
    const formData: RapportProspection = this.form.value;
  formData.dateCreation = this.currentDate; 
  formData.agent = this.agent; 
  formData.rapport= this.fileRapportProspection;
  console.log(formData);
  this.dialogConfirmationService.confirmationDialog().subscribe(action => {
    if (action === DialogUtil.confirmer) {
  this.rapportProspectionService.saveRapportProspection(formData).subscribe((response) => {
    if(response.body.id != null){
      this.notificationService.success(NotificationUtil.ajout);
      this.dialogRef.close(formData);

    }else{
      this.notificationService.warn("Erreur dans l'ajout du formulaire");
      this.dialogRef.close();
    }
  },err => {
    this.notificationService.warn(NotificationUtil.echec);
  });
} else {
  this.dialogRef.close();
}
});

}
}
updateRapportProspection(){
  if (this.form.valid) {
    const formData: RapportProspection = this.form.value;
  formData.id = this.defaults.id; // Assurez-vous d'avoir l'identifiant pour la mise à jour
  formData.agent = this.defaults.agent; // Conserver l'agent d'origine
  formData.dateCreation = this.defaults.dateCreation; // Conserver la date de création d'origine
  formData.rapport= this.fileRapportProspection;
  this.dialogConfirmationService.confirmationDialog().subscribe(action => {
    if (action === DialogUtil.confirmer) {
  this.rapportProspectionService.updateRapportProspection(formData).subscribe(() => {
    this.notificationService.success(NotificationUtil.modification);

    this.dialogRef.close(formData);
  },err => {
    this.notificationService.warn(NotificationUtil.echec);
},
() => {})
 } else{
  this.dialogRef.close();
 }
})
  }
}
  isCreateMode(): boolean {
    return this.mode === "create";
  }

  isUpdateMode(): boolean {
    return this.mode === "update";
  }

  resetFormAndCloseDialog(): void {
    this.form.reset();
    this.dialogRef.close();
  }
}
