import { Component, Inject, OnInit } from '@angular/core';
import { Pelerin } from '../../shared/model/pelerin-pelerinage.model';
import { PelerinsService } from '../../shared/services/pelerin-pelerinage.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Compte } from 'src/app/pages/gestion-utilisateurs/shared/model/compte.model';
import { CompteService } from 'src/app/pages/gestion-utilisateurs/shared/services/compte.service';
import { Agent } from 'src/app/shared/model/agent.model';
import { AgentService } from 'src/app/shared/services/agent.service';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogUtil, NotificationUtil } from 'src/app/shared/util/util';

@Component({
  selector: 'fury-add-or-update-pelerin-pelerinage',
  templateUrl: './add-or-update-pelerin-pelerinage.component.html',
  styleUrls: ['./add-or-update-pelerin-pelerinage.component.scss']
})
export class AddOrUpdatePelerinPelerinageComponent implements OnInit {
  form: FormGroup;
  mode: "create" | "update" = "create";
  ficheSocial: string | null = null;
  document: string | null = null;
  passpord: string | null = null;
  agent: Agent;
  compte: Compte;
  username: string;  
  agents: string[] = [];  filteredAgents: Observable<string[]>;
  matriculeAgentControl = new FormControl();
  agentParent: Agent;
  constructor( @Inject(MAT_DIALOG_DATA) public defaults: Pelerin,
  private dialogRef: MatDialogRef<AddOrUpdatePelerinPelerinageComponent>,
  private fb: FormBuilder,
  private authService: AuthenticationService,
  private compteService: CompteService,
  private pelerinService: PelerinsService,
  private notificationService: NotificationService,
  private agentService: AgentService,
  private dialogConfirmationService: DialogConfirmationService,
) {
  // Initialize form to avoid undefined issues
  this.form = this.fb.group({
    matricule: this.matriculeAgentControl,
  });
}

  ngOnInit(): void {
    this.getAgents();

      this.username = this.authService.getUsername();
  
      this.compteService.getByUsername(this.username).subscribe((response) => {
        this.compte = response.body;
        this.agent = this.compte.agent;
      });
  
      if (this.defaults) {
        this.mode = "update";
      } else {
        this.defaults = {} as Pelerin;
      }
  
      this.form.patchValue({
        matricule: this.defaults.agent?.matricule || "",
      });
  
      this.filteredAgents = this.matriculeAgentControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || ''))
      );
  }
  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.agents.filter(matricule => matricule.toLowerCase().includes(filterValue));
  }
  isCreateMode() {
    return this.mode === "create";
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
  async handlePassport(files: FileList): Promise<void> {
    if (files.length > 0) {
      const file = files[0];
      
      if (!this.isValidPdfType(file)) {
        this.notificationService.warn('Le format de fichier doit être PDF.');
        return;
      }
  
      this.passpord = await this.convertFileToBase64(file);
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
  private isValidPdfType(file: File): boolean {
    return file.type === 'application/pdf';
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
  isUpdateMode() {
    return this.mode === "update";
  }
  getAgents() {
    this.agentService.getAgentsMatricules().subscribe(
      (response) => {
        this.agents = response.body as string[];
      },
      (error) => {
        console.error("Erreur lors de la récupération des matricules", error);
      }
    );
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
  
  async createPelerin() {
    let formData: Pelerin = this.form.value;
    formData.status = "A VERIFIER";
    formData.ficheMedical= this.ficheSocial? this.ficheSocial : this.defaults.ficheMedical;
    formData.document = this.document ? this.document : this.defaults.document;
    formData.passport = this.passpord ? this.passpord : this.defaults.passport;
    formData.nomAgent = this.agent.nom;
    formData.prenomAgent = this.agent.prenom;
    formData.matriculeAgent = this.agent.matricule; 
    formData.type = "emulation";
    try {
      await this.getAgent(this.form.value.matricule);  
      console.log(this.agentParent);
  
      if (this.agentParent) {
        formData.agent = this.agentParent;
      } 
      this.dialogConfirmationService.confirmationDialog().subscribe((action) => {
        if (action === DialogUtil.confirmer) {
          this.pelerinService.create(formData).subscribe(
            (response) => {
              let Pelerin = response.body as Pelerin;
              if (Pelerin.id != null) {
                this.notificationService.success(NotificationUtil.ajout);
                this.dialogRef.close(Pelerin);
              } else {
                this.notificationService.warn("Erreur dans l'ajout du pelerin");
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
      console.error("Erreur lors de la création du pelerin", error);
      this.notificationService.warn("Erreur lors de la récupération des informations du parent");
    }
  }
  
  updatePelerin() {
    let formData: Pelerin = this.form.value;
    formData.id = this.defaults.id;
    formData.document = this.document ?  this.document : this.defaults.document;
    formData.passport = this.passpord ?   this.passpord : this.defaults.passport;
    formData.status =this.defaults.status;
    formData.nomAgent = this.defaults.nomAgent;
    formData.prenomAgent = this.defaults.prenomAgent;
    formData.matriculeAgent = this.defaults.matriculeAgent;
    formData.agent = this.defaults.agent;
    formData.dossierPelerinage = this.defaults.dossierPelerinage;
    formData.type = this.defaults.type;
    formData.ficheMedical= this.ficheSocial? this.ficheSocial : this.defaults.ficheMedical;

    this.dialogConfirmationService.confirmationDialog().subscribe((action) => {
      if (action === DialogUtil.confirmer) {
        this.pelerinService.updatePelerin( formData).subscribe(
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
  save(): void {
    if (this.mode === "create") {
      this.createPelerin();
    } else if (this.mode === "update") {
      this.updatePelerin();
    }
  }
}
