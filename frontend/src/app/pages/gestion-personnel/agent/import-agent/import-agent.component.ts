import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { Agent } from "../../../../shared/model/agent.model";
import { AgentService } from "../../../../shared/services/agent.service";
import { AuthenticationService } from "../../../../shared/services/authentification.service";
import { Compte } from "../../../gestion-utilisateurs/shared/model/compte.model";
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { map, startWith } from 'rxjs/operators';
// import { FonctionService } from 'src/app/pages/gestion-unite-organisationnelle/shared/services/fonction.service';
// import { Fonction } from 'src/app/pages/gestion-unite-organisationnelle/shared/model/fonction.model';
import { Component, Inject, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Fonction } from "../../../gestion-unite-organisationnelle/shared/model/fonction.model";
import { FonctionService } from "../../../gestion-unite-organisationnelle/shared/services/fonction.service";
import { fadeInUpAnimation } from '../../../../../@fury/animations/fade-in-up.animation';
import { NotificationService } from "../../../../shared/services/notification.service";
import { UniteOrganisationnelleService } from "../../../gestion-unite-organisationnelle/shared/services/unite-organisationnelle.service";
import { UniteOrganisationnelle } from "../../../../shared/model/unite-organisationelle";
import { DialogConfirmationService } from "src/app/shared/services/dialog-confirmation.service";
import { DialogUtil } from "src/app/shared/util/util";
import { fadeInRightAnimation } from "src/@fury/animations/fade-in-right.animation";

type AOA = any[][];

@Component({
  selector: "fury-import-agent",
  templateUrl: "./import-agent.component.html",
  styleUrls: ["./import-agent.component.scss"],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class ImportAgentComponent implements OnInit {
  mode: 'create' | 'update' = 'create';
  username: string;
  agent: Agent;
  agents: Agent[];
  compte: Compte;
  fonction: Fonction;
  form: FormGroup;
  matrimoniales = ["Célibataire", "Marié(e)", "Divorcé(e)", "Veu(f|ve)"]
  matrimoniale: string;
  fonctions: Fonction[];
  uniteOrganisationnelles: UniteOrganisationnelle[];
  isFailedToLoad: Boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<ImportAgentComponent>,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private agentService: AgentService,
    private fonctionService: FonctionService,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private uniteOrganisationnelleService: UniteOrganisationnelleService,
    private dialogConfirmationService: DialogConfirmationService
  ) { }


  ngOnInit() {
    this.getAllUnites();
    this.getAllFonctions();
  }
  data: AOA = null;
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'agents.xlsx';

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));

    };
    reader.readAsBinaryString(target.files[0]);
  }


  createAgents() {
    let entete = this.data[0];
    if (entete[0].trim().toLowerCase() != 'matricule') return this.notificationService.warn(this.getMessageWarning('Matricule'));
    if (entete[1].trim().toLowerCase() != 'prénom') return this.notificationService.warn(this.getMessageWarning('Prenom'));
    if (entete[2].trim().toLowerCase() != 'nom') return this.notificationService.warn(this.getMessageWarning('Nom'));
    if (entete[3].trim().toLowerCase() != 'date naissance') return this.notificationService.warn(this.getMessageWarning('Date Naissance'));
    if (entete[4].trim().toLowerCase() != 'lieu de naissance') return this.notificationService.warn(this.getMessageWarning('Lieu de naissance'));
    if (entete[5].trim().toLowerCase() != 'adresse') return this.notificationService.warn(this.getMessageWarning('Adresse'));
    if (entete[6].trim().toLowerCase() != 'situation matrimoniale') return this.notificationService.warn(this.getMessageWarning('Situation matrimoniale'));
    if (entete[7].trim().toLowerCase() != 'genre') return this.notificationService.warn(this.getMessageWarning('Genre'));
    if (entete[8].trim().toLowerCase() != 'e-mail') return this.notificationService.warn(this.getMessageWarning('E-mail'));
    if (entete[9].trim().toLowerCase() != 'téléphone') return this.notificationService.warn(this.getMessageWarning('Téléphone'));
    if (entete[10].trim().toLowerCase() != 'date engagement') return this.notificationService.warn(this.getMessageWarning('Date engagement'));
    if (entete[11].trim().toLowerCase() != 'fonction') return this.notificationService.warn(this.getMessageWarning('Fonction'));
    if (entete[12].trim().toLowerCase() != 'unité organisationnelle') return this.notificationService.warn(this.getMessageWarning('Unité organisationnelle'));

    let agents: Agent[] = [];
    for (let index = 1; index < this.data.length; index++) {
      const agentInfos = this.data[index];
      let agent = new Agent();
      agent.matricule = agentInfos[0];
      agent.prenom = agentInfos[1].trim();
      agent.nom = agentInfos[2].trim();
      agent.dateNaissance = new Date(agentInfos[3]);
      agent.lieuNaissance = agentInfos[4].trim();
      agent.adresse = agentInfos[5].trim();
      agent.matrimoniale = agentInfos[6].trim();
      agent.sexe = agentInfos[7].trim();
      agent.email = agentInfos[8].trim();
      agent.telephone = agentInfos[9];
      agent.dateEngagement = new Date(agentInfos[10]);

      agent.fonction = this.getFonctionByNom(agentInfos[11].trim());
      agent.uniteOrganisationnelle = this.getUniteByCode(agentInfos[12].trim());

      agents.push(agent);      
    }
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
       if(action === DialogUtil.confirmer) {
        this.agentService.createAll(agents).subscribe((response) => {
          if (response.body.length > 0) {
            this.isFailedToLoad = true;
            this.data = [];
            this.data[0] = entete;
            
            for (let index = 0; index < response.body.length; index++) {
              const agent = response.body[index];        
              this.data[index + 1] = [agent.matricule, agent.prenom, agent.nom, agent.dateNaissance, agent.lieuNaissance, agent.adresse, agent.matrimoniale, agent.sexe, agent.email, agent.telephone, agent.dateEngagement,agent.fonction.nom, agent.uniteOrganisationnelle.code + ' - ' + agent.uniteOrganisationnelle.nom];
            }
          } else {
              this.dialogRef.close(response.body);
            }
          });
    }else{
      this.dialogRef.close();
    }
});
}

  getMessageWarning(message) {
    return 'La position de la colonne ' + message + ' est incorrecte. Veuillez consulter le template de chargement!';
  }
  getUniteByCode(code: string): UniteOrganisationnelle {
    code = code.substring(0, 5);
    return this.uniteOrganisationnelles.find(el => el.code === code);
  }
  getFonctionByNom(nom): Fonction {
    return this.fonctions.find(el => el.nom === nom);
  }
  isSetTable(): boolean {
    return this.data != null;
  }
  getAllUnites() {
    this.uniteOrganisationnelleService.getAll().subscribe(
      response => {
        this.uniteOrganisationnelles = response.body
      }
    )
  }
  getAllFonctions() {
    this.fonctionService.getAll().subscribe(
      response => {
        this.fonctions = response.body
      }
    )
  }
  export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
    this.isFailedToLoad = false
    this.dialogRef.close(null);
  }

}
