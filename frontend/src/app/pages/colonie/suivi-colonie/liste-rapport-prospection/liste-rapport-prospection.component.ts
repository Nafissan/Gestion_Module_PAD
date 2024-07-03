import { Component, OnInit, ViewChild, Input, AfterViewInit, OnDestroy } from "@angular/core";
import { DossierColonie } from "../../shared/model/dossier-colonie.model";
import { ReplaySubject, Observable } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ListColumn } from "../../../../../@fury/shared/list/list-column.model";
import { filter, map } from "rxjs/operators";
import { fadeInRightAnimation } from "../../../../../@fury/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "../../../../../@fury/animations/fade-in-up.animation";
import { MatDialog } from "@angular/material/dialog";
import { DialogConfirmationService } from "../../../../shared/services/dialog-confirmation.service";
import { DialogUtil, MailDossierColonie, NotificationUtil } from "../../../../shared/util/util";
import { NotificationService } from "../../../../shared/services/notification.service";
import { RapportProspection } from "../../shared/model/rapport-prospection.model";
import { RapportProspectionService } from "../../shared/service/rapport-prospection.service";
import { AddOrUpdateRapportProspectionComponent } from "../add-or-update-rapport-prospection/add-or-update-rapport-prospection.component";
import { AuthenticationService } from "src/app/shared/services/authentification.service";
import { Compte } from "src/app/pages/gestion-utilisateurs/shared/model/compte.model";
import { CompteService } from "src/app/pages/gestion-utilisateurs/shared/services/compte.service";
import { Agent } from "src/app/shared/model/agent.model";
import { DossierColonieService } from "../../shared/service/dossier-colonie.service";
import { Mail } from "src/app/shared/model/mail.model";
import { MailService } from "src/app/shared/services/mail.service";
import { EtatDossierColonie } from "../../shared/util/util";
import { DetailsRapportProspectionComponent } from "../details-rapport-prospection/details-rapport-prospection.component";

@Component({
  selector: "fury-liste-rapport-prospection",
  templateUrl: "./liste-rapport-prospection.component.html",
  styleUrls: ["./liste-rapport-prospection.component.scss", "../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ListeRapportProspectionComponent implements OnInit, AfterViewInit, OnDestroy {
  showProgressBar: boolean = false;
  date: Date = new Date();
  currentRapport: RapportProspection = undefined;
  rapports: RapportProspection[] = [];
  subject$: ReplaySubject<RapportProspection[]> = new ReplaySubject<RapportProspection[]>(1);
  data$: Observable<RapportProspection[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<RapportProspection> | null;
  rapportSelectionne: RapportProspection;
  afficherRapport: boolean = false;
  username: string;
  compte: Compte;  
  agent: Agent;
  canAdd: boolean=false;
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
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  @Input()
  columns: ListColumn[] = [
    { name: "Checkbox", property: "checkbox", visible: false },
    { name: "Code Dossier", property: "codeDossierColonie", visible: true, isModelProperty: true },
    { name: "Date de création", property: "dateCreation", visible: true, isModelProperty: true },
    { name: "Date de validation/rejet", property: "dateValidation", visible: false, isModelProperty: true },
    { name: "État", property: "etat", visible: true, isModelProperty: true },
    { name: "Rapport Prospection", property: "rapportProspection", visible: true, isModelProperty: true },
    { name: "Ajoute par", property: "agentAjout", visible: true },
    { name: "Valide/Rejeter par", property: "agentModif", visible: false },
    { name: "Actions", property: "actions", visible: true },
  ] as ListColumn[];

  constructor(
    private rapportService: RapportProspectionService,
    private dialog: MatDialog,    private authentificationService: AuthenticationService,
    private authService: AuthenticationService,    
    private compteService: CompteService,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService,
    private dossierColonieService: DossierColonieService ,
    private mailService: MailService,


  ) { }

  ngOnInit() {
    this.username = this.authService.getUsername();
    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
    });
    this.getRapportProspections();
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((rapports) => {
      this.rapports = rapports;
      this.dataSource.data = rapports;
      console.log('Participants Colonies in ngOnInit:', this.rapports); // Debugging output

    });
    this.canAddRapportProspection();
  }

  ngAfterViewInit() {
  }
  canAddRapportProspection() {
     this.dossierColonieService.getAll().subscribe((response) => {
      const dossiers = response.body;
      const dossierToUpdate = dossiers.find(dossier => dossier.etat === EtatDossierColonie.ouvert || dossier.etat === EtatDossierColonie.saisi
      );
      console.log(dossierToUpdate);
      console.log(this.rapports);
      const existingReport = this.rapports.find((rapport) => dossierToUpdate && rapport.codeDossierColonie.id === dossierToUpdate.id);
      console.log(existingReport);
      this.canAdd=!!dossierToUpdate && !existingReport;
    });
  }

  get visibleColumns() {
    return this.columns.filter((column) => column.visible).map((column) => column.property);
  }

  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim().toLowerCase();
    this.dataSource.filter = value;
    this.dataSource.filterPredicate = (data: any, value) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(value) != -1;
    };
  }
  refresh(){
    this.getRapportProspections();
    this.canAddRapportProspection();
  }
  getRapportProspections() {
    this.rapportService.getAllRapportsProspection().subscribe(
      (response) => {
        this.rapports = response.body.filter(
          (rapport) => 
            rapport.codeDossierColonie.etat === EtatDossierColonie.ouvert || rapport.codeDossierColonie.etat === EtatDossierColonie.saisi
        );
        this.currentRapport = this.rapports.find(e => e.etat === 'A VALIDER');
      },
      (err) => {        
         console.error('Error loading rapport prospection colonies:', err); 
      },
      () => {
        this.subject$.next(this.rapports);
        this.showProgressBar = true;
      }
    );
  }

  createRapportProspection() {
    this.dialog
      .open(AddOrUpdateRapportProspectionComponent)
      .afterClosed()
      .subscribe((rapport: any) => {
        if (rapport) {
          this.rapports.unshift(rapport);
          this.subject$.next(this.rapports);
          this.refresh();
        }
      });
  }

  updateDossierColonie(rapport: DossierColonie) {
    this.dialog
      .open(AddOrUpdateRapportProspectionComponent, { data: rapport })
      .afterClosed()
      .subscribe((rapport) => {
        if (rapport) {
          const index = this.rapports.findIndex(
            (existingrapport) => existingrapport.id === rapport.id
          );
          this.rapports[index] = new RapportProspection(rapport);
          this.subject$.next(this.rapports);
          this.refresh();
        }
      });
  }
  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }

  deleteDossierColonie(rapport: RapportProspection) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.rapportService.deleteRapportProspection(rapport).subscribe(
          () => {
            this.rapports.splice(
              this.rapports.findIndex((existingrapport) => existingrapport.id === rapport.id), 1
            );
            this.notificationService.success(NotificationUtil.suppression);
            this.subject$.next(this.rapports);
            this.refresh();
          },
          err => {
            this.notificationService.warn(NotificationUtil.echec);
          }
        );
      }
    });
  }
  validerRapportProspection(rapport: RapportProspection) {
    rapport.etat = 'VALIDER';
    rapport.matriculeAgent = this.agent.matricule;
    rapport.nomAgent = this.agent.nom;
    rapport.prenomAgent = this.agent.prenom;
    rapport.dateValidation = new Date();
    let mail = new Mail();
    mail.objet = "Rapport_Prospection";
    mail.contenu ="Le rapport de Prospection du dossier colonie est valide";
    mail.lien = "";
    mail.emetteur = "";
    mail.destinataires = ["nnafissa27@gmail.com"];
    this.rapportService.updateRapportProspection(rapport).subscribe(() => {
      this.notificationService.success('Rapport de prospection validé avec succès');
    }, err => {
      this.notificationService.warn('Échec de la validation du rapport'+err);
    }, () => {
      /*this.mailService.sendMailByDirections(mail).subscribe(
        response => {
        }, err => {
          this.notificationService.warn(NotificationUtil.echec);
        },
        () => {
          this.notificationService.success(NotificationUtil.envoyeDossier);
        });*/
    });
}

  rejeterRapportProspection(rapport: RapportProspection){
    rapport.etat = 'REJETER';
    rapport.matriculeAgent=this.agent.matricule;
    rapport.nomAgent=this.agent.nom;
    rapport.prenomAgent=this.agent.prenom;
    rapport.dateValidation = new Date();
    let mail = new Mail();
    mail.objet = "Rapport_Prospection";
    mail.contenu ="Le rapport de Prospection du dossier colonie a ete rejete";
    mail.lien = "";
    mail.emetteur = "";
    mail.destinataires = ["nnafissa27@gmail.com"];
    this.rapportService.updateRapportProspection(rapport).subscribe(()=>{
      this.notificationService.success('Rapport de prospection rejete avec succes');
    },err => {
      this.notificationService.warn('Echac de rejection du rapport'+err);
    }, () => {
      /*this.mailService.sendMailByDirections(mail).subscribe(
        response => {
        }, err => {
          this.notificationService.warn(NotificationUtil.echec);
        },
        () => {
          this.notificationService.success(NotificationUtil.envoyeDossier);
        });*/
    });
  }
  afficherRapportProspection(rapport:RapportProspection){
    const dialogRef = this.dialog.open(DetailsRapportProspectionComponent, {
      data: rapport,
      width: '80%',
      height: '80%',
      maxWidth: '100vw', 
      maxHeight: '100vh', 
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Le dialogue a été fermé', result);
      const index = this.rapports.findIndex(
        (existingDossierColonie) => existingDossierColonie.id === rapport.id
      );
      this.rapports[index] = new RapportProspection(rapport);
      this.subject$.next(this.rapports);
    });
  }
  ngOnDestroy() { }
}
