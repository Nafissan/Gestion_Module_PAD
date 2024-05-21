import { Component, OnInit, ViewChild, Input, OnDestroy, Inject } from "@angular/core";

import { ReplaySubject, Observable } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ListColumn } from "../../../../../@fury/shared/list/list-column.model";
import { filter } from "rxjs/operators";
import { fadeInRightAnimation } from "../../../../../@fury/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "../../../../../@fury/animations/fade-in-up.animation";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Interim } from '../../shared/model/interim.model';
import { InterimService } from '../../shared/services/interim.service';
import { DetailsInterimComponent } from "../../interim/details-interim/details-interim.component";
import { Routes, Router } from '@angular/router';
import { Agent } from "../../../../shared/model/agent.model";
import { EtatInterim } from "../../shared/util/etat";
import { AuthenticationService } from "../../../../shared/services/authentification.service";
import { CompteService } from "../../../gestion-utilisateurs/shared/services/compte.service";
import { Compte } from "../../../gestion-utilisateurs/shared/model/compte.model";
import { UniteOrganisationnelle } from "../../../../shared/model/unite-organisationelle";
import { DialogUtil, NotificationUtil } from "../../../../shared/util/util";
import { DialogConfirmationService } from "../../../../shared/services/dialog-confirmation.service";
import { CloseInterimComponent } from "../../interim/close-interim/close-interim.component";
import { NotificationService } from "../../../../shared/services/notification.service";

@Component({
  selector: 'fury-list-interim',
  templateUrl: './list-interim.component.html',
  styleUrls: ['./list-interim.component.scss',"../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class ListInterimComponent implements OnInit, OnDestroy {
  interims: Interim[];
  agent: Agent;
  agents: Agent[];
  username: string;
  compte: Compte;
  idDossierInterim:number;
  uniteOrganisationnelle: UniteOrganisationnelle;
  nomUniteOrgAgentConnect: any
  dialogUtil: DialogUtil = new DialogUtil();
  subject$: ReplaySubject<Interim[]> = new ReplaySubject<Interim[]>(
    1
  );
  data$: Observable<Interim[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<Interim> | null;
  etatInterim: EtatInterim = new EtatInterim();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input()
  columns: ListColumn[] = [
    { name: "Checkbox", property: "checkbox", visible: false },
    { name: "Id", property: "id", visible: true, isModelProperty: true },
    {
      name: "Date Demandeur",
      property: "dateDepart",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Date Retour",
      property: "dateRetour",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Date Retour Effective",
      property: "dateRetourEffective",
      visible: false,
      isModelProperty: true,
    },
    {
      name: "Date Saisie",
      property: "dateSaisie",
      visible: false,
      isModelProperty: true,
    },
    {
      name: "Etat",
      property: "etat",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Commentaire",
      property: "commentaire",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Agent Depart",
      property: "agentDepart",
      visible: false,
      isModelProperty: true,
    },
    {
      name: "Agent Interimaire",
      property: "agentArrive",
      visible: false,
      isModelProperty: true,
    },
    { name: "Actions", property: "actions", visible: true },
  ] as ListColumn[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private interimService: InterimService,
    private dialog: MatDialog, private router: Router,
    private authentificationService: AuthenticationService,
    private compteService: CompteService,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService:NotificationService) { }

  ngOnInit() {

    this.idDossierInterim  = this.defaults.dossierInterim.id;
    
    this.getInterimsByDossier(this.idDossierInterim);
    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter((data) => !!data)).subscribe((interims) => {
      this.interims = interims;
      this.dataSource.data = interims
    });

    this.getAgents();

      this.username = this.authentificationService.getUsername();
      this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
      this.uniteOrganisationnelle = this.agent.uniteOrganisationnelle;
      this.nomUniteOrgAgentConnect= this.agent.uniteOrganisationnelle.nom;

      // Recuperer tous les plannings conges en fonction du dossier conge et de l'agentddd
      // if(this.uniteOrganisationnelle.nom === 'DCH'){
      // //  this.getInterims();
      // }else{
      //   this.getInterimByUORG();
      // }
    
    });

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getInterimsByDossier(idDossierInterim:number) {
    this.interimService.getInterimsByDossier(idDossierInterim).subscribe(
      (response) => {
        this.interims = response.body;
        this.interims  = this.interims.filter(e=>e.etat ==='VALIDER' || e.etat === 'CLOTURE');
      },
      (err) => {
      },
      () => {
        this.subject$.next(this.interims);
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



 


  DetailsInterim(interim: Interim) {
    this.dialog.open(DetailsInterimComponent, {
      data: interim
    }).afterClosed().subscribe((interim) => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (interim) {

        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        const index = this.interims.findIndex((existingInterim) => existingInterim.id === interim.id);
        this.interims[index] = new Interim(interim);
        this.subject$.next(this.interims);
      }
    });
  }
  // isDate(value:any):boolean{
  //   return isDate(value);
  // }
  getAgents() {

    this.interimService.getAgents().subscribe(
      (response) => {
        this.agents = response.body;
      },
      (err) => {
      },
      () => {
        // this.subject$.next(this.agents);
      }
    );
  }
  SuiviInterim(id): void {
    this.router.navigate(['/gestion-interim/suivi-interim', id]);
  }


  closeEtapeInterim(interim: Interim) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
    this.dialog.open(CloseInterimComponent, {
      data: interim
    }).afterClosed().subscribe((interim: any) => {
    /**
     * Dossier congé is the updated dossierConge (if the user pressed Save - otherwise it's null)
     */ if (interim) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        const index = this.interims.findIndex(
          (existingInterim) =>
            existingInterim.id === interim.id
        );
        this.interims[index] = new Interim(interim);
        this.subject$.next(this.interims);
      }
    });
  }})
  }
  updateInterimWithEtat(interim: Interim, etat) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
    interim.etat = etat;
    this.interimService.update(interim).subscribe((response) => {
     
      const index = this.interims.findIndex(
        (existingInterim) =>
          existingInterim.id === interim.id
      );
      this.interims[index] = new Interim(interim);
      this.subject$.next(this.interims);
    });
  }})
  }
  transmettreInterim(interim: Interim) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
    this.updateInterimWithEtat(
      interim,
      this.etatInterim.transmettre
    );
      }})
  }

  getInterimByUORG() {
    this.interimService.getInterimByUnORG(this.uniteOrganisationnelle.id).subscribe(
      (response) => {
        this.interims = response.body;
      },
      (err) => {
      },
      () => {
        this.subject$.next(this.interims);
      }
    );
  }

  getInterimsByAgent() {
    this.interimService.getInterimByUnORG(this.agent.id).subscribe(
      (response) => {
        this.interims = response.body;
      },
      (err) => {
      },
      () => {
        this.subject$.next(this.interims);
      }
    );
  }
  // getCompteByUsername(username){
  //   this.compteService.getByUsername(username).subscribe(
  //     response => {
  //       this.agent = response.body.agent;
  //     }
  //   )
  // }

  ngOnDestroy() { }

}