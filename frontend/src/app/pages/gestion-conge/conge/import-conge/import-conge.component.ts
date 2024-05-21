import { Component, OnInit, Inject } from '@angular/core';
import * as XLSX from 'xlsx';
import { fadeInUpAnimation } from '../../../../../@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from '../../../../../@fury/animations/fade-in-right.animation';
import { CongeService } from '../../shared/services/conge.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { Conge } from '../../shared/model/conge.model';
import { PlanningConge } from '../../shared/model/planning-conge.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AgentService } from '../../../../shared/services/agent.service';
import { UniteOrganisationnelle } from '../../../../shared/model/unite-organisationelle';
import { Agent } from '../../../../shared/model/agent.model';
import { DialogConfirmationService } from '../../../../shared/services/dialog-confirmation.service';
import { DialogUtil, NotificationUtil } from '../../../../shared/util/util';
import { EtatPlanningConge, EtatConge } from '../../shared/util/util';
import { PlanningCongeService } from '../../shared/services/planning-conge.service';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
type AOA = any[][];
@Component({
  selector: 'fury-import-conge',
  templateUrl: './import-conge.component.html',
  styleUrls: ['./import-conge.component.scss', '../../../../shared/util/bootstrap4.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class ImportCongeComponent implements OnInit {
  planningconge: PlanningConge;
  unite: UniteOrganisationnelle;
  agents: Agent[] = [];

  editField: string;

  dataWithError = [];
  dataSaved = [];
  data: AOA = null;
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'conges.xlsx';
  isFailedToLoad: Boolean = false;
  constructor(
    private congeService: CongeService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<ImportCongeComponent>,
    private agentService: AgentService,
    private dialogConfirmationService: DialogConfirmationService,
    private planningService: PlanningCongeService,
  ) { }

  ngOnInit(): void {
  registerLocaleData(localeFr, 'fr');
  this.planningconge = this.defaults.planningconge;
  this.unite         = this.defaults.unite;
  this.getAllAgentsSansConge(); 
  }
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
  isSetTable(): boolean {
    return this.data != null;
  }
  getMessageWarning(message) {
    return 'La position de la colonne ' + message + ' est incorrecte. Veuillez consulter le template de chargement!';
  }
  export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
  createConges(){ 
    let entete = this.data[0];
    if (entete[0].trim().toLowerCase() != 'matricule') return this.notificationService.warn(this.getMessageWarning('Matricule'));
    if (entete[1].trim().toLowerCase() != 'prenom') return this.notificationService.warn(this.getMessageWarning('Prenom'));
    if (entete[2].trim().toLowerCase() != 'nom') return this.notificationService.warn(this.getMessageWarning('Nom'));
    if (entete[3].trim().toLowerCase() != 'date depart') return this.notificationService.warn(this.getMessageWarning('Date Depart'));
    if (entete[4].trim().toLowerCase() != 'mois') return this.notificationService.warn(this.getMessageWarning('mois'));
    if (entete[5].trim().toLowerCase() != 'dureeprevisionnelle') return this.notificationService.warn(this.getMessageWarning('Duree Previsionnelle'));
    if (entete[6].trim().toLowerCase() != 'etat') return this.notificationService.warn(this.getMessageWarning('Etat'));
    
    let conges: Conge[] = [];
    let matricules: string [] = [];
    this.dataWithError.push(entete);
    for (let index = 1; index < this.data.length; index++) {
        const congeInfos                = this.data[index]; 
         let conge                      = new Conge();
         conge.dateSaisie               = new Date();
         conge.etat                     = EtatConge.saisi;
         let d: string[]                = congeInfos[3].split("-");
         conge.dateDepart               = new Date(parseInt(d[2]), parseInt(d[1]), parseInt(d[0])); 
         conge.dureePrevisionnelle      = congeInfos[5].trim();
         conge.planningConge            = this.planningconge;
         conge.dateRetourPrevisionnelle = this.addDays(new Date(conge.dateDepart), conge.dureePrevisionnelle);
         conge.mois                     = new Date(conge.dateDepart).toLocaleString("fr-FR", { month: "long" });
         conge.annee                    = new Date(conge.dateDepart).getFullYear().toString();
         let agent: Agent               = this.verifyAgent(congeInfos[0]); 
         if(agent && conge.annee       === this.planningconge.planningDirection.dossierConge.annee){  
          conge.agent                   = agent;
          conge.code                    = "C" + "-" + agent.matricule + "-" + new Date().getTime();
          conge.niveau                  = agent.uniteOrganisationnelle.niveauHierarchique.position;
          conge.etape                   = conge.niveau;
          conges.push(conge);
          this.agents.splice(this.agents.findIndex(a => a.id === agent.id), 1);
         }else{
           matricules.push(congeInfos[0]);
           this.dataWithError[index] = this.data[index];
         }
    }
    if(conges.length > 0){
      this.dialogConfirmationService.confirmationDialog().subscribe(action => {
        if (action === DialogUtil.confirmer) {
          this.congeService.createAll(conges)
              .subscribe(response => {
                this.dataSaved = response.body
                this.notificationService.success(NotificationUtil.ajout);
              }, err => {
                this.notificationService.warn(NotificationUtil.echec);
              }, () => {
                 this.updatePlanningConge();
              });
        }
      });
  }  
  if(matricules.length != 0){
    let m = '';
    matricules.forEach(t => {
      m += t + ' , ';
    });
    let verbe = matricules.length > 1 ? 'ont' : 'a'; 
    this.notificationService.warn('AGENTS '+ m + ' ' + verbe + ' déja une demande de congé en cours' );
    this.data = this.dataWithError;
    // this.isFailedToLoad = true;
  } 
  }
  getAllAgentsSansConge(){
    this.agentService.getAllSansConge(this.unite.id, this.planningconge.planningDirection.dossierConge.annee)
          .subscribe(response => {
            this.agents = response.body            
          });
  }
  verifyAgent(matricule: string): Agent{
     return this.agents.find(a => a.matricule === matricule);
  }
  remove(l) {
    this.data.splice(l, 1);
  }

  add() {
    this.data.push(this.data[this.data.length - 1]);
  }
  updateList(l: number, c: number,event: any) {
    const editField = event.target.textContent;
    this.data[l][c] = editField;
  }
 changeValue(l: number, c: number, event: any) {
  this.editField = event.target.textContent;
  }
  updatePlanningConge() {
    if(this.planningconge.etat === EtatPlanningConge.saisi){
        this.planningconge.etat = EtatPlanningConge.encours;
        this.planningService.update(this.planningconge).subscribe((response) => {
              this.notificationService.success(EtatPlanningConge.ouvert);
            }, err => {
              this.notificationService.warn(NotificationUtil.echec);
          },
          () => {
            this.dialogRef.close(this.dataSaved);
          });
     }
 }
  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
}
}
