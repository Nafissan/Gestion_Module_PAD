import * as fs from 'file-saver';
import {
  Component,
  OnInit,
  ViewChild,
  Input,
  OnDestroy,
  AfterViewInit,
  Inject,
} from "@angular/core";
import { SuiviAttestationService } from "../../shared/services/suivi-attestation.service";
import { ReplaySubject, Observable, from } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ListColumn } from "../../../../../@fury/shared/list/list-column.model";
import { filter } from "rxjs/operators";
import { fadeInRightAnimation } from "../../../../../@fury/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "../../../../../@fury/animations/fade-in-up.animation";
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AddSuiviAttestationComponent } from "../add-suivi-attestation/add-suivi-attestation.component";
import { EtapeAttestation } from "../../shared/model/etape-attestation.model";
import { DetailsSuiviAttestationComponent } from "../details-suivi-attestation/details-suivi-attestation.component";
import { DialogConfirmationService } from "../../../../shared/services/dialog-confirmation.service";
import { DialogUtil, NotificationUtil, MailClotureAttestation, MailRejeterAttestation } from "../../../../shared/util/util";
import { RejeterAttestationComponent } from "../../demande-attestation/rejeter-attestation/rejeter-attestation.component";
import { Attestation } from "../../shared/model/demande-attestation.model";
import { DetailDemandeAttestationComponent } from "../../demande-attestation/detail-demande-attestation/detail-demande-attestation.component";
import { ValiderAttestationComponent } from "../../demande-attestation/valider-attestation/valider-attestation.component";
import { AddAttestationComponent } from "../../demande-attestation/add-attestation/add-attestation.component";
import { AuthenticationService } from "../../../../shared/services/authentification.service";
import { CompteService } from "../../../gestion-utilisateurs/shared/services/compte.service";
import { DemandeAttestationService } from "../../shared/services/demande-attestation.service";
import { Compte } from "../../../gestion-utilisateurs/shared/model/compte.model";
import { UniteOrganisationnelle } from "../../../../shared/model/unite-organisationelle";
import { EtatAttestation } from "../../shared/util/etat";
import { Agent } from "../../../../shared/model/agent.model";
import { SelectionModel } from "@angular/cdk/collections";
import { NotificationService } from "../../../../shared/services/notification.service";
import { JoindreAttestationComponent } from "../joindre-attestation/joindre-attestation.component";
import {genererPDF} from '../../../../shared/util/templates/edition_attestation'
import { DownloadAttestationComponent } from "../download-attestation/download-attestation.component";
import { FormGroup } from "@angular/forms";
import { FileMetaData } from "../../shared/model/file-meta-data.models";
import { MailService } from "../../../../shared/services/mail.service";
import { Mail } from "../../../../shared/model/mail.model";
import { saveAs as importedSaveAs } from "file-saver";
import { MatSnackBar } from '@angular/material/snack-bar';
//import { genererWORD } from "../../../../shared/util/templates/edition_attestation_word";

@Component({
  selector: "fury-liste-suivi-attestation",
  templateUrl: "./liste-suivi-attestation.component.html",
  styleUrls: ["./liste-suivi-attestation.component.scss","../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class ListeSuiviAttestationComponent
  implements OnInit, AfterViewInit, OnDestroy {
    showProgressBar:boolean=false
    suiviAttestations: EtapeAttestation[];
    suiviAttestation: EtapeAttestation;
    username: string;
    compte: Compte;
    agent: Agent;
  agentsDemandeur:  Agent[] = [];
  agentDemandeurID: number[] = []; // A renseigner
  // ID: number[] = [];
    mail : Mail
    attestation: Attestation
    uniteOrganisationnelle: UniteOrganisationnelle;
    dialogUtil: DialogUtil = new DialogUtil();
    etapeAtts : EtapeAttestation[]
    demandeAttestations: Attestation[]=[];
    demandeAttestation: Attestation;
    form: FormGroup;
    subject$: ReplaySubject<Attestation[]> = new ReplaySubject<Attestation[]>(1);
    data$: Observable<Attestation[]> = this.subject$.asObservable();
    pageSize = 4;
    dataSource: MatTableDataSource<Attestation> | null;
    selection = new SelectionModel<Attestation>(true, []);

// -----Utliser pour la pagination et le tri des listes--------
  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // @ViewChild(MatSort, { static: true }) sort: MatSort;
  private paginator: MatPaginator;
  private sort: MatSort;
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // -------------------------------------------------------------
    @Input()
    columns: ListColumn[] = [
      { name: "Checkbox", property: "checkbox", visible: true },
      { name: "Id", property: "id", visible: false, isModelProperty: true },
      {
        name: "Matricule",
        property: "matricule",
        visible: true,
        isModelProperty: true,
      },
      {
        name: "Prenom",
        property: "prenom",
        visible: true,
        isModelProperty: true,
      },
      { name: "Nom", property: "nom", visible: true, isModelProperty: true },
      {
        name: "Date de saisie",
        property: "dateSaisie",
        visible: true,
        isModelProperty: true,
      },
      {
        name: "Telephone",
        property: "telephone",
        visible: true,
        isModelProperty: true,
      },
      {
        name: "Date Naissance",
        property: "dateNaissance",
        visible: false,
        isModelProperty: true,
      },
      {
        name: "Commentaire",
        property: "commentaire",
        visible: true,
        isModelProperty: true,
      },
      { name: "Etat", property: "etat", visible: true, isModelProperty: true },
      { name: "Actions", property: "actions", visible: true },
    ] as ListColumn[];
    constructor(
      
      private authentificationService: AuthenticationService,
      private compteService: CompteService,
      private dialogConfirmationService: DialogConfirmationService,
      private demandeAttestationService: DemandeAttestationService,
      private suiviAttestationService: SuiviAttestationService,
      private dialog: MatDialog,
      private mailService: MailService,
      private snackbar: MatSnackBar,
      
      //  @Inject(MAT_DIALOG_DATA) public defaults: any,
      //  private dialogRef: MatDialogRef<ValiderAttestationComponent>,
      private notificationService: NotificationService
      
    ) {}
   
  
    ngOnInit() {
      // this.getDemandesAttestations();
  
      this.dataSource = new MatTableDataSource();
  
      this.data$
        .pipe(filter((data) => !!data))
        .subscribe((demandeAttestations) => {
          this.demandeAttestations = demandeAttestations;
          this.dataSource.data = demandeAttestations;
          this.showProgressBar=true
        });
        this.username = this.authentificationService.getUsername();
        this.compteService.getByUsername(this.username).subscribe((response) => {
          this.compte = response.body;
          this.agent = this.compte.agent;
          this.uniteOrganisationnelle = this.agent.uniteOrganisationnelle;
          // Recuperer tous les plannings conges en fonction du dossier conge et de l'agent
          this.getDemandesAttestationsByEtatDifferent();
        });
        
    }
  
    ngAfterViewInit() {
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
    }
    hasAnyRole(roles: string[]) {
      return this.authentificationService.hasAnyRole(roles);
    }
  
    getDemandesAttestationsByEtatDifferent() {
      this.demandeAttestationService.getAttestationsByEtatDifferent(EtatAttestation.saisir).subscribe(
        (response) => {
          this.demandeAttestations = response.body;
           this.demandeAttestations = this.demandeAttestations.filter(e=> (e.etat !== EtatAttestation.rejeter) && (e.etat !== EtatAttestation.cloturer))
          
        },
        (err) => {
        },
        () => {
          this.subject$.next(this.demandeAttestations);
        }
      );
    }
    get visibleColumns() {
      return this.columns
        .filter((column) => column.visible)
        .map((column) => column.property);
    }
  
    onFilterChange(value) {
      if (!this.dataSource) {
        return;
      }
      value = value.trim();
      value = value.toLowerCase();
      this.dataSource.filter = value;
    }
  
    ngOnDestroy() {}
    createDemandeAttestation() {
      this.dialog
        .open(AddAttestationComponent)
        .afterClosed()
        .subscribe((demandeAttestation: any) => {
          /**
           * Dossier congé is the updated dossierConge (if the user pressed Save - otherwise it's null)
           */ if (demandeAttestation) {
            /**
             * Here we are updating our local array.
             */
            this.demandeAttestations.unshift(new Attestation(demandeAttestation));
            this.subject$.next(this.demandeAttestations);
          }
        });
    }
  
    validerDemandeAttestation(attestation?: Attestation, type?: string) {
      if(type === 'one'){
        this.dialogConfirmationService.confirmationDialog().subscribe(action =>{
          if (action === DialogUtil.confirmer){
            let suiviAttestation: EtapeAttestation = new EtapeAttestation();
            suiviAttestation.date = new Date()
            suiviAttestation.prenom= this.agent.prenom;
            suiviAttestation.nom= this.agent.nom;
            suiviAttestation.matricule= this.agent.matricule;
            suiviAttestation.fonction= this.agent.fonction.nom;
            suiviAttestation.attestation = attestation;
            suiviAttestation.telephone = this.agent.telephone;
            this.suiviAttestationService.create(suiviAttestation).subscribe(
              response => { 
                this.notificationService.success(NotificationUtil.validation);
                  if(response.status === 201){
                    this.attestation = response.body.attestation
                    this.updateAttestation(attestation, EtatAttestation.valider)
                  }
              })
          }
        })
        
      }
      else if(type === 'many'){
        let attestation = this.selection.selected.find(el => (el.etat !== EtatAttestation.transmettre))
        if(attestation !== undefined){
          this.notificationService.warn('Seule les demandes a l\'état transmis peuvent être validées');
          return;
        }
        this.dialogConfirmationService.confirmationDialog().subscribe(action =>{
          if (action === DialogUtil.confirmer){
             this.updateAttestationMany(this.selection.selected, EtatAttestation.valider);
             this.notificationService.success(NotificationUtil.validation)   
          }
        })
        this.subject$.next(this.demandeAttestations);
      }
      
    }
    
    rejeterDemandeAttestation(demandeAttestation?: Attestation, type?: string) {
      
      if(type === 'one'){
        this.dialog.open(RejeterAttestationComponent, {
          data: { demandeAttestation: demandeAttestation, type: type}
        })
        .afterClosed()
        .subscribe((demandeAttestation) => {
          let mail = new Mail();
          mail.objet = MailRejeterAttestation.susbject;
          mail.contenu = MailRejeterAttestation.content;
          mail.lien = "";
          mail.emetteur = "";
          mail.destinataires = [this.attestation.agent.email];
          if (demandeAttestation) {
            this.demandeAttestations.splice(
              this.demandeAttestations.findIndex(
                (existingDossierConge) =>
                  existingDossierConge.id === demandeAttestation.id
              ),
              1
            );
            this.subject$.next(this.demandeAttestations);
          }
          this.mailService.sendMailByDirections(mail).subscribe(
            response => {
            }, err => {
              this.notificationService.warn(NotificationUtil.echec);
            },
            () => {
              this.notificationService.success(NotificationUtil.rejet);
            });
        });
        

      }
      
      else if(type === 'many'){

        let attestationTrans = this.selection.selected.find(el => (el.etat !== EtatAttestation.transmettre))
        if(attestationTrans !== undefined){
          this.notificationService.warn('Seule les demandes a l\'état transmis peuvent être rejetées');
          return;
        }

        this.dialog.open(RejeterAttestationComponent, {
          data: { demandeAttestations: this.selection.selected, type: type}
        })
        .afterClosed()
        .subscribe((demandeAttestation) => {
          if (demandeAttestation) {

            this.demandeAttestations.splice(
              this.demandeAttestations.findIndex(
                (existingDossierConge) =>
                  existingDossierConge.id === demandeAttestation.id
              ),
              1
            );
            this.subject$.next(this.demandeAttestations);
          }
        });
        
      }

    }
    downloadAttestation(demandeAttestation: Attestation){
      this.demandeAttestationService.downloadAttestation(demandeAttestation).subscribe((response) => {
        let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });   
        const url = window.URL.createObjectURL(blob);
        importedSaveAs(blob, demandeAttestation.agent.prenom + "_" + demandeAttestation.agent.nom + '.pdf');
        this.snackbar.open('Téléchargement réussie!', null, {
          duration: 5000
        });
  
      });
       
    }
    cloturerDemandeAttestation(attestation?: Attestation, type?: string){
      if(type === 'one'){
        this.dialogConfirmationService.confirmationDialog().subscribe(action =>{
          let mail = new Mail();
          mail.objet = MailClotureAttestation.susbject;
          mail.contenu = MailClotureAttestation.content;
          mail.lien = "";
          mail.emetteur = "";
          mail.destinataires = [attestation.agent.email];
       
          if (action === DialogUtil.confirmer){

            this.updateAttestation(attestation, EtatAttestation.cloturer);
            this.notificationService.success(NotificationUtil.cloture)
            this.demandeAttestations.splice(
              this.demandeAttestations.findIndex(
                (existingDossierConge) =>
                  existingDossierConge.id === attestation.id
              ),
              1
            );
            this.subject$.next(this.demandeAttestations);
          }
          this.mailService.sendMailByDirections(mail).subscribe(
            response => {              
            }, err => {
              this.notificationService.warn(NotificationUtil.echec);
            },
            () => {
              this.notificationService.success(NotificationUtil.cloture);
            });
        })
        
      }
      else if(type === 'many'){
        let attestation = this.selection.selected.find(el => (el.etat !== EtatAttestation.valider || el.fileMetaData==null))
        if(attestation !== undefined){
          this.notificationService.warn('Seule les demandes a l\'état validé et dont vous avez joind l\'attestation peuvent être cloturées');
          return;
        }
        this.dialogConfirmationService.confirmationDialog().subscribe(action =>{
        
          let mail = new Mail();
          mail.objet = MailClotureAttestation.susbject;
          mail.contenu = MailClotureAttestation.content;
          mail.lien = "";
          mail.emetteur = "";
          mail.destinataires =[attestation.agent.email];

          if (action === DialogUtil.confirmer){
             this.updateAttestationMany(this.selection.selected, EtatAttestation.cloturer);
             this.notificationService.success(NotificationUtil.cloture)
             this.demandeAttestations.splice(
              this.demandeAttestations.findIndex(
                (existingAttestation) =>
                existingAttestation.id === attestation.id
              ),
              1
            );
            this.subject$.next(this.demandeAttestations);
            this.mailService.sendMailByDirections(mail).subscribe(
              response => {
              }, err => {
                this.notificationService.warn(NotificationUtil.echec);
              },
              () => {
                this.notificationService.success(NotificationUtil.cloture);
                this.demandeAttestations.splice(
                  this.demandeAttestations.findIndex(
                    (existingDossierConge) =>
                      existingDossierConge.id === attestation.id
                  ),
                  1
                );
              });
          }
        })
      }

    }
    updateAttestation(attestation: Attestation, etat){
      attestation.etat = etat
      this.demandeAttestationService.update(attestation).subscribe(
        response => {
        }
     )
    }
    updateAttestationMany(attestations: Attestation[], etat: string) {
      attestations.forEach(el => el.etat = etat)
      this.demandeAttestationService.updateMany(attestations).subscribe((response) => {
      });
    }
    detailsSuiviAttestation(detailSuivi: EtapeAttestation) {
      this.dialog
        .open(DetailsSuiviAttestationComponent, {
          data: detailSuivi,
        })
        .afterClosed()
        .subscribe((detailSuivi) => {   
          if (detailSuivi) {
            const index = this.etapeAtts.findIndex(
              (existingDossierConge) =>
                existingDossierConge.id === detailSuivi.id
            );
            this.etapeAtts[index] = new EtapeAttestation(detailSuivi);
            this.subject$.next(this.demandeAttestations);
          }
        });
    }
  

    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }

    joindreAttestation(demandeAttestation: Attestation){
          this.dialog
          .open(JoindreAttestationComponent,{
            data: demandeAttestation,
          })
          .afterClosed()
          .subscribe((fileMetaData) => {
           if(fileMetaData){
            demandeAttestation.fileMetaData = fileMetaData;
           }
            
          });
     
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      this.isAllSelected() ?
          this.selection.clear() :
          this.dataSource.data.forEach(row => this.selection.select(row));
    }
  
    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: Attestation): string {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
    }

    voirAttestation(demandeAttestation: Attestation){
      this.getSuiviAttestation(demandeAttestation)
       
      
    }
    getSuiviAttestation(attestaion:Attestation){
      this.suiviAttestationService.getAll().subscribe(response=>{
  
        this.suiviAttestations = response.body
        this.suiviAttestations = this.suiviAttestations.filter(a=> (a.attestation .id=== attestaion.id))
  
        this.suiviAttestations.forEach(element => {
            this.suiviAttestation =element;
        });
        
      }, err => console.log(err)
      , ()=> genererPDF(attestaion,this.suiviAttestation )); 
    }

}
