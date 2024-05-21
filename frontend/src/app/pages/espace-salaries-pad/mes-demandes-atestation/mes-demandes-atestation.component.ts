import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Attestation } from '../../gestion-demande-attestation/shared/model/demande-attestation.model';
import { DemandeAttestationService } from '../../gestion-demande-attestation/shared/services/demande-attestation.service';
import { EtatAttestation } from '../../gestion-demande-attestation/shared/util/etat';
import { Compte } from '../../gestion-utilisateurs/shared/model/compte.model';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';
import { CompteService } from '../../gestion-utilisateurs/shared/services/compte.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { saveAs as importedSaveAs } from "file-saver";
import { Router } from '@angular/router';
import { MatDatepicker } from '@angular/material/datepicker';
import { AddAttestationComponent } from '../../gestion-demande-attestation/demande-attestation/add-attestation/add-attestation.component';
import { DetailDemandeAttestationComponent } from '../../gestion-demande-attestation/demande-attestation/detail-demande-attestation/detail-demande-attestation.component';
import { AjoutDemandeAttestationComponent } from '../ajout-demande-attestation/ajout-demande-attestation.component';
import { SelectionModel } from '@angular/cdk/collections';
import { DownloadAttestationComponent } from '../../gestion-demande-attestation/suivi-attestation/download-attestation/download-attestation.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fadeInRightAnimation } from '../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';
import { Agent } from '../../../shared/model/agent.model';
import { ListColumn } from '../../../../@fury/shared/list/list-column.model';
import { DialogUtil } from '../../../shared/util/util';
import { DialogConfirmationService } from '../../../shared/services/dialog-confirmation.service';
import { AuthenticationService } from '../../../shared/services/authentification.service';
import { NotificationService } from '../../../shared/services/notification.service';
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
  selector: 'fury-mes-demandes-atestation',
  templateUrl: './mes-demandes-atestation.component.html',
  styleUrls: ['./mes-demandes-atestation.component.scss', '../../../shared/util/bootstrap4.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class MesDemandesAtestationComponent implements OnInit, AfterViewInit, OnDestroy  {
  showProgressBar: boolean = false;

  demandeAttestations: Attestation[]=[];
  subject$: ReplaySubject<Attestation[]> = new ReplaySubject<Attestation[]>(1);
  data$: Observable<Attestation[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<Attestation> | null;
  etatAttestation: EtatAttestation = new EtatAttestation();
  agent: Agent;
  username: string;
  compte: Compte;
  selection = new SelectionModel<Attestation>(true, []);
  dateDemandeAttestation = new FormControl(moment());
  form: FormGroup;
  currentYear: number = new Date().getFullYear();
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

    //{ name: "Etat", property: "etat", visible: true, isModelProperty: true },
    // { name: "Code", property: "code", visible: true, isModelProperty: true },
    // {
    //   name: "Date creation",
    //   property: "dateCreation",
    //   visible: true,
    //   isModelProperty: true,
    // },
    // { name: "Année ", property: "annee", visible: true, isModelProperty: true }, 
    {
      name: "Date Naissance",
      property: "dateNaissance",
      visible: false ,
      isModelProperty: true,
    },
    // {
    //   name: "Telephone",
    //   property: "telephone",
    //   visible: true,
    //   isModelProperty: true,
    // },

    {
      name: "Date de saisie",
      property: "dateSaisie",
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
      name: "Etat",
      property: "etat",
      visible: true,
      isModelProperty: true
    },
    { name: "Actions", property: "actions", visible: true }
  ] as ListColumn[];

  constructor(
    private demandeAttestationService: DemandeAttestationService,
    private notificationService: NotificationService,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private compteService: CompteService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
  ) {}
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.dateDemandeAttestation.value;
    ctrlValue.year(normalizedYear.year());
    this.dateDemandeAttestation.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.dateDemandeAttestation.value;
    ctrlValue.month(normalizedMonth.month());
    this.dateDemandeAttestation.setValue(ctrlValue);
    datepicker.close();
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.data$
      .pipe(filter((data) => !!data))
      .subscribe((demandeAttestations) => {
        this.demandeAttestations = demandeAttestations;
        this.dataSource.data = demandeAttestations;
      });

    this.form = this.fb.group({
      demandeAttestations: ['', Validators.required]
    });
    this.username = this.authentificationService.getUsername();
    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
      // Recuperer toutes les demandes d'attestation en fonction de l'agent
      this.getDemandesAttestationsByAgent();
    });
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  getDemandesAttestationsByAgent() {
    this.demandeAttestationService.getAttestationsByAgent(this.agent.id).subscribe(
      (response) => {
        this.demandeAttestations = response.body;
      },
      (err) => {
        this.showProgressBar = true;
      },
      () => {
        this.subject$.next(this.demandeAttestations);
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
  }
  createDemandeAttestation() {
    this.dialog
      .open(AjoutDemandeAttestationComponent)
      .afterClosed()
      .subscribe((demandeAttestation: any) => {
       if (demandeAttestation) {
          this.demandeAttestations.unshift(new Attestation(demandeAttestation));
          this.subject$.next(this.demandeAttestations);
        }
      });
  }

  detailsDemandeAttestation(detailAtttestation: Attestation) {
    this.dialog
      .open(DetailDemandeAttestationComponent, {
        data: detailAtttestation,
      })
      .afterClosed()
      .subscribe((detailAtttestation) => {
        if (detailAtttestation) {
          const index = this.demandeAttestations.findIndex(
            (existingDossierConge) =>
              existingDossierConge.id === detailAtttestation.id
          );
          this.demandeAttestations[index] = new Attestation(detailAtttestation);
          this.subject$.next(this.demandeAttestations);
        }
      });
  }
  
  updateAttestation(attestation: Attestation, etat) {
    attestation.etat = etat;
    this.demandeAttestationService.update(attestation).subscribe((response) => {
      
      const index = this.demandeAttestations.findIndex(
        (existingDemandeAttestation) =>
          existingDemandeAttestation.id === attestation.id
      );
      this.demandeAttestations[index] = new Attestation(attestation);
      this.subject$.next(this.demandeAttestations);
    });
  }

  transmettreDemandeAttestation(demandeAttestation?: Attestation, type?: string) {
    if (type === 'one') {
      this.dialogConfirmationService.confirmationDialog().subscribe(action => {
        if (action === DialogUtil.confirmer) {
          this.updateAttestation(demandeAttestation, EtatAttestation.transmettre);
        }
      })
    }
    else if (type === 'many') {
      let attestation = this.selection.selected.find(el => (el.etat !== EtatAttestation.saisir))
      if (attestation !== undefined) {
        this.notificationService.warn('Seule les demandes a l\'état saisi peuvent être transmises');
        return;
      }

      this.dialogConfirmationService.confirmationDialog().subscribe(action => {
        if (action === DialogUtil.confirmer) {
          this.updateAttestationMany(this.selection.selected, EtatAttestation.transmettre);
        }
      })
    }
  }
  updateDemandeAttestation(demandeAttestation: Attestation) {
    this.dialog
      .open(AjoutDemandeAttestationComponent, {
        data: demandeAttestation,
      })
      .afterClosed()
      .subscribe((demandeAttestation) => {
        if (demandeAttestation) {
          const index = this.demandeAttestations.findIndex(
            (existingDemandeAttestation) =>
              existingDemandeAttestation.id === demandeAttestation.id
          );
          this.demandeAttestations[index] = new Attestation(demandeAttestation);
          this.subject$.next(this.demandeAttestations);
        }
      });
  }

  deleteDemandeAttestation(demandeAttestation: Attestation) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.demandeAttestationService
          .delete(demandeAttestation)
          .subscribe((response) => {
            this.demandeAttestations.splice(
              this.demandeAttestations.findIndex(
                (existingDossierConge) =>
                  existingDossierConge.id === demandeAttestation.id
              ),
              1
            );
            this.subject$.next(this.demandeAttestations);
          });
      }
    })
  }

  updateAttestationMany(attestations: Attestation[], etat: string) {
    attestations.forEach(el => el.etat = etat)
    this.demandeAttestationService.updateMany(attestations).subscribe((response) => {
      
    });
  }

  ngOnDestroy() { }
  recherche() {

  }

  downloadAttestation(demandeAttestation: Attestation){
    this.demandeAttestationService.downloadAttestation(demandeAttestation).subscribe((response) => {
      
      let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });   
      const url = window.URL.createObjectURL(blob);
      importedSaveAs(blob, demandeAttestation.agent.prenom + "_" + demandeAttestation.agent.nom + '.pdf');
      this.snackbar.open('Téléchargement en cour!', null, {
        duration: 5000
      });

    });
     
  }
}
