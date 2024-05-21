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

import { fadeInUpAnimation } from '../../../../../@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from '../../../../../@fury/animations/fade-in-right.animation';
import { EtatAbsence } from '../../shared/util/etat';
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
import { HistoriqueAbsenceComponent } from '../../etapeabsence/historique-absence/historique-absence.component';
import { AbsenceService } from '../../shared/service/absence.service';
import { MotifService } from '../../shared/service/motif.service';
import { AuthenticationService } from '../../../../shared/services/authentification.service';
import { CompteService } from '../../../gestion-utilisateurs/shared/services/compte.service';
import { DateAdapter } from '@angular/material/core';
import { PlanningAbsenceService } from '../../shared/service/planning-absence.service';
import { UniteOrganisationnelleService } from '../../../gestion-unite-organisationnelle/shared/services/unite-organisationnelle.service';
import { CloseAbsenceComponent } from '../../absence/close-absence/close-absence.component';
import { AddEtapeabsenceComponent } from '../../etapeabsence/add-etapeabsence/add-etapeabsence.component';
import { AddValiderAbsenceComponent } from '../add-valider-absence/add-valider-absence.component';
import { RejeterAbsenceComponent } from '../../etapeabsence/rejeter-absence/rejeter-absence.component';
import { ImputerAbsenceComponent } from '../../etapeabsence/imputer-absence/imputer-absence.component';

import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'fury-list-absence',
  templateUrl: './list-absence.component.html',
  styleUrls: ['./list-absence.component.scss',"../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ListAbsenceComponent implements OnInit, AfterViewInit, OnDestroy {
  
  date: Date = new Date();
  showProgressBar:boolean = false
  dialogUtil: DialogUtil = new DialogUtil();
  absences: Absence[]=[];
  agent: Agent;
  agents:Agent[];
  uniteOrganisationnelle: UniteOrganisationnelle;
  compte: Compte;
  niveau: number;
  username: string;
  form: FormGroup;
  uniteSuperieureAgent: UniteOrganisationnelle;
  idUniteOrganisationnelleInferieures: number[] = [];
  uniteOrganisationnelleInferieures: UniteOrganisationnelle[] = [];
  uniteOrganisationnelles: UniteOrganisationnelle[] = [];
  uniteOrganisationnelleSuperieures: UniteOrganisationnelle[] = [];
  subject$: ReplaySubject<Absence[]> = new ReplaySubject<Absence[]>(
    1
  );
  selection = new SelectionModel<Absence>(true, []);
  data$: Observable<Absence[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<Absence> | null;
  etatAbsence: EtatAbsence = new EtatAbsence()

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
     visible: true, 
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
    { name: "Niveau", 
    property: "niveau",
     visible: false, 
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
  
    this.username = this.authService.getUsername();
    this.compteService.getByUsername(this.username).subscribe((response) => {
     this.compte = response.body;
     this.agent = this.compte.agent;
     this.uniteOrganisationnelle = this.agent.uniteOrganisationnelle;
     this.niveau = this.agent.uniteOrganisationnelle.niveauHierarchique.position;
   //  this.getUniteOrganisationnellesInferieures();
        this.getAllAbsenceByEtatTransmis()

 });
 this.dataSource = new MatTableDataSource();
 this.data$.pipe(filter((data) => !!data)).subscribe((absences) => {
   this.absences = absences;
   this.dataSource.data = absences;
   this.showProgressBar=true;
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
          //this.getAllAbsenceByUniteOrganisationnelles(this.idUniteOrganisationnelleInferieures);
        }, err => { },
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
          if(this.niveau === 1){
            this.absences= this.absences.filter(e=> ((e.etat==='TRANSMIS') && (e.niveau===0))) 
          }
          else{
            this.absences= this.absences.filter(e=> ((e.etat==='TRANSMIS') && (e.niveau===this.niveau))) 
          }
        
        }, err => {},
        () => {
          this.subject$.next(this.absences);
          //this.isPlanningDirectionValide();
          // this.dataSource = new MatTableDataSource();
          // this.data$.pipe(filter((data) => !!data)).subscribe((absences) => {
          //   this.absences = absences;
      
          //   this.dataSource.data = absences;
          // });
        });
  }

  getAllAbsenceByEtatTransmis() {   
        this.absenceService.getAll()
        .subscribe(
        (response) => {
          this.absences = response.body;
          if(this.niveau === 1){
            this.absences= this.absences.filter(e=> ((e.etat==='TRANSMIS') && (e.niveau===0))) 
          }
          else{
            this.absences= this.absences.filter(e=> ((e.etat==='TRANSMIS') && (e.niveau===this.niveau))) 
          }
        }, err => {
             this.showProgressBar=true;
        },
        () => {
          this.showProgressBar=true;
          this.subject$.next(this.absences);
        });
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
    this.dialog.open(AddValiderAbsenceComponent, {
      data: absence
    }).afterClosed().subscribe((absence: any) => {
    if (absence) {
       
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
  
  imputerAbsence(absence: Absence){
    this.dialog.open(ImputerAbsenceComponent , {
      data: absence
    }).afterClosed().subscribe((absence: any) => {
    if (absence) {
       
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
  validerAbsenceMany(absences: Absence[]) {
    absences.forEach(element => {
      this.updateAbsenceValider(element);

      this.absences.splice(
        this.absences.findIndex(
          (existingAbsence) => existingAbsence.id === element.id
        ),
        1
      );
      this.notificationService.success(NotificationUtil.validation)
      this.subject$.next(this.absences);
    })
    };


    updateAbsenceValider(absence:Absence) {
      let  etapeAbsence: EtapeAbsence;
        etapeAbsence = this.form.value;
      
        etapeAbsence.prenom = this.agent.prenom;
        etapeAbsence.nom =   this.agent.nom;
        etapeAbsence.matricule= this.agent.matricule;
        etapeAbsence.fonction= this.agent.fonction.nom;
        etapeAbsence.structure = this.agent.uniteOrganisationnelle.nom
        etapeAbsence.date = new Date
        absence.etat = this.etatAbsence.valider;
        etapeAbsence.structure = this.agent.uniteOrganisationnelle.description;
        
  
        // if(absence.niveau === 0){
        //   absence.niveau = this.absence.niveau;
        // }
        // else{
        //    absence.niveau = this.absence.niveau - 1;
        // }
     
        etapeAbsence.absence = absence;
        //  if (this.absence.niveau === 0) {
      //     absence.etat = this.etatAbsence.valider;
      //  }
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
               
               })
         }
        })
    }

    imputerAbsenceMany(absences: Absence[]) {
      absences.forEach(element => {
        this.updateAbsenceImputer(element);
        this.absences.splice(
          this.absences.findIndex(
            (existingAbsence) => existingAbsence.id === element.id
          ),
          1
        );
        this.notificationService.success(NotificationUtil.impute)
        this.subject$.next(this.absences);
      })
      };

    updateAbsenceImputer(absence:Absence) {
      let  etapeAbsence: EtapeAbsence;
      etapeAbsence = this.form.value;
      etapeAbsence.action = this.etatAbsence.transmettre;
      etapeAbsence.prenom = this.agent.prenom;
      etapeAbsence.nom =   this.agent.nom;
      etapeAbsence.matricule= this.agent.matricule;
      etapeAbsence.fonction= this.agent.fonction.nom;
      etapeAbsence.absence = absence;
      etapeAbsence.structure = this.agent.uniteOrganisationnelle.nom
      etapeAbsence.date = new Date
      etapeAbsence.absence.etat = this.etatAbsence.transmettre;
      etapeAbsence.structure = this.agent.uniteOrganisationnelle.description;


      if(absence.niveau === 0){
      absence.niveau = absence.niveau + 2
     //   this.absence.niveau = this.absence.niveau;
        absence.etat = this.etatAbsence.transmettre;
      }
      else{
        absence.niveau = absence.niveau + 1;
        absence.etat = this.etatAbsence.transmettre;
      }
  
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
         
             })
       }
      }
    )
  }

  rejeterAbsenceDCH(absence: Absence) {

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

  // getUniteOrganisationnelleSuperieure() {
  //   let uniteOrganisationnelleSuperieures: UniteOrganisationnelle[];
  //   if (this.uniteOrganisationnelle.niveauHierarchique.position === 1 || this.uniteOrganisationnelle.niveauHierarchique.position === 0) {

  //     this.uniteSuperieureAgent = this.uniteOrganisationnelle;
  //    // this.getPlanningDirection(this.uniteSuperieureAgent.code, this.dossierConge.id)
  //   } else {
  //     this.uniteOrganisationnelleService.getAllSuperieures(this.uniteOrganisationnelle.id)
  //       .subscribe(response => {
  //         uniteOrganisationnelleSuperieures = response.body;
  //         this.uniteSuperieureAgent = uniteOrganisationnelleSuperieures.find(e => e.niveauHierarchique.position === 1);

  //       }, err => { },
  //         () => {
  //         //  this.getPlanningDirection(this.uniteSuperieureAgent.code, this.dossierConge.id)

  //         })
  //   }
  // }

  validerDemandeAbsence(absence?: Absence, type?: string) {
    if(type === 'one'){
      this.dialogConfirmationService.confirmationDialog().subscribe(action =>{
        if (action === DialogUtil.confirmer){
          this.validerAbsence(absence);
        }
      })
    }
    else if(type === 'many'){
      let absence = this.selection.selected.find(el => (el.etat=== this.etatAbsence.transmettre))
      if(absence === undefined){
        this.notificationService.warn('Seule les demandes à l\'état Transmis peuvent être validées');
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

  imputerDemandeAbsence(absence?: Absence, type?: string) {
    if(type === 'one'){
      this.dialogConfirmationService.confirmationDialog().subscribe(action =>{
        if (action === DialogUtil.confirmer){
          this.imputerAbsence(absence);
        }
      })
    }
    else if(type === 'many'){
      let absence = this.selection.selected.find(el => (el.etat=== this.etatAbsence.transmettre))
      if(absence === undefined){
        this.notificationService.warn('Seule les demandes à l\'état Transmis peuvent être imputées');
        return;
      }

      this.dialogConfirmationService.confirmationDialog().subscribe(action =>{
        if (action === DialogUtil.confirmer){
      
          this.imputerAbsenceMany(this.selection.selected);
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
