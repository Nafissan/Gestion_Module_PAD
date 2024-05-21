import { Component, OnInit, ViewChild, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { DialogUtil } from '../../../../shared/util/util';
import { DossierAbsence } from '../../shared/model/dossier-absence.modele';
import { ReplaySubject, Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ListColumn } from '../../../../../@fury/shared/list/list-column.model';
import { MatDialog } from '@angular/material/dialog';
import { DossierAbsenceService } from '../../shared/service/dossier-absence.service';
import { DialogConfirmationService } from '../../../../shared/services/dialog-confirmation.service';
import { filter } from 'rxjs/operators';
import { Agent } from '../../../../shared/model/agent.model';
import { UniteOrganisationnelle } from '../../../../shared/model/unite-organisationelle';
import { UniteOrganisationnelleService } from '../../../gestion-unite-organisationnelle/shared/services/unite-organisationnelle.service';
import { CompteService } from '../../../gestion-utilisateurs/shared/services/compte.service';
import { AuthenticationService } from '../../../../shared/services/authentification.service';
import { Compte } from '../../../gestion-utilisateurs/shared/model/compte.model';
import { AddDossierAbsenceComponent } from '../add-dossier-absence/add-dossier-absence.component';
import { fadeInRightAnimation } from '../../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../../../@fury/animations/fade-in-up.animation';


@Component({
  selector: 'fury-list-dossier-absence',
  templateUrl: './list-dossier-absence.component.html',
  styleUrls: ['./list-dossier-absence.component.scss',"../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class ListDossierAbsenceComponent implements OnInit, AfterViewInit, OnDestroy {
  showProgressBar: boolean = false;

  date: Date = new Date();
  currentDossierAbsence : DossierAbsence;
  currentYear: any = new Date().getFullYear();
  dialogUtil: DialogUtil = new DialogUtil();
  dossierAbsences: DossierAbsence[] = [];
  subject$: ReplaySubject<DossierAbsence[]> = new ReplaySubject<DossierAbsence[]>(
    1
  );
  data$: Observable<DossierAbsence[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<DossierAbsence> | null;

  username: string;
  agent: Agent;
  uniteOrganisationnelle: UniteOrganisationnelle;
  uniteSuperieureAgent: UniteOrganisationnelle;
  compte: Compte;
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
    { name: "Code", property: "code", visible: true, isModelProperty: true },
    { name: "Annee ", property: "annee", visible: true, isModelProperty: true },
    {
      name: "Description",
      property: "description",
      visible: true,
      isModelProperty: true,
    },
    // { name: "Etat ", property: "etat", visible: true, isModelProperty: true },
    { name: "Matricule ", property: "matricule", visible: false, isModelProperty: true },
    { name: "Prenom ", property: "prenom", visible: false, isModelProperty: true },
    { name: "Nom ", property: "nom", visible: false, isModelProperty: true },
    { name: "Structure ", property: "structure", visible: false, isModelProperty: true }, 
    { name: "Fonction ", property: "fonction", visible: false, isModelProperty: true }, 
    { name: "Actions", property: "actions", visible: true },
  ] as ListColumn[];
  constructor(
    private dossierAbsenceService: DossierAbsenceService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private authService: AuthenticationService,
    private compteService: CompteService,
    private uniteOrganisationnelleService: UniteOrganisationnelleService,
 
  ) { }

  ngOnInit() {
    //this.getDossierAbsences();
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((dossierConges) => {
    //  this.dossierConges = dossierConges;
     // this.dataSource.data = dossierConges;
    });
    this.username = this.authService.getUsername();
    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
      this.uniteOrganisationnelle = this.agent.uniteOrganisationnelle;
    }, err => {}, 
    () => {  
        this.getUniteOrganisationnelleSuperieure();
       });
       
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((dossierAbsences) => {
    this.dossierAbsences = dossierAbsences;
    this.dataSource.data    = dossierAbsences;
    this.showProgressBar = true;

  });

  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
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
  getDossierAbsences() {
    this.dossierAbsenceService.getAll().subscribe(
      (response) => {
        this.dossierAbsences = response.body;
        /* dossier active pour une seule annee */
        this.currentDossierAbsence = this.dossierAbsences.find(e => e.annee === this.currentYear.toString());
      },
      (err) => {
      },
      () => {
        // this.subject$.next(this.dossierAbsences);
        this.subject$.next(this.dossierAbsences.filter(dossierAbsence => dossierAbsence.annee === this.currentYear.toString()));
      }
    );
  }

  createDossierAbsence() {
    this.dialog
      .open(AddDossierAbsenceComponent)
      .afterClosed()
      .subscribe((dossierAbsence: any) => {
        /**
         * Dossier congé is the updated dossierConge (if the user pressed Save - otherwise it's null)
         */ if (dossierAbsence) {
          /**
           * Here we are updating our local array.
           */
          this.dossierAbsences.unshift(new DossierAbsence(dossierAbsence));
          this.subject$.next(this.dossierAbsences);
        }
      });
  }

  getUniteOrganisationnelleSuperieure() {
    let uniteOrganisationnelleSuperieures: UniteOrganisationnelle[];

    if (this.uniteOrganisationnelle.niveauHierarchique.position === 1 || this.uniteOrganisationnelle.niveauHierarchique.position === 0) {
      this.uniteSuperieureAgent = this.uniteOrganisationnelle;
      this.getDossierAbsence();
    } else {
      this.uniteOrganisationnelleService.getAllSuperieures(this.uniteOrganisationnelle.id)
        .subscribe(response => {
          uniteOrganisationnelleSuperieures = response.body;
          this.uniteSuperieureAgent = uniteOrganisationnelleSuperieures.find(e => e.niveauHierarchique.position === 1);
        }, err => {},
          () => {
            this.getDossierAbsence();
          });
    }
  }
  getDossierAbsence(){
    this.dossierAbsenceService.getAll()
            .subscribe(response => {
               this.dossierAbsences = response.body;
               this.dossierAbsences = this.dossierAbsences.filter(d => d.codeDirection === this.uniteSuperieureAgent.code);
            }, err => {},
            () => {
              this.subject$.next(this.dossierAbsences);
            });
  }
  updateDossierAbsence(dossierAbsence: DossierAbsence) {
    this.dialog
      .open(AddDossierAbsenceComponent, {
        data: dossierAbsence,
      })
      .afterClosed()
      .subscribe((dossierAbsence) => {
      
        if (dossierAbsence) {
        
          const index = this.dossierAbsences.findIndex(
            (existingDossierAbsence) =>
            existingDossierAbsence.id === dossierAbsence.id
          );
          this.dossierAbsences[index] = new DossierAbsence(dossierAbsence);
          this.subject$.next(this.dossierAbsences);
        }
      });
  }
  // detailsDossierConge(dossierConge: DossierConge) {
  //   this.dialog
  //     .open(DetailsDossierCongeComponent, {
  //       data: dossierConge,
  //     })
  //     .afterClosed()
  //     .subscribe((dossierConge) => {
  //       /**
  //        * DossierConge is the updated dossierConge (if the user pressed Save - otherwise it's null)
  //        */
  //       if (dossierConge) {
  //         /**
  //          * Here we are updating our local array.
  //          * You would probably make an HTTP request here.
  //          */
  //         const index = this.dossierConges.findIndex(
  //           (existingDossierConge) =>
  //             existingDossierConge.id === dossierConge.id
  //         );
  //         this.dossierConges[index] = new DossierConge(dossierConge);
  //         this.subject$.next(this.dossierConges);
  //       }
  //     });
  // }
  deleteDossierAbsence(dossierAbsence: DossierAbsence) {

    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.dossierAbsenceService.delete(dossierAbsence).subscribe((response) => {
          this.dossierAbsences.splice(
            this.dossierAbsences.findIndex(
              (existingDossierAbsence) => existingDossierAbsence.id === dossierAbsence.id
            ),1);
          this.subject$.next(this.dossierAbsences);
        })
      } 
    })
  }
  ngOnDestroy() { }
}