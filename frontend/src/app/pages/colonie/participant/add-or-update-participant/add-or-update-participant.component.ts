import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Participant } from "../../shared/model/participant-colonie.model";
import { ParticipantService } from "../../shared/service/participant.service";
import { DialogUtil, NotificationUtil } from "src/app/shared/util/util";
import { DialogConfirmationService } from "src/app/shared/services/dialog-confirmation.service";
import { Compte } from "src/app/pages/gestion-utilisateurs/shared/model/compte.model";
import { Agent } from "src/app/shared/model/agent.model";
import { CompteService } from "src/app/pages/gestion-utilisateurs/shared/services/compte.service";
import { AuthenticationService } from "src/app/shared/services/authentification.service";
import { NotificationService } from "src/app/shared/services/notification.service";
import { AgentService } from "src/app/shared/services/agent.service";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

@Component({
  selector: "fury-add-update-participant-colonie",
  templateUrl: "./add-or-update-participant.component.html",
  styleUrls: ["./add-or-update-participant.component.scss"],
})
export class AddOrUpdateParticipantComponent implements OnInit {
  form: FormGroup;
  mode: "create" | "update" = "create";
  ficheSocial: string | null = null;
  document: string | null = null;
  photo: string | null = null;
  agent: Agent;
  compte: Compte;
  username: string;  photoURL: string | ArrayBuffer | null = null;
  agentParent: Agent;
  agents: string[] = [];  filteredAgents: Observable<string[]>;
  matriculeParentControl = new FormControl();
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Participant,
    private dialogRef: MatDialogRef<AddOrUpdateParticipantComponent>,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private compteService: CompteService,
    private participantService: ParticipantService,
    private notificationService: NotificationService,
    private agentService: AgentService,
    private dialogConfirmationService: DialogConfirmationService,
  ) {
    // Initialize form to avoid undefined issues
    this.form = this.fb.group({
      matriculeParent: this.matriculeParentControl,
      nomEnfant: ["", Validators.required],
      prenomEnfant: ["", Validators.required],
      sexe: ["", Validators.required],
      dateNaissance: ["", Validators.required],
      lieuNaissance: ["", Validators.required],
      groupeSanguin: ["", Validators.required],
      codeDossier: [null],
    });
  }

  async ngOnInit() {
    try {
      await this.getAgents();

      this.username = this.authService.getUsername();
  
      this.compteService.getByUsername(this.username).subscribe((response) => {
        this.compte = response.body;
        this.agent = this.compte.agent;
      });
  
      if (this.defaults) {
        this.mode = "update";
      } else {
        this.defaults = {} as Participant;
      }
  
      this.form.patchValue({
        matriculeParent: this.defaults.agentParent?.matricule || "",
        nomEnfant: this.defaults.nomEnfant || "",
        prenomEnfant: this.defaults.prenomEnfant || "",
        sexe: this.defaults.sexe || "",
        dateNaissance: this.defaults.dateNaissance || "",
        lieuNaissance: this.defaults.lieuNaissance || "",
        groupeSanguin: this.defaults.groupeSanguin || "",
        codeDossier: this.defaults.codeDossier?.code || null,
      });
  
      this.filteredAgents = this.matriculeParentControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || ''))
      );
  
    } catch (error) {
      console.error("Erreur lors de l'initialisation", error);
      this.notificationService.warn("Erreur lors de la récupération des données.");
    }
  }
  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.agents.filter(matricule => matricule.toLowerCase().includes(filterValue));
  }
  isCreateMode() {
    return this.mode === "create";
  }

  isUpdateMode() {
    return this.mode === "update";
  }

  async handleFicheSociale(files: FileList): Promise<void> {
    if (files.length > 0) {
      const file = files[0];
      
      if (!this.isValidPdfType(file)) {
        this.notificationService.warn('Le format de fichier doit être PDF.');
        return;
      }
  
      this.ficheSocial = await this.convertFileToBase64(file);
    }
  }
  
  async handleDocument(files: FileList): Promise<void> {
    if (files.length > 0) {
      const file = files[0];
      
      if (!this.isValidPdfType(file)) {
        this.notificationService.warn('Le format de fichier doit être PDF.');
        return;
      }
  
      this.document = await this.convertFileToBase64(file);
    }
  }
  
  async handlePhoto(files: FileList): Promise<void> {
    if (files.length > 0) {
      const file = files[0];
      
      if (!this.isValidFileType(file)) {
        this.notificationService.warn('Le format de fichier doit être JPG, JPEG ou PNG.');
        return;
      }
  
      this.photo = await this.convertFileToBase64(file);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.photoURL = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  private isValidPdfType(file: File): boolean {
    return file.type === 'application/pdf';
  }
  
  private isValidFileType(file: File): boolean {
    const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    return validFileTypes.includes(file.type);
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
        const base64Content = base64String.split(',')[1];
        resolve(base64Content);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  getAgents(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.agentService.getAgentsMatricules().subscribe(
        (response) => {
          this.agents = response.body as string[];
          console.log(this.agents.length);
          resolve();
        },
        (error) => {
          console.error("Erreur lors de la récupération des matricules", error);
          reject(error);
        }
      );
    });
  }
  
  getAgent(matricule: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.agentService.getAgentByMatricule(matricule).subscribe(
        (response) => {
          this.agentParent = response.body as Agent;
          console.log(this.agentParent);
          resolve();
        },
        (error) => {
          console.error("Erreur lors de la récupération de l'agent", error);
          reject(error);
        }
      );
    });
  }
  
  async createParticipant() {
    let formData: Participant = this.form.value;
    formData.ficheSocial = this.ficheSocial;
    formData.status = "A VALIDER";
    formData.document = this.document ? this.document : null;
    formData.photo = this.photo ? this.photo : null;
    formData.nomAgent = this.agent.nom;
    formData.prenomAgent = this.agent.prenom;
    formData.matriculeAgent = this.agent.matricule;  
    try {
      await this.getAgent(this.form.value.matriculeParent);
      console.log(this.agentParent);
  
      if (this.agentParent) {
        formData.agentParent = this.agentParent;
      }
  
      this.dialogConfirmationService.confirmationDialog().subscribe((action) => {
        if (action === DialogUtil.confirmer) {
          this.participantService.create(formData).subscribe(
            (response) => {
              let participantTem = response.body as Participant;
              if (participantTem.id != null) {
                this.notificationService.success(NotificationUtil.ajout);
                this.dialogRef.close(participantTem);
              } else {
                this.notificationService.warn("Erreur dans l'ajout du participant");
                this.dialogRef.close();
              }
            },
            (err) => {
              this.notificationService.warn(err);
            }
          );
        } else {
          this.dialogRef.close();
        }
      });
    } catch (error) {
      console.error("Erreur lors de la création du participant", error);
      this.notificationService.warn("Erreur lors de la récupération des informations du parent");
    }
  }
  
  updateParticipant() {
    let formData: Participant = this.form.value;
    formData.ficheSocial = this.defaults.ficheSocial;
    formData.id = this.defaults.id;
    formData.document = this.document ?  this.document : this.defaults.document;
    formData.photo = this.photo ?   this.photo : this.defaults.photo;
    formData.status = "A VALIDER";
    formData.nomAgent = this.defaults.nomAgent;
    formData.prenomAgent = this.defaults.prenomAgent;
    formData.matriculeAgent = this.defaults.matriculeAgent;
    formData.agentParent = this.defaults.agentParent;
    formData.codeDossier = this.defaults.codeDossier;


    this.dialogConfirmationService.confirmationDialog().subscribe((action) => {
      if (action === DialogUtil.confirmer) {
        this.participantService.updateParticipant( formData).subscribe(
          (response) => {
            this.notificationService.success(NotificationUtil.modification);
            this.dialogRef.close(formData);
          },
          (err) => {
            this.notificationService.warn(NotificationUtil.echec);
          }
        );
      } else {
        this.dialogRef.close();
      }
    });
  }
}
