import { Component, OnInit, ViewChild, Input, AfterViewInit, OnDestroy } from "@angular/core";
import { DossierColonie } from "../../shared/model/dossier-colonie.model";
import { ReplaySubject, Observable } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ListColumn } from "../../../../../@fury/shared/list/list-column.model";
import { filter } from "rxjs/operators";
import { fadeInRightAnimation } from "../../../../../@fury/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "../../../../../@fury/animations/fade-in-up.animation";
import { MatDialog } from "@angular/material/dialog";
import { DialogConfirmationService } from "../../../../shared/services/dialog-confirmation.service";
import { DialogUtil, NotificationUtil } from "../../../../shared/util/util";
import { NotificationService } from "../../../../shared/services/notification.service";
import { RapportProspection } from "../../shared/model/rapport-prospection.model";
import { RapportProspectionService } from "../../shared/service/rapport-prospection.service";
import { AddOrUpdateRapportProspectionComponent } from "../add-or-update-rapport-prospection/add-or-update-rapport-prospection.component";
import { AuthenticationService } from "src/app/shared/services/authentification.service";
import { Compte } from "src/app/pages/gestion-utilisateurs/shared/model/compte.model";
import { CompteService } from "src/app/pages/gestion-utilisateurs/shared/services/compte.service";
import { Agent } from "src/app/shared/model/agent.model";
import { DossierColonieService } from "../../shared/service/dossier-colonie.service";

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
    { name: "État", property: "etat", visible: true, isModelProperty: true },
    { name: "Rapport Prospection", property: "rapportProspection", visible: true, isModelProperty: true },
    { name: "Ajoute par", property: "agentAjout", visible: true },
    { name: "Valide/Rejeter par", property: "agentModif", visible: true },
    { name: "Actions", property: "actions", visible: true },
  ] as ListColumn[];

  constructor(
    private rapportService: RapportProspectionService,
    private dialog: MatDialog,    private authentificationService: AuthenticationService,
    private authService: AuthenticationService,    
    private compteService: CompteService,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService,
    private dossierColonieService: DossierColonieService 

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
  }

  ngAfterViewInit() {
    this.setDataSourceAttributes();
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

  getRapportProspections() {
    this.rapportService.getAllRapportsProspection().subscribe(
      (response) => {
        this.rapports = response.body;
        this.currentRapport = this.rapports.find(e => e.etat === 'A VALIDER');
        this.subject$.next(this.rapports);
        this.showProgressBar=true;
        console.log(this.rapports);
      },
      (err) => {        
         console.error('Error loading rapport prospection colonies:', err); 

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
          this.rapports[index] = rapport;
          this.subject$.next(this.rapports);
        }
      });
  }
  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }

  deleteDossierColonie(rapport: RapportProspection) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.rapportService.deleteRapportProspection(rapport.id).subscribe(
          () => {
            this.rapports.splice(
              this.rapports.findIndex((existingrapport) => existingrapport.id === rapport.id), 1
            );
            this.subject$.next(this.rapports);
            this.notificationService.success(NotificationUtil.suppression);
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

    this.rapportService.updateRapportProspection(rapport).subscribe(() => {
      this.notificationService.success('Rapport de prospection validé avec succès');

      this.dossierColonieService.getAll().subscribe(response => {
        const dossiers = response.body;
        const dossierToUpdate = dossiers.find(dossier => dossier.id === rapport.codeDossierColonie.id);
        if (dossierToUpdate) {
          dossierToUpdate.rapportProspection = rapport;
          this.dossierColonieService.update(dossierToUpdate).subscribe(() => {
            this.notificationService.success('Dossier mis à jour avec succès');
          }, err => {
            this.notificationService.warn('Échec de la mise à jour du dossier');
          });
        }
      }, err => {
        this.notificationService.warn('Échec de la récupération des dossiers');
      });
    }, () => {
      this.notificationService.warn('Échec de la validation du rapport');
    });
}

  rejeterRapportProspection(rapport: RapportProspection){
    rapport.etat = 'REJETER';
    rapport.matriculeAgent=this.agent.matricule;
    rapport.nomAgent=this.agent.nom;
    rapport.prenomAgent=this.agent.prenom;
    this.rapportService.updateRapportProspection(rapport).subscribe(()=>{
      this.notificationService.success('Rapport de prospection rejete avec succes');
    },() => {
      this.notificationService.warn('Echac de rejection du rapport');
    })
  }
  afficherRapportProspection(rapport:RapportProspection){
    this.rapportSelectionne = rapport;
    this.afficherRapport=true;
  }
  ngOnDestroy() { }
}
