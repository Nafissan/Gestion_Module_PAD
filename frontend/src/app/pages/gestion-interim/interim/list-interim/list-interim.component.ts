import { Component, OnInit, ViewChild, Input, OnDestroy, AfterViewInit } from "@angular/core";

import { ReplaySubject, Observable } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ListColumn } from "../../../../../@fury/shared/list/list-column.model";
import { filter } from "rxjs/operators";
import { fadeInRightAnimation } from "../../../../../@fury/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "../../../../../@fury/animations/fade-in-up.animation";
import { MatDialog } from "@angular/material/dialog";
import { Interim } from '../../shared/model/interim.model';
import { InterimService } from '../../shared/services/interim.service';
import { AddInterimComponent } from "../add-interim/add-interim.component";
import { DetailsInterimComponent } from "../../interim/details-interim/details-interim.component";
import { Routes, Router } from '@angular/router';
import { ValidationInterimComponent } from "../validation-interim/validation-interim.component";
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
import { RejetInterimComponent } from "../rejet-interim/rejet-interim.component";
import { saveAs as importedSaveAs } from "file-saver";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HistoriqueInterimComponent } from "../historique-interim/historique-interim.component";
import { UniteOrganisationnelleService } from "../../../gestion-unite-organisationnelle/shared/services/unite-organisationnelle.service";
@Component({
  selector: 'fury-list-interim',
  templateUrl: './list-interim.component.html',
  styleUrls: ['./list-interim.component.scss',"../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class ListInterimComponent implements OnInit, AfterViewInit,OnDestroy {
  showProgressBar: boolean = false;
  interims: Interim[]=[];
  agent: Agent;
  agents: Agent[];
  username: string;
  compte: Compte;
  niveau: number;
  uniteSuperieureAgent: UniteOrganisationnelle;
  idUniteOrganisationnelleInferieures: number[] = [];
  uniteOrganisationnelleInferieures: UniteOrganisationnelle[] = [];
  uniteOrganisationnelleSuperieures: UniteOrganisationnelle[] = [];
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
    // { name: "Niveau", 
    // property: "etape_validation",
    //  visible: false, 
    //  isModelProperty: true,
    // },
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
    private uniteOrganisationnelleService: UniteOrganisationnelleService,
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
      // this.getInterimByUORG();
      this.getUniteOrganisationnellesInferieures();
      this.getUniteOrganisationnelleSuperieure();
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
        if(interim.niveau === 1){
          interim.etat = this.etatInterim.valider
        }
        else{
          interim.etat = etat;
        }

    interim.niveau = interim.niveau -1;

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

  updateInterimWithEtatTransmettre(interim: Interim, etat) {
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

    this.updateInterimWithEtatTransmettre(
      interim,
      this.etatInterim.transmettre
    );
      // }})
  }

  enCoursInterim(interim: Interim) {
    interim.niveau = this.niveau;
   
    this.updateInterimWithEtat(
      interim,
      this.etatInterim.enCours
    );

  }


  
  

  // getInterimByUORG() {
  //   this.interimService.getInterimByUnORG(this.uniteOrganisationnelle.id).subscribe(
  //     (response) => {
  //       this.interims = response.body;
  //     },
  //     (err) => {
  //     },
  //     () => {
  //       this.subject$.next(this.interims);
  //       this.showProgressBar = true;

  //     }
  //   );
  // }

  getInterimByUnitesInf() {
    
    
    // getInterimByUnORG(this.uniteOrganisationnelle.id).subscribe(
    //   (response) => {
    //     this.interims = response.body;
    //   },
    //   (err) => {
    //   },
    //   () => {
    //     this.subject$.next(this.interims);
    //     this.showProgressBar = true;

    //   }
    // );


  }
  getUniteOrganisationnellesInferieures() {
    if (this.uniteOrganisationnelle.niveauHierarchique.position === 0) {
      this.idUniteOrganisationnelleInferieures.unshift(this.uniteOrganisationnelle.id);
      this.getAllInterimsByUniteOrganisationnelles(this.idUniteOrganisationnelleInferieures);
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
            this.getAllInterimsByUniteOrganisationnelles(this.idUniteOrganisationnelleInferieures);
          });
    }

  }

  getAllInterimsByUniteOrganisationnelles(
    idUniteOrganisationnelles: number[]) {   
        this.interimService.getAllByInterimsUniteOrganisationnelles(idUniteOrganisationnelles)
        .subscribe(
        (response) => {
          this.interims = response.body;
          console.log("interims :" + response)
          // if(this.uniteOrganisationnelle.niveauHierarchique.position===1){
          //   this.interims= this.interims.filter(n=> (n.niveau===this.uniteOrganisationnelle.niveauHierarchique.position));
          // }
          // else{
            // this.interims= this.interims
            
          // }
        }, err => {},
        () => {
          this.subject$.next(this.interims);
          this.showProgressBar = true;
      
        });
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

  getNomStructure(etape: number,statut:string): string{
 

  
    if(statut === 'En Cours'){

      let uniteOrganisationnelle = this.uniteOrganisationnelleSuperieures.find(e=> (e.niveauHierarchique.position === etape))

          return  uniteOrganisationnelle.description;
     }

    else if(etape === 1 && statut === 'TRANSMIS'){
          return "Direction Capital Humain"; 
     }
     else if(etape === 2 && statut === 'TRANSMIS'){
       return "Division Administration du Personnel"; 
    }
    else if(etape === 3 && statut === 'TRANSMIS'){
        return "Service Administration du Personnel"; 
    }
  else{
let uniteOrganisationnelle =  this.uniteOrganisationnelle;

   return this.uniteOrganisationnelle.description; 
    }

}

getUniteOrganisationnelleSuperieure() {
  let uniteOrganisationnelleSuperieures: UniteOrganisationnelle[];
  if (this.uniteOrganisationnelle.niveauHierarchique.position === 1 || this.uniteOrganisationnelle.niveauHierarchique.position === 0) {
    this.uniteSuperieureAgent = this.uniteOrganisationnelle;
  
  } else {
    this.uniteOrganisationnelleService.getAllSuperieures(this.uniteOrganisationnelle.id)
      .subscribe(response => {
        uniteOrganisationnelleSuperieures = response.body;
        this.uniteOrganisationnelleSuperieures = uniteOrganisationnelleSuperieures;
        this.uniteSuperieureAgent = uniteOrganisationnelleSuperieures.find(e => e.niveauHierarchique.position === 1);
      }, err => { },
        () => {  });
  }
}
  ngOnDestroy() { }

}