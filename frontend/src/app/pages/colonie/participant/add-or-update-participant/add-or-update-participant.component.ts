import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Participant } from "../../shared/model/participant.model";
import { ParticipantService } from "../../shared/service/participant.service";

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
    private participantService: ParticipantService
  ) {}

  ngOnInit() {
    if (this.defaults) {
      this.mode = "update";
    } else {
      this.defaults = {} as Participant;
    }

    this.form = this.fb.group({
      matriculeParent: [this.defaults.agentParent?.matricule || "", Validators.required], // Utilisez matriculeParent pour le matricule de l'agent
      nomParent: [this.defaults.agentParent?.nom || "", Validators.required], // Utilisez nomParent pour le nom de l'agent
      prenomParent: [this.defaults.agentParent?.prenom || "", Validators.required], // Utilisez prenomParent pour le prénom de l'agent
      nom: [this.defaults.nom || "", Validators.required],
      prenom: [this.defaults.prenom || "", Validators.required],
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
  save() {
    const participant: Participant = this.form.value;
    participant.ficheSocial = this.ficheSocial;
    if (this.mode === "create") {
      this.participantService.addParticipant(participant);
    } else if (this.mode === "update") {
      participant.id = this.defaults.id;
      this.participantService.updateParticipant(participant);
    }
    this.dialogRef.close();
  }
}
