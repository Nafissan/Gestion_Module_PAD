import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Participant } from "../../shared/model/participant.model";
import { ParticipantService } from "../../shared/service/participant.service";
import { DialogUtil } from "src/app/shared/util/util";
import { DialogConfirmationService } from "src/app/shared/services/dialog-confirmation.service";

@Component({
  selector: "app-add-update-participant-colonie",
  templateUrl: "./add-or-update-participant.component.html",
  styleUrls: ["./add-or-update-participant.component.scss"],
})
export class AddOrUpdateParticipantComponent implements OnInit {
  form: FormGroup;
  mode: "create" | "update" = "create";
  ficheSocial: File | null =null;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Participant,
    private dialogRef: MatDialogRef<AddOrUpdateParticipantComponent>,
    private fb: FormBuilder,
    private participantService: ParticipantService,
    private dialogConfirmationService: DialogConfirmationService
  ) {}

  ngOnInit() {
    if (this.defaults) {
      this.mode = "update";
    } else {
      this.defaults = {} as Participant;
    }

    this.form = this.fb.group({
      matriculeParent: [this.defaults.agentParent?.matricule || "", Validators.required], 
      nomParent: [this.defaults.agentParent?.nom || "", Validators.required], 
      prenomParent: [this.defaults.agentParent?.prenom || "", Validators.required], 
      nom: [this.defaults.nom || "", Validators.required],
      prenom: [this.defaults.prenom || "", Validators.required],
      sexe: [this.defaults.sexe || "", Validators.required],
      dateNaissance: [this.defaults.dateNaissance || "", Validators.required],
      lieuNaissance: [this.defaults.lieuNaissance || "", Validators.required],
      groupeSanguin: [this.defaults.groupeSanguin || "", Validators.required],
    });
  }
  
  isCreateMode() {
    return this.mode === "create";
  }
  
  isUpdateMode() {
    return this.mode === "update";
  }
  
  handleFicheSociale(files: FileList): void {
    this.ficheSocial = files.item(0);
  }
  
  save(): void {
    if (this.mode === "create") {
      this.createParticipant();
    } else if (this.mode === "update") {
      this.updateParticipant();
    }
  }
  
  createParticipant() {
    let formData: Participant =this.form.value;
    formData.ficheSocial = this.ficheSocial;
    console.log(formData);
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.participantService.addParticipant(formData).subscribe(() => {
          this.dialogRef.close(formData);
        });
      }
    });
  }
  
  updateParticipant() {
    let formData: Participant = this.form.value;
    formData.ficheSocial = this.ficheSocial;
    formData.id = this.defaults.id;
    console.log(formData);
    this.participantService.updateParticipant(formData).subscribe(() => {
      this.dialogRef.close(formData);
    });
  }
}
