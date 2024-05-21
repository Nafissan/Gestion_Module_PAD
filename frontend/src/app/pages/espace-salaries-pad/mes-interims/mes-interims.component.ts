import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { fadeInRightAnimation } from '../../../../../src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../../../src/@fury/animations/fade-in-up.animation';
import { ListColumn } from '../../../../../src/@fury/shared/list/list-column.model';
import { Agent } from '../../../../../src/app/shared/model/agent.model';
import { UniteOrganisationnelle } from '../../../../../src/app/shared/model/unite-organisationelle';
import { AuthenticationService } from '../../../../../src/app/shared/services/authentification.service';
import { DialogConfirmationService } from '../../../../../src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from '../../../../../src/app/shared/services/notification.service';
import { DialogUtil, NotificationUtil } from '../../../../../src/app/shared/util/util';
import { CloseInterimComponent } from '../../gestion-interim/interim/close-interim/close-interim.component';
import { DetailsInterimComponent } from '../../gestion-interim/interim/details-interim/details-interim.component';
import { RejetInterimComponent } from '../../gestion-interim/interim/rejet-interim/rejet-interim.component';
import { ValidationInterimComponent } from '../../gestion-interim/interim/validation-interim/validation-interim.component';
import { Interim } from '../../gestion-interim/shared/model/interim.model';
import { InterimService } from '../../gestion-interim/shared/services/interim.service';
import { EtatInterim } from '../../gestion-interim/shared/util/etat';
import { Compte } from '../../gestion-utilisateurs/shared/model/compte.model';
import { MatSnackBar } from "@angular/material/snack-bar";
import { HistoriqueInterimComponent } from "../../gestion-interim/interim/historique-interim/historique-interim.component";
import { CompteService } from '../../gestion-utilisateurs/shared/services/compte.service';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { saveAs as importedSaveAs } from "file-saver";
import { MatDatepicker } from '@angular/material/datepicker';
import { AjoutDemandeInterimComponent } from '../ajout-demande-interim/ajout-demande-interim.component';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'fury-mes-interims',
  templateUrl: './mes-interims.component.html',
  styleUrls: ['./mes-interims.component.scss', '../../../shared/util/bootstrap4.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class MesInterimsComponent implements OnInit, AfterViewInit, OnDestroy  {
  showProgressBar: boolean = false;
  interims: Interim[]=[];
  agent: Agent;
  agents: Agent[];
  username: string;
  compte: Compte;
  niveau: number;
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
    private snackbar: MatSnackBar,
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
      this.niveau =  this.agent.uniteOrganisationnelle.niveauHierarchique.position;
      // Recuperer tous les plannings conges en fonction du dossier conge et de l'agent
      // if(this.uniteOrganisationnelle.nom === 'DCH'){
      //   this.getInterims();
      // }else{
      //   this.getInterimByUORG();
      // }
      this.getInterimsByAgent();
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
    this.dataSource.filterPredicate = (data: any, value) => { const dataStr =JSON.stringify(data).toLowerCase(); return dataStr.indexOf(value) != -1; }
  
  }


  createInterim() {
    this.dialog.open(AjoutDemandeInterimComponent).afterClosed().subscribe((interim: any) => {
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
    this.dialog.open(AjoutDemandeInterimComponent, {
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
    interim.niveau = this.niveau;
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
    this.interimService.getInterimsByAgent(this.agent.id).subscribe(
      (response) => {
        this.interims = response.body;
      },
      (err) => {
      },
      () => {
        this.subject$.next(this.interims);
        this.showProgressBar = true;
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

   historiqueInterim(interim: Interim) {
    // this.dialogConfirmationService.confirmationDialog().subscribe(action => {
    //   if (action === DialogUtil.confirmer) {
    this.dialog.open(HistoriqueInterimComponent, {
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
      // }
    // });
  }})}


  downloadInterim(interim: Interim){
     
    this.interimService.downloadInterim(interim).subscribe((response) => {
      let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });   
      const url = window.URL.createObjectURL(blob);
      importedSaveAs(blob, interim.agentDepart.prenom + "_" + interim.agentDepart.nom + '.pdf');
      this.snackbar.open('Téléchargement réussie!', null, {
        duration: 5000
      });
    },(err)=>{
      this.notificationService.warn('La decision n\'est pas encore disponible');
    });
     
   
  }
  ngOnDestroy() { }


}
