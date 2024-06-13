import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Participant } from "../../shared/model/participant.model";
import { ParticipantService } from "../../shared/service/participant.service";
import { DialogUtil, NotificationUtil } from "src/app/shared/util/util";
import { DialogConfirmationService } from "src/app/shared/services/dialog-confirmation.service";
import { Compte } from "src/app/pages/gestion-utilisateurs/shared/model/compte.model";
import { Agent } from "src/app/shared/model/agent.model";
import { CompteService } from "src/app/pages/gestion-utilisateurs/shared/services/compte.service";
import { AuthenticationService } from "src/app/shared/services/authentification.service";
import { NotificationService } from "src/app/shared/services/notification.service";
import { AgentService } from "src/app/shared/services/agent.service";
import { DossierColonieService } from "../../shared/service/dossier-colonie.service";

@Component({
  selector: "app-add-update-participant-colonie",
  templateUrl: "./add-or-update-participant.component.html",
  styleUrls: ["./add-or-update-participant.component.scss"],
})
export class AddOrUpdateParticipantComponent implements OnInit {
  form: FormGroup;
  mode: "create" | "update" = "create";
  ficheSocial: string | null =null;
  document: string | null  =null;
  agent: Agent;
  compte: Compte;
  username: string;
  agents: any[] = []; //
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Participant,
    private dialogRef: MatDialogRef<AddOrUpdateParticipantComponent>,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private compteService: CompteService,
    private participantService: ParticipantService,
    private notificationService:NotificationService,
    private agentService: AgentService,
    private dialogConfirmationService: DialogConfirmationService,   
     private dossierColonieService: DossierColonieService // Inject the service

  ) {
  
  }

  ngOnInit() {
    this.username = this.authService.getUsername();

    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
    });
    this.getAgents();
    if (this.defaults) {
      this.mode = "update";
    } else {
      this.defaults = {} as Participant;
    }
    this.form = this.fb.group({
      matriculeParent: [this.defaults.matriculeParent || "", Validators.required], 
      nom: [this.defaults.nom || "", Validators.required],
      prenom: [this.defaults.prenom || "", Validators.required],
      sexe: [this.defaults.sexe || "", Validators.required],
      dateNaissance: [this.defaults.dateNaissance || "", Validators.required],
      lieuNaissance: [this.defaults.lieuNaissance || "", Validators.required],
      groupeSanguin: [this.defaults.groupeSanguin || "", Validators.required],
      codeDossier: [this.defaults.codeDossier.code || ""],
    });
  }
  
  isCreateMode() {
    return this.mode === "create";
  }
  
  isUpdateMode() {
    return this.mode === "update";
  }
  
  async handleFicheSociale(files: FileList): Promise<void> {
    if (files.length > 0) {
    this.ficheSocial = await this.convertFileToBase64(files[0]);
  }
}
  async handleDocument(files: FileList) {
    if (files.length > 0) {
      this.document= await this.convertFileToBase64(files[0]);
    }
  }
  save(): void {
    if (this.mode === "create") {
      this.createParticipant();
    } else if (this.mode === "update") {
      this.updateParticipant();
    }
  }
  async convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve(null);
      }
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }
  getAgents(): void {
    this.agentService.getAll().subscribe(
      (response) => {
        this.agents = response.body; // Assurez-vous que response.body contient bien la liste des agents
      },
      (error) => {
        console.error('Erreur lors de la récupération des agents', error);
      }
    );
  }
  createParticipant() {
    let formData: Participant =this.form.value;
    formData.ficheSocial = this.ficheSocial;
    formData.status = 'A VALIDER';
    formData.document = this.document;
    formData.nomAgent = this.agent.nom;
    formData.prenomAgent =this.agent.prenom;
    formData.matriculeAgent= this.agent.matricule;
     const matriculeParent = formData.matriculeParent;
     const selectedAgent = this.agents.find(agent => agent.matricule === matriculeParent);
     if (selectedAgent) {
       formData.nomParent = selectedAgent.nom;
       formData.prenomParent = selectedAgent.prenom;
     }
     this.dossierColonieService.getAll().subscribe(dossiersResponse => {
      const dossiers = dossiersResponse.body;
      const openOrSaisiDossier = dossiers.find(dossier => dossier.etat === 'ouvert' || dossier.etat === 'saisi');
      if (openOrSaisiDossier) {
        formData.codeDossier = openOrSaisiDossier;
      }});
    console.log(formData);
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.participantService.create(formData).subscribe((response) => {
          let participantTem =response.body;
          if(participantTem.id !=null){
            this.notificationService.success(NotificationUtil.ajout);
            this.dialogRef.close(formData);
          }else{
            this.notificationService.warn("Erreur dans l'ajout du participant");
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
  
  updateParticipant() {
    let formData: Participant = this.form.value;
    formData.ficheSocial = this.ficheSocial;
    formData.id = this.defaults.id;
    formData.document = this.document;
    console.log(formData);
     
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
    this.participantService.updateParticipant(this.defaults.id,formData).subscribe((response) => {
      this.notificationService.success(NotificationUtil.modification);
      this.dialogRef.close(formData);
    } ,err => {
      this.notificationService.warn(NotificationUtil.echec);
  },
  () => {})
   } else{
    this.dialogRef.close();
   }
  })
}
}
