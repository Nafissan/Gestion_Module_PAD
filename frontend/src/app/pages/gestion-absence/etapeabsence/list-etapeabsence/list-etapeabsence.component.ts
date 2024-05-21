import { Component, OnInit, ViewChild, Input, Inject, AfterViewInit, OnDestroy } from '@angular/core';
import { EtapeAbsence } from '../../shared/model/etape-absence.model';
import { ReplaySubject, Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ListColumn } from '../../../../../@fury/shared/list/list-column.model';
import { EtapeAbsenceService } from '../../shared/service/etape-absence.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { filter, startWith, map } from 'rxjs/operators';
import { AddEtapeabsenceComponent } from '../add-etapeabsence/add-etapeabsence.component';
import { fadeInUpAnimation } from '../../../../../@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from '../../../../../@fury/animations/fade-in-right.animation';
import { EtatAbsence } from '../../shared/util/etat';
import { DetailsEtapeabsenceComponent } from '../details-etapeabsence/details-etapeabsence.component';
import { Absence } from '../../shared/model/absence.model';
import { DetailsAbsenceComponent } from '../../absence/details-absence/details-absence.component';
import { DialogConfirmationService } from '../../../../shared/services/dialog-confirmation.service';
import { DialogUtil, NotificationUtil } from '../../../../shared/util/util';
import { NotificationService } from '../../../../shared/services/notification.service';
import { Compte } from '../../../gestion-utilisateurs/shared/model/compte.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Agent } from '../../../../shared/model/agent.model';
import { Motif } from '../../shared/model/motif.model';
import { UniteOrganisationnelle } from '../../../../shared/model/unite-organisationelle';
import { PlanningAbsence } from '../../shared/model/planning-absence.modele';
import { AddAbsenceComponent } from '../../absence/add-absence/add-absence.component';
import { AbsenceService } from '../../shared/service/absence.service';
import { MotifService } from '../../shared/service/motif.service';
import { AuthenticationService } from '../../../../shared/services/authentification.service';
import { CompteService } from '../../../gestion-utilisateurs/shared/services/compte.service';
import { DateAdapter } from '@angular/material/core';
import { PlanningAbsenceService } from '../../shared/service/planning-absence.service';
import { UniteOrganisationnelleService } from '../../../gestion-unite-organisationnelle/shared/services/unite-organisationnelle.service';
import { CloseAbsenceComponent } from '../../absence/close-absence/close-absence.component';
import { RejeterAbsenceComponent } from '../rejeter-absence/rejeter-absence.component';
import { HistoriqueAbsenceComponent } from '../historique-absence/historique-absence.component';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'fury-list-etapeabsence',
  templateUrl: './list-etapeabsence.component.html',
  styleUrls: ['./list-etapeabsence.component.scss',"../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class ListEtapeabsenceComponent implements OnInit, AfterViewInit, OnDestroy {

  date: Date = new Date();
  showProgressBar:boolean=false
  dialogUtil: DialogUtil = new DialogUtil();
  absences: Absence[] = [];
  absence: Absence;
  absenceSelected: Absence;
  agent: Agent;
  agentConnect :Agent
  agents:Agent[];
  uniteOrganisationnelle: UniteOrganisationnelle;
  compte: Compte;
  niveau: number;
  nomNiveau:any;
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
  etatAbsence: EtatAbsence = new EtatAbsence()
  form: FormGroup;
  selection = new SelectionModel<Absence>(true, []);
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
      visible: false,
      isModelProperty: true,
    },
    { name: "prenom",
    property: "prenom",
    visible: true,
    isModelProperty: true,
   },
    { name: "nom",
    property: "nom",
    visible: true,
    isModelProperty: true,
   },
    {
      name: "Date Depart",
      property: "dateDepart",
      visible: true,
      isModelProperty: true,
    },
    { name: "date Retour Previsionnelle",
     property: "dateRetourPrevisionnelle",
     visible: false,
     isModelProperty: true,
     },
    {
      name: "date Retour Effectif",
      property: "dateRetourEffectif",
      visible: false,
      isModelProperty: true,
    },
    { name: "date de Saisie",
     property: "dateSaisie",
     visible: false,
     isModelProperty: true,
   },
   {
    name: "motif",
    property: "motif",
    visible: false,
    isModelProperty: true,
  },
  {
    name: "jours absence",
    property: "jours",
    visible: false,
    isModelProperty: true,
  },
  {
      name: "creer le",
      property: "createdAt",
      visible: false,
      isModelProperty: true,
    },
    { name: "mise a jour le",
     property: "updatedAt",
     visible: false,
     isModelProperty: true,
    },
    { name: "Etat",
    property: "etat",
     visible: true,
     isModelProperty: true,
    },
    { name: "commentaire",
    property: "commentaire",
    visible: true,
    isModelProperty: true,
   },
    { name: "Actions", property: "actions", visible: true },


  ] as ListColumn[];
  constructor(
    private absenceService: AbsenceService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService,
    private authService: AuthenticationService,
    private compteService: CompteService,
    private uniteOrganisationnelleService: UniteOrganisationnelleService,
    private etapeAbsenceService: EtapeAbsenceService,
    private fb: FormBuilder,
  ) {}
  ngOnInit() {

    this.form = this.fb.group({
      commentaire: [''],

    });
   // this.getAbsences()
   this.getAgents();
    this.username = this.authService.getUsername();
    this.compteService.getByUsername(this.username).subscribe((response) => {
     this.compte = response.body;
     this.agent = this.compte.agent;
     this.uniteOrganisationnelle = this.agent.uniteOrganisationnelle;
     this.agentConnect = this.compte.agent;
     this.niveau = this.agent.uniteOrganisationnelle.niveauHierarchique.position;
     this.getUniteOrganisationnellesInferieures();

 });
 this.dataSource = new MatTableDataSource();
 this.data$.pipe(filter((data) => !!data)).subscribe((absences) => {
   this.absences = absences;
   this.dataSource.data = absences;
   this.showProgressBar=true
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
        }, err => {
          this.showProgressBar=true
         },
          () => {
            this.getAllAbsenceByUniteOrganisationnelles(this.idUniteOrganisationnelleInferieures);

          });
    }

  }
  getAllAbsenceByUniteOrganisationnelles(
    idUniteOrganisationnelles: number[]
  ) {
        this.absenceService.getAllByAbsencesUniteOrganisationnelles(idUniteOrganisationnelles)
        .subscribe(
        (response) => {
          this.absences = response.body;

          if(this.uniteOrganisationnelle.niveauHierarchique.position===1){
            this.absences= this.absences.filter(n=> (n.niveau===this.uniteOrganisationnelle.niveauHierarchique.position) && (n.etat !== this.etatAbsence.rejeter) || (n.niveau===0 && n.etat === this.etatAbsence.encours) && (n.etat !== this.etatAbsence.saisir) && (n.etat !== this.etatAbsence.transmettre) || (n.etat === this.etatAbsence.atransmettre));
          }
          else{
            this.absences= this.absences.filter(n=>n.niveau===this.uniteOrganisationnelle.niveauHierarchique.position && n.etat !== this.etatAbsence.rejeter && n.etat!==this.etatAbsence.transmettre && n.etat!==this.etatAbsence.valider)

          }
        }, err => {
          this.showProgressBar=true
        },
        () => {
          this.subject$.next(this.absences);
          this.showProgressBar=true
          //this.isPlanningDirectionValide();
          // this.dataSource = new MatTableDataSource();
          // this.data$.pipe(filter((data) => !!data)).subscribe((absences) => {
          //   this.absences = absences;

          //   this.dataSource.data = absences;
          // });
        });
  }
  getNombtreJour(dateRetourEffectif: Date, dateRetourPrev: Date, dateDepart: Date){
    let date: number;
    if(dateRetourEffectif === null){
      date = new Date(dateRetourPrev).getTime() - new Date(dateDepart).getTime();
    }else{
      date = new Date(dateRetourEffectif).getTime() - new Date(dateDepart).getTime();
    }
    return date/(1000*3600*24);
    }

  createAbsence() {
    this.dialog
      .open(AddAbsenceComponent)
      .afterClosed()
      .subscribe((absence: any) => {

        if (absence) {
          this.absences.unshift(new Absence(absence));
          this.subject$.next(this.absences);
        }
      });
  }
  updateAbsence(absence: Absence) {
    this.dialog
      .open(AddAbsenceComponent, {
        data: absence,
      })
      .afterClosed()
      .subscribe((customer) => {
        /**
         * Customer is the updated customer (if the user pressed Save - otherwise it's null)
         */
        if (absence) {
          const index = this.absences.findIndex(
            (existingAbsence) =>
              existingAbsence.id === absence.id
          );
          this.absences[index] = new Absence(customer);
          this.subject$.next(this.absences);
        }
      });
  }
  deleteAbsence(absence: Absence) {

    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer){
    this.absenceService.delete(absence).subscribe((response) => {
      this.notificationService.success(NotificationUtil.suppression)

      this.absences.splice(
        this.absences.findIndex(
          (existingAbsence) => existingAbsence.id === absence.id
        ),
        1
      );
      this.subject$.next(this.absences);
    })
      }
     });
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
  closeAbsence(absence: Absence) {
    this.dialog.open(CloseAbsenceComponent, {
      data: absence
    }).afterClosed().subscribe((absence: any) => {

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


  validerAbsence(absence: Absence){
    this.dialog.open(AddEtapeabsenceComponent, {
      data: absence
    }).afterClosed().subscribe((absence: any) => {

      if (this.uniteOrganisationnelle.id!==1) {

          this.absences.splice(
          this.absences.findIndex(
            (existingAbsence) => existingAbsence.id === absence.id
          ),
          1
        );
        this.subject$.next(this.absences);
      }
    });
  }

  validerAbsenceDirecteur(absence: Absence){
    this.dialog.open(AddEtapeabsenceComponent, {
      data: absence
    }).afterClosed().subscribe((absence: any) => {

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
  updateAbsenceValider(absence:Absence) {
  let etapeAbsence: EtapeAbsence;
      etapeAbsence = this.form.value;
      etapeAbsence.prenom = this.agent.prenom;
      etapeAbsence.nom =   this.agent.nom;
      etapeAbsence.matricule= this.agent.matricule;
      etapeAbsence.fonction= this.agent.fonction.nom;
      etapeAbsence.structure = this.agent.uniteOrganisationnelle.description;
      etapeAbsence.date = new Date
      etapeAbsence.action = this.etatAbsence.valider;

      if(absence.niveau === 0){
      absence.niveau = absence.niveau;
      absence.etat = this.etatAbsence.encours;
      }
      else if(absence.niveau === 1){
        absence.niveau = absence.niveau - 1;
        absence.etat = this.etatAbsence.atransmettre;
      }
      else{
        absence.niveau = absence.niveau - 1;
        absence.etat = this.etatAbsence.encours;
      }

      etapeAbsence.absence = absence;

    this.etapeAbsenceService.create(etapeAbsence).subscribe(
      response => {
       if(response.status === 200){
         let absence:Absence
         absence = response.body.absence
         this.absenceService.update(absence)
           .subscribe(response => {
             absence = response.body;
           }, err => { },
             () => {
              //  this.dialogRef.close(absence);
             })
       }
      }
    )
  }

  validerAbsenceMany(absences: Absence[]) {
    absences.forEach(element => {
      this.updateAbsenceValider(element);

      if(this.niveau !== 1){
          this.absences.splice(
        this.absences.findIndex(
          (existingAbsence) => existingAbsence.id === element.id
        ),
        1
      );
      this.notificationService.success(NotificationUtil.validation)
      this.subject$.next(this.absences);
    }
  })
    };
  rejeterAbsence(absence: Absence) {

    this.dialog.open(RejeterAbsenceComponent, {
      data: absence
    }).afterClosed().subscribe((absence: any) => {

      if (absence) {
        // const index = this.absences.findIndex(
        //   (existingAbsence) =>
        //     existingAbsence.id === absence.id
        // );
        // this.absences[index] = new Absence(absence);
        // this.subject$.next(this.absences);

        this.absences.splice(
          this.absences.findIndex(
            (existingAbsence) => existingAbsence.id === absence.id
          ),
          1
        );
        this.subject$.next(this.absences);
      }
    });
  }
  historiqueAbsence(absence: Absence) {
    this.dialog
      .open(HistoriqueAbsenceComponent, {
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

  getAgents() {
    this.absenceService.getAgents().subscribe(
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
  transmettreAbsence(absence: Absence){
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer){
      absence.etape = this.agent.uniteOrganisationnelle.description;
     this.updateAbsenceWithEtat(absence)
     this.absences.splice(
      this.absences.findIndex(
        (existingAbsence) => existingAbsence.id === absence.id
      ),
      1
    );
    this.notificationService.success(NotificationUtil.transmis)
    this.subject$.next(this.absences);
  }})
}
  transmettreAbsenceMany(absences: Absence[]){
    absences.forEach(element => {
    element.etape = this.agent.uniteOrganisationnelle.description;
      this.updateAbsenceWithEtat(element)
    this.absences.splice(
     this.absences.findIndex(
       (existingAbsence) => existingAbsence.id === element.id
     ),
     1
   );
   this.notificationService.success(NotificationUtil.transmis)
   this.subject$.next(this.absences);
    });
 }

  updateAbsenceWithEtat(absence: Absence){
    absence.etat = 'TRANSMIS'
    absence.etape_validation = 5;
    this.absenceService.update(absence).subscribe(
      response => {
       const index = this.absences.findIndex(
        (existingAbsence) =>
         existingAbsence.id === absence.id
        );
        this.absences[index] = new Absence(absence);
        this.subject$.next(this.absences);
        })
  }



  validerDemandeAbsence(absence?: Absence, type?: string) {
    if(type === 'one'){
      this.dialogConfirmationService.confirmationDialog().subscribe(action =>{
        if (action === DialogUtil.confirmer){
          this.validerAbsence(absence);
        }
      })
    }
    else if(type === 'many'){
      let absence = this.selection.selected.find(el => (el.etat=== this.etatAbsence.saisir) || (el.etat === this.etatAbsence.encours))
      if(absence === undefined){
        this.notificationService.warn('Seule les demandes à l\'état "En COURS" peuvent être validées');
        return;
      }

      this.dialogConfirmationService.confirmationDialog().subscribe(action =>{
        if (action === DialogUtil.confirmer){


          this.validerAbsenceMany(this.selection.selected);
        }
      })

      this.subject$.next(this.absences);
    }
  }


  transmettreDemandeAbsence(absence?: Absence, type?: string) {
    if(type === 'one'){
      this.dialogConfirmationService.confirmationDialog().subscribe(action =>{
        if (action === DialogUtil.confirmer){
          this.transmettreAbsence(absence);
        }
      })
    }
    else if(type === 'many'){
      let absence = this.selection.selected.find(el => (el.etat=== this.etatAbsence.atransmettre))
      if(absence === undefined){
        this.notificationService.warn('Seule les demandes à l\'état "A TRANSMETTRE" peuvent être transmis');
        return;
      }


      this.selection.selected.forEach(element => {
        this.absenceSelected = element;
      });
      this.dialogConfirmationService.confirmationDialog().subscribe(action =>{
        if (action === DialogUtil.confirmer){

          this.transmettreAbsenceMany(this.selection.selected);
        }
      })

      this.subject$.next(this.absences);
    }
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



}
