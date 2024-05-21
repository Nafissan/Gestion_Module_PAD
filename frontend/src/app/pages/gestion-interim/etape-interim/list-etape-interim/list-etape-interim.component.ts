import { Component, OnInit, ViewChild, Input, AfterViewInit, OnDestroy } from "@angular/core";

import { ReplaySubject, Observable } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ListColumn } from "../../../../../@fury/shared/list/list-column.model";
import { filter } from "rxjs/operators";
import { fadeInRightAnimation } from "../../../../../@fury/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "../../../../../@fury/animations/fade-in-up.animation";
import { MatDialog } from "@angular/material/dialog";
import { EtapeInterim } from '../../shared/model/etapeInterim.modele';
import { EtapeInterimService } from '../../shared/services/etape-interim.service';
import { AddEtapeInterimComponent } from "../add-etape-interim/add-etape-interim.component";
import { DetailsEtapeInterimComponent} from "../details-etape-interim/details-etape-interim.component";
import { DialogUtil, NotificationUtil } from "../../../../shared/util/util";
import { DialogConfirmationService } from "../../../../shared/services/dialog-confirmation.service";
import { RejetInterimComponent } from "../../interim/rejet-interim/rejet-interim.component";
import { Interim } from "../../shared/model/interim.model";
import { CloseInterimComponent } from "../../interim/close-interim/close-interim.component";
import { Agent } from "../../../../shared/model/agent.model";
import { Compte } from "../../../gestion-utilisateurs/shared/model/compte.model";
import { UniteOrganisationnelle } from "../../../../shared/model/unite-organisationelle";
import { EtatInterim } from "../../shared/util/etat";
import { InterimService } from "../../shared/services/interim.service";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../../../shared/services/authentification.service";
import { CompteService } from "../../../gestion-utilisateurs/shared/services/compte.service";
import { NotificationService } from "../../../../shared/services/notification.service";
import { AddInterimComponent } from "../../interim/add-interim/add-interim.component";
import { DetailsInterimComponent } from "../../interim/details-interim/details-interim.component";
import { ValidationInterimComponent } from "../../interim/validation-interim/validation-interim.component";
import { FileMetaData } from "../../../gestion-demande-attestation/shared/model/file-meta-data.models";
import { JoindreInterimComponent } from "../joindre-interim/joindre-interim.component";
import { ImputeInterimComponent } from "../impute-interim/impute-interim.component";
import { genererPDFInterim } from "../../../../shared/util/templates/edition_interim";

@Component({
  selector: 'fury-list-etape-interim',
  templateUrl: './list-etape-interim.component.html',
  styleUrls: ['./list-etape-interim.component.scss',"../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ListEtapeInterimComponent implements OnInit, AfterViewInit, OnDestroy {
  
  date: Date = new Date();
  showProgressBar: boolean = false;
  interims: Interim[];
  agent: Agent;
  agents: Agent[];
  username: string;
  compte: Compte;
  niveau : number;
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
    { name: "Checkbox", property: "checkbox", visible: false },
    { name: "Id", property: "id", visible: true, isModelProperty: true },
    {
      name: "Date Depart",
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
      name: "Agent Demandeur",
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
    private interimService: InterimService,
    private dialog: MatDialog, private router: Router,
    private authentificationService: AuthenticationService,
    private compteService: CompteService,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService:NotificationService) { }

  ngOnInit() {
    // this.getInterims();

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter((data) => !!data)).subscribe((interims) => {
      this.interims = interims;
      this.dataSource.data = interims;
    });
    
    this.getAgents();


    this.username = this.authentificationService.getUsername();
    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
      this.uniteOrganisationnelle = this.agent.uniteOrganisationnelle;
      this.nomUniteOrgAgentConnect= this.agent.uniteOrganisationnelle.nom;
      this.niveau = this.agent.uniteOrganisationnelle.niveauHierarchique.position; 
      // Recuperer tous les plannings conges en fonction du dossier conge et de l'agent
      if(this.uniteOrganisationnelle.nom === 'DCH' || this.uniteOrganisationnelle.nom === 'DAP' || this.uniteOrganisationnelle.nom === 'SAP'){
        this.getInterims();
      }else{
       // this.getInterimByUORG();
      }
    
    });

  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  getInterims() {
      this.interimService.getAll().subscribe(
      (response) => {
        this.interims = response.body;
        this.interims = this.interims.filter(e=> (e.etat === 'TRANSMIS' || e.etat === 'VALIDER') && e.niveau===this.niveau);
      },
      (err) => {
        this.showProgressBar = true;
      },
      () => {
        this.subject$.next(this.interims);    
        this.showProgressBar = true;
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
    this.dataSource.filterPredicate = (data: any, value) => { const dataStr =JSON.stringify(data).toLowerCase(); return dataStr.indexOf(value) != -1; }
  
  }


  createInterim() {
    this.dialog.open(AddInterimComponent).afterClosed().subscribe((interim: any) => {
      /**
       * Dossier congé is the updated dossierConge (if the user pressed Save - otherwise it's null)
       */ if (interim) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.interims.unshift(new Interim(interim));
        this.subject$.next(this.interims);
      }
    });
  }
  updateInterim(interim: Interim) {
    this.dialog.open(AddInterimComponent, {
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
  deleteInterim(interim: Interim) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.interimService.delete(interim).subscribe((response) => {
         this.notificationService.success(NotificationUtil.suppression)
          this.interims.splice(
            this.interims.findIndex(
              (existingInterim) => existingInterim.id === interim.id
            ), 1
          );
          this.subject$.next(this.interims);
        });
      }
    })
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
        this.showProgressBar = true;
      },
      () => {
        // this.subject$.next(this.agents);
      }
    );
  }
  SuiviInterim(id): void {
    this.router.navigate(['/gestion-interim/suivi-interim', id]);
  }

  validationInterim(interim: Interim) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
    this.dialog.open(ValidationInterimComponent, {
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
  rejetInterim(interim: Interim) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
    this.dialog.open(RejetInterimComponent, {
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
  closeEtapeInterim(interim: Interim) {
    // this.dialogConfirmationService.confirmationDialog().subscribe(action => {
    //   if (action === DialogUtil.confirmer) {
    this.dialog.open(CloseInterimComponent, {
      data: interim
    }).afterClosed().subscribe((interim: any) => {
    /**
     * Dossier congé is the updated dossierConge (if the user pressed Save - otherwise it's null)
     */ 
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        // const index = this.interims.findIndex(
        //   (existingInterim) =>
        //     existingInterim.id === interim.id
        // );
        // this.interims[index] = new Interim(interim);

        this.interims.splice(
          this.interims.findIndex(
            (existingInterim) => existingInterim.id === interim.id
          ), 1
        );
        this.subject$.next(this.interims);
      
    });
  // }})
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
  voirInterim(interim: Interim){
    genererPDFInterim(interim);    
  }

  imputerInterim(interim:Interim){
    
    // this.dialogConfirmationService.confirmationDialog().subscribe(action => {
    //   if (action === DialogUtil.confirmer) {
    this.dialog.open(ImputeInterimComponent, {
      data: interim
    }).afterClosed().subscribe((interim: any) => {
    /**
     * Dossier congé is the updated dossierConge (if the user pressed Save - otherwise it's null)
     */ 
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        // const index = this.interims.findIndex(
        //   (existingInterim) =>
        //     existingInterim.id === interim.id
        // );
        // this.interims[index] = new Interim(interim);

        this.interims.splice(
          this.interims.findIndex(
            (existingInterim) => existingInterim.id === interim.id
          ), 1
        );
        this.subject$.next(this.interims);
      
   // });
  })
    // interim.niveau =  interim.niveau+1;

    // this.updateInterimWithEtat(
    //   interim,
    //   this.etatInterim.transmettre
    // );

    // this.interims.splice(
    //   this.interims.findIndex(
    //     (existingInterim) => existingInterim.id === interim.id
    //   ), 1
    // );
    // this.subject$.next(this.interims);    
  }

  joindreInterim(interim: Interim){
    this.dialog
    .open(JoindreInterimComponent,{
      data: interim,
    })
    .afterClosed()
    .subscribe((interim) => {
     if(interim){
      interim.fileMetaData = new FileMetaData()
     }
    });
}
  ngOnDestroy() { }

}