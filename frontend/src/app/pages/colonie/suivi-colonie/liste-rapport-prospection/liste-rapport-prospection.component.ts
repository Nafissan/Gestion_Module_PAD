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
import { property } from "lodash-es";
import { AgentService } from "src/app/shared/services/agent.service";

@Component({
  selector: "fury-liste-rapport-prospection",
  templateUrl: "./liste-rapport-prospection.component.html",
  styleUrls: ["./liste-rapport-prospection.component.scss", "../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ListeRapportProspectionComponent implements OnInit, AfterViewInit, OnDestroy {
  showProgressBar: boolean = false;
  date: Date = new Date();
  rapportProspection: RapportProspection;
  afficherRapport: boolean = false;
  username: string;
  compte: Compte;  
  agent: Agent;
  private paginator: MatPaginator;
  private sort: MatSort;
  dossierColonie: DossierColonie;
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
  }
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
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
    private agentService: AgentService, // Injecter le service AgentService


  ) { }

  ngOnInit() {
    this.getRapportProspections();
    this.getDossierColonie();
    this.username = this.authService.getUsername();
    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
    });
  }

  ngAfterViewInit() {
  }
  get visibleColumns() {
    return this.columns.filter((column) => column.visible).map((column) => column.property);
  }

  
  refresh(){ this.getRapportProspections(); }
  getRapportProspections() {
      this.rapportService.getRapportProspectionByEtat().subscribe(
        (response) => {
          this.rapportProspection = response.body as RapportProspection;

        },
        (err) => {        
           console.error('Error loading rapport prospection colonies:', err); 
        },
        () => {
          this.showProgressBar = true;
        }
      );
  }
   
  getDossierColonie(){
    this.dossierColonieService.getDossier().subscribe(
      (response) => {
          this.dossierColonie = response.body as DossierColonie;
      },
      (err) => {
        console.error('Error loading dossier colonie:', err);
      })
  }
  createRapportProspection() {
    this.dialog
      .open(AddOrUpdateRapportProspectionComponent)
      .afterClosed()
      .subscribe((rapport: RapportProspection) => {
        if (rapport) {
          this.rapportProspection = rapport;
          this.refresh();
        }
      });
  }

  updateDossierColonie(rapportProspection: RapportProspection) {
    this.dialog
      .open(AddOrUpdateRapportProspectionComponent, { data: {rapport: rapportProspection , property: "update" } })
      .afterClosed()
      .subscribe((rapport: RapportProspection) => {
        if (rapport) {
          this.rapportProspection = rapport;

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
            this.notificationService.success(NotificationUtil.suppression);
            this.rapportProspection = null;
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
    this.agentService.getAgentByMatricule(rapport.matricule).subscribe(
      (response) => {
      const agent: Agent = response.body;
    let mail = new Mail();
    mail.objet = "Rapport_Prospection";
    mail.contenu ="Le rapport de Prospection du dossier colonie est validé";
    mail.lien = "";
    mail.emetteur = "";
    mail.destinataires = [agent.email];
    this.rapportService.updateRapportProspection(rapport).subscribe((response) => {
      this.notificationService.success('Rapport de prospection validé avec succès');
      if (response.body as RapportProspection) {
        this.rapportProspection = response.body;
        this.refresh();
      }
    }, err => {
      this.notificationService.warn('Échec de la validation du rapport'+err);
    }, () => {
      this.mailService.sendMailByDirections(mail).subscribe(
        response => {
        }, err => {
          this.notificationService.warn(NotificationUtil.echec);
        },
        () => {
          this.notificationService.success(NotificationUtil.envoyeDossier);
        });
    });
  },
  (error) => {
    console.error('Erreur lors de la récupération de l\'agent:', error);
  }
);
}

  rejeterRapportProspection(rapport: RapportProspection){
    rapport.etat = 'REJETER';
    rapport.matriculeAgent=this.agent.matricule;
    rapport.nomAgent=this.agent.nom;
    rapport.prenomAgent=this.agent.prenom;
    rapport.dateValidation = new Date();
    this.dialog
      .open(AddOrUpdateRapportProspectionComponent, { data: {rapport: rapport , property: "rejeter" }})
      .afterClosed()
      .subscribe((rapport:RapportProspection) => {
        if (rapport) {
          this.rapportProspection = rapport;
          this.refresh();

        }
      })
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
      this.rapportProspection = result;
    });
  }
  ngOnDestroy() { }
}
