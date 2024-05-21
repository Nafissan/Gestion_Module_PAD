import { Component, OnInit, ViewChild, Input, AfterViewInit, OnDestroy } from "@angular/core";
import { DemandeAttestationService } from "../../shared/services/demande-attestation.service";
import { ReplaySubject, Observable } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ListColumn } from "../../../../../@fury/shared/list/list-column.model";
import { filter } from "rxjs/operators";
import { Agent } from "../../../../shared/model/agent.model";
import { fadeInRightAnimation } from "../../../../../@fury/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "../../../../../@fury/animations/fade-in-up.animation";
import { MatDialog } from "@angular/material/dialog";
import { AddAttestationComponent } from "../add-attestation/add-attestation.component";
import { RejeterAttestationComponent } from "../rejeter-attestation/rejeter-attestation.component";
import { ValiderAttestationComponent } from "../valider-attestation/valider-attestation.component";
import { Attestation } from "../../shared/model/demande-attestation.model";
import { EtatAttestation } from "../../shared/util/etat";
import { DetailDemandeAttestationComponent } from "../detail-demande-attestation/detail-demande-attestation.component";
import { DialogConfirmationService } from "../../../../shared/services/dialog-confirmation.service";
import { DialogUtil, NotificationUtil } from "../../../../shared/util/util";
import { UniteOrganisationnelle } from "../../../../shared/model/unite-organisationelle";
import { Compte } from "../../../gestion-utilisateurs/shared/model/compte.model";
import { AuthenticationService } from "../../../../shared/services/authentification.service";
import { CompteService } from "../../../gestion-utilisateurs/shared/services/compte.service";
import { AgentService } from "../../../../shared/services/agent.service";
import { SelectionModel } from "@angular/cdk/collections";
import { NotificationService } from "../../../../shared/services/notification.service";
import { DownloadAttestationComponent } from "../../suivi-attestation/download-attestation/download-attestation.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { saveAs as importedSaveAs } from "file-saver";
@Component({
  selector: 'fury-list-attestation',
  templateUrl: './list-attestation.component.html',
  styleUrls: ["./list-attestation.component.scss","../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class ListAttestationComponent implements OnInit, AfterViewInit, OnDestroy  {
  showProgressBar: boolean = false;

  username: string;
  compte: Compte;
  agent: Agent;
  uniteOrganisationnelle: UniteOrganisationnelle;
  dialogUtil: DialogUtil = new DialogUtil();
  demandeAttestations: Attestation[] = [];
  currentAttestation: Attestation = undefined;
  subject$: ReplaySubject<Attestation[]> = new ReplaySubject<Attestation[]>(1);
  data$: Observable<Attestation[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<Attestation> | null;
  etatAttestation: EtatAttestation = new EtatAttestation();
  selection = new SelectionModel<Attestation>(true, []);
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
    {
      name: "Date de saisie",
      property: "dateSaisie",
      visible: true,
      isModelProperty: true,
    },
    // { name: "Année ", property: "annee", visible: true, isModelProperty: true },
   
    // {
    //   name: "Telephone",
    //   property: "telephone",
    //   visible: true,
    //   isModelProperty: true,
    // },
    {
      name: "Date Naissance",
      property: "dateNaissance",
      visible: false,
      isModelProperty: true,
    },
    {
      name: "Commentaire",
      property: "commentaire",
      visible: true,
      isModelProperty: true,
    },
    { name: "Etat", property: "etat", visible: true, isModelProperty: true },
    { name: "Actions", property: "actions", visible: true },
  ] as ListColumn[];
  constructor(
    private authentificationService: AuthenticationService,
    private compteService: CompteService,
    private notificationService: NotificationService,
    private dialogConfirmationService: DialogConfirmationService,
    private demandeAttestationService: DemandeAttestationService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    
  ) {}

  ngOnInit() {
    // this.getDemandesAttestations();

    this.dataSource = new MatTableDataSource();

    this.data$
      .pipe(filter((data) => !!data))
      .subscribe((demandeAttestations) => {
        this.demandeAttestations = demandeAttestations;
        this.dataSource.data = demandeAttestations;
      });
      this.username = this.authentificationService.getUsername();
      this.compteService.getByUsername(this.username).subscribe((response) => {
        this.compte = response.body;
        this.agent = this.compte.agent;
        this.uniteOrganisationnelle = this.agent.uniteOrganisationnelle;
        this.getAttestationByUORG();
      });
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  getDemandesAttestations() {
    this.demandeAttestationService.getAll().subscribe(
      (response) => {
        this.demandeAttestations = response.body;
      },
      (err) => {
      },
      () => {
        this.subject$.next(this.demandeAttestations);
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

  ngOnDestroy() {}
  createDemandeAttestation() {
    this.dialog
      .open(AddAttestationComponent)
      .afterClosed()
      .subscribe((demandeAttestation: any) => {
        /**
         * Dossier congé is the updated dossierConge (if the user pressed Save - otherwise it's null)
         */ if (demandeAttestation) {
          /**
           * Here we are updating our local array.
           */
          this.demandeAttestations.unshift(new Attestation(demandeAttestation));
          this.subject$.next(this.demandeAttestations);
        }
      });
  }
  updateDemandeAttestation(demandeAttestation: Attestation) {
    this.dialog
      .open(AddAttestationComponent, {
        data: demandeAttestation,
      })
      .afterClosed()
      .subscribe((demandeAttestation) => {
        /**
         * Customer is the updated customer (if the user pressed Save - otherwise it's null)
         */
        if (demandeAttestation) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
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
    this.dialogConfirmationService.confirmationDialog().subscribe(action =>{
      if (action === DialogUtil.confirmer){
    this.demandeAttestationService
      .delete(demandeAttestation)
      .subscribe((response) => {
        this.notificationService.success(NotificationUtil.suppression);
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
getAttestationByUORG() {
  this.demandeAttestationService.getAttestationByUnORG(this.uniteOrganisationnelle.id).subscribe(
    (response) => {
      this.demandeAttestations = response.body;
    },
    (err) => {
    },
    () => {
      this.subject$.next(this.demandeAttestations);
      this.showProgressBar = true;

    }
  );
}
getAttestationsByAgent() {
  this.demandeAttestationService.getAttestationByUnORG(this.agent.id).subscribe(
    (response) => {
      this.demandeAttestations = response.body;
    },
    (err) => {
    },
    () => {
      this.subject$.next(this.demandeAttestations);
    }
  );
}
  validerDemandeAttestation(demandeAttestation: Attestation) {
    this.dialog
      .open(ValiderAttestationComponent, {
        data: demandeAttestation,
      })
      .afterClosed()
      .subscribe((demandeAttestation) => {
        if (demandeAttestation) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.demandeAttestations.findIndex(
            (existingDemandeAttestation) =>
              existingDemandeAttestation.id === demandeAttestation.id
          );
          this.demandeAttestations[index] = new Attestation(demandeAttestation);
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
  updateAttestationMany(attestations: Attestation[], etat: string) {
    attestations.forEach(el => el.etat = etat)
    this.demandeAttestationService.updateMany(attestations).subscribe((response) => {
    });
  }

  detailsDemandeAttestation(detailAtttestation: Attestation) {
    this.dialog
      .open(DetailDemandeAttestationComponent, {
        data: detailAtttestation,
      })
      .afterClosed()
      .subscribe((detailAtttestation) => {
        /**
         * DossierConge is the updated dossierConge (if the user pressed Save - otherwise it's null)
         */
        if (detailAtttestation) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.demandeAttestations.findIndex(
            (existingDossierConge) =>
              existingDossierConge.id === detailAtttestation.id
          );
          this.demandeAttestations[index] = new Attestation(detailAtttestation);
          this.subject$.next(this.demandeAttestations);
        }
      });
  }
  transmettreDemandeAttestation(demandeAttestation?: Attestation, type?: string) {
    if(type === 'one'){
      this.dialogConfirmationService.confirmationDialog().subscribe(action =>{
        if (action === DialogUtil.confirmer){
          this.updateAttestation(demandeAttestation, EtatAttestation.transmettre);
          this.notificationService.success(NotificationUtil.transmis)     
        }
      })
    }
    else if(type === 'many'){
      let attestation = this.selection.selected.find(el => (el.etat !== EtatAttestation.saisir && el.etat !== EtatAttestation.rejeter))
      if(attestation !== undefined){
        this.notificationService.warn('Seule les demandes a l\'état saisi ou rejeté peuvent être transmises');
        return;
      }

      // let attestationTransmis = this.selection.selected.find(el => (el.etat === EtatAttestation.transmettre))
      // if(attestationTransmis !== undefined){
      //   this.notificationService.warn('la demande est deja transmise');
      //   return
      // }
      
      this.dialogConfirmationService.confirmationDialog().subscribe(action =>{
        if (action === DialogUtil.confirmer){
           this.updateAttestationMany(this.selection.selected, EtatAttestation.transmettre);
        }
      })
    }
    // else if( type === 'many'){
    //   let attestation = this.selection.selected.find(el => el.etat === EtatAttestation.transmettre)
    //   if(attestation !== undefined){
    //     this.notificationService.warn('la demande est deja transmise');
    //     return;
    //   }
    // }
    
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


  rejeterDemandeAttestation(demandeAttestation: Attestation) {
    this.dialog
      .open(RejeterAttestationComponent, {
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
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }


  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  // onFilterChange(value) {
  //   if (!this.dataSource) {
  //     return;
  //   }
  //   value = value.trim();
  //   value = value.toLowerCase();
  //   this.dataSource.filter = value;
  // }

  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }
  checkboxLabel(row?: Attestation): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}
