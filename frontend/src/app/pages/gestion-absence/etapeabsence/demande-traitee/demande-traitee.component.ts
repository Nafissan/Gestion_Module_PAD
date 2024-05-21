import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { fadeInUpAnimation } from '../../../../../@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from '../../../../../@fury/animations/fade-in-right.animation';
import { Absence } from '../../shared/model/absence.model';
import { EtapeAbsence } from '../../shared/model/etape-absence.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EtapeAbsenceService } from '../../shared/service/etape-absence.service';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { Observable, ReplaySubject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { filter } from 'rxjs/operators';
import { UniteOrganisationnelle } from 'src/app/shared/model/unite-organisationelle';
import { Agent } from '../../../../shared/model/agent.model';
import { Compte } from 'src/app/pages/gestion-utilisateurs/shared/model/compte.model';
import { AbsenceService } from '../../shared/service/absence.service';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { CompteService } from 'src/app/pages/gestion-utilisateurs/shared/services/compte.service';
import { UniteOrganisationnelleService } from 'src/app/pages/gestion-unite-organisationnelle/shared/services/unite-organisationnelle.service';
import { EtatAbsence } from '../../shared/util/etat';
import { DetailsAbsenceComponent } from '../../absence/details-absence/details-absence.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'fury-demande-traitee',
  templateUrl: './demande-traitee.component.html',
  styleUrls: ['./demande-traitee.component.scss',"../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class DemandeTraiteeComponent implements OnInit {

  absences: Absence[] = [];
  absence: Absence;
  etapeAbsences: EtapeAbsence[];
  etatAbsence: EtatAbsence = new EtatAbsence()
  form: FormGroup;
  showProgressBar:boolean=false
  defaults: any;
  agent: Agent;
  agentConnect :Agent
  agents:Agent[];
  uniteOrganisationnelle: UniteOrganisationnelle;
  compte: Compte;
  username: string;
  uniteSuperieureAgent: UniteOrganisationnelle;
  idUniteOrganisationnelleInferieures: number[] = [];
  uniteOrganisationnelleInferieures: UniteOrganisationnelle[] = [];
  uniteOrganisationnelles: UniteOrganisationnelle[] = [];
  uniteOrganisationnelleSuperieures: UniteOrganisationnelle[] = [];
  subject$: ReplaySubject<Absence[]> = new ReplaySubject<Absence[]>(
    1
  );
  data$: Observable<Absence[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<Absence> | null;
  selection = new SelectionModel<Absence>(true, []);

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
    { name: "Matricule", property: "matricule",visible: false,isModelProperty: true },
    { name: "prenom", property: "prenom",visible: false,isModelProperty: true },
    { name: "nom",property: "nom",visible: false,isModelProperty: true },
    { name: "Date Depart",property: "dateDepart",visible: false, isModelProperty: true },
    { name: "date Retour Previsionnelle",property: "dateRetourPrevisionnelle",visible: false,isModelProperty: true },
    { name: "date Retour Effectif",property: "dateRetourEffectif",visible: false, isModelProperty: true },
    { name: "date de Saisie", property: "dateSaisie", visible: false, isModelProperty: true },
    { name: "motif",property: "motif",visible: false,isModelProperty: true },
    { name: "Date Traitement",property: "dateTraitement",visible: true, isModelProperty: true },
    { name: "Action", property: "action", visible: true, isModelProperty: true, },
    { name: "Etat", property: "etat", visible: false, isModelProperty: true, },
    { name: "Profil",property: "profil",visible: false,isModelProperty: true, },
    { name: "commentaire",property: "commentaire",visible: true, isModelProperty: true, },
    { name: "Actions", property: "actions", visible: false },


  ] as ListColumn[];

  constructor(

    private absenceService: AbsenceService,
    private etapeAbsenceService:EtapeAbsenceService,
    private authService: AuthenticationService,
    private compteService: CompteService,
    private uniteOrganisationnelleService: UniteOrganisationnelleService,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      commentaire: [''],

    });
  //  this.getEtapeAbsenceByAbsence();
    this.username = this.authService.getUsername();
    this.compteService.getByUsername(this.username).subscribe((response) => {
    this.compte = response.body;
    this.agent = this.compte.agent;
    this.uniteOrganisationnelle = this.agent.uniteOrganisationnelle;
    this.getAllByAgent(this.agent.id);
    this.getUniteOrganisationnellesInferieures();

  });

    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((absences) => {
      this.absences = absences;
      this.dataSource.data = absences;
      this.showProgressBar=true
    });
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

// getEtapeAbsenceByAbsence(){

//   this.etapeAbsenceService.getAll().subscribe(response=>{
//     this.etapeAbsences = response.body;
//    this.etapeAbsences = this.etapeAbsences.filter(a=> (a.absence.id===this.absence.id));
//   })
// }

getAllByAgent(idAgent:number) {
  this.absenceService.getAbsencesByAgent(idAgent)
  .subscribe(
    (response) => {
      this.absences = response.body;
      this.absences =  this.absences.filter(n=>n.etat !== "SAISI");
    },
    (err) => {
    },
    () => {
      this.subject$.next(this.absences);
      this.showProgressBar = true;
    }
  );
}
getAllAbsenceByUniteOrganisationnelles(
  idUniteOrganisationnelles: number[]
) {
      this.absenceService.getAllByAbsencesUniteOrganisationnelles(idUniteOrganisationnelles)
      .subscribe(
      (response) => {
        this.absences = response.body;
        this.absences =  this.absences.filter(n=>n.etat !== "SAISI");
      }, err => {
        this.showProgressBar = true;
      },
      () => {
        this.subject$.next(this.absences);
        this.showProgressBar = true;
      });
}

getUniteOrganisationnellesInferieures() {
  if (this.uniteOrganisationnelle.niveauHierarchique.position === 0) {
    this.idUniteOrganisationnelleInferieures.unshift(this.uniteOrganisationnelle.id);
    this.getAllAbsenceByUniteOrganisationnelles(this.idUniteOrganisationnelleInferieures);
  } else {
    this.uniteOrganisationnelleService.getAllInferieures(this.uniteOrganisationnelle.id)
      .subscribe(response => {
        this.uniteOrganisationnelleInferieures = response.body;
        this.uniteOrganisationnelleInferieures.unshift(this.uniteOrganisationnelle);

        this.uniteOrganisationnelleInferieures.forEach(unite => {
          this.idUniteOrganisationnelleInferieures.push(unite.id);
        })
      }, err => { },
        () => {
          this.getAllAbsenceByUniteOrganisationnelles(this.idUniteOrganisationnelleInferieures);
        });
       }
}

detailsAbsence(absence: Absence) {
  this.dialog
    .open(DetailsAbsenceComponent, {
      data: absence,
    })
    .afterClosed()
    .subscribe((absence) => {
      if (absence) {
        const index = this.absences.findIndex(
          (existingAbsence) =>
          existingAbsence.id === absence.id
        );
        this.absences[index] = new Absence(absence);
        this.subject$.next(this.absences);
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
    checkboxLabel(row?: Absence): string {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
    }

    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }

  ngOnDestroy() {}

save() {}

}
