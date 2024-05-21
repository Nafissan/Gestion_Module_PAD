import { Component, OnInit, ViewChild, Input } from "@angular/core";

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
import { DialogUtil } from "../../../../shared/util/util";
import { DialogConfirmationService } from "../../../../shared/services/dialog-confirmation.service";import { AddEtapeInterimComponent } from "../../etape-interim/add-etape-interim/add-etape-interim.component";
import { DetailsEtapeInterimComponent } from "../../etape-interim/details-etape-interim/details-etape-interim.component";
import { ActivatedRoute, Router } from "@angular/router";
import { ListInterimComponent } from '../../interim/list-interim/list-interim.component';
@Component({
  selector: 'fury-list-suivi-interim',
  templateUrl: './list-suivi-interim.component.html',
  styleUrls: ['./list-suivi-interim.component.scss',"../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
 // ListInterimComponent: [''],
})
export class ListSuiviInterimComponent implements OnInit {
  date: Date = new Date();
  showProgressBar: boolean = false;
  etapeInterims: EtapeInterim[]=[];
  idInterim: any;
  subject$: ReplaySubject<EtapeInterim[]> = new ReplaySubject<EtapeInterim[]>(
    1
  );
  data$: Observable<EtapeInterim[]> = this.subject$.asObservable();
  pageSize = 10;
  dataSource: MatTableDataSource<EtapeInterim> | null;
  dialogUtil: DialogUtil = new DialogUtil();
  gest:any
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input()
  columns: ListColumn[] = [
    { name: "Checkbox", property: "checkbox", visible: false },
    { name: "Id", property: "id", visible: true, isModelProperty: true },
    {
      name: "Date",
      property: "date",
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
      name: "Nom",
      property: "nom",
      visible: false,
      isModelProperty: true,
    },
    {
      name: "Prenom",
      property: "prenom",
      visible: false,
      isModelProperty: true,
    },
    {
      name: "Matricule",
      property: "matricule",
      visible: false,
      isModelProperty: true,
    },
    {
      name: "Structure",
      property: "structure",
      visible: false,
      isModelProperty: true,
    },
    {
      name: "Etat",
      property: "action",
      visible: true,
      isModelProperty: true,
    },
    { name: "Actions", property: "actions", visible: true },
  ] as ListColumn[];
  constructor(private route: ActivatedRoute,
    private etapeInterimService: EtapeInterimService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,private router:Router) {
        
    }

  ngOnInit() {
   // this.getEtapeInterims();

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter((data) => !!data)).subscribe((etapeInterims) => {
      this.etapeInterims = etapeInterims;
      this.dataSource.data = etapeInterims;
    });
     //Recupère contenant l'id du PlanningDirectione selectionnéee
     this.route.paramMap.subscribe((params) => {
      this.idInterim = parseInt(params.get("id"));
      console.log("idInterim : ", this.idInterim);
      this.getEtapeInterimByiNTERIM()
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getEtapeInterims() {
    this.etapeInterimService.getAll().subscribe(
      (response) => {
        this.etapeInterims = response.body;
        console.log("Response etape interim :", response);
      },
      (err) => {
        this.showProgressBar = true;
      },
      () => {
        this.subject$.next(this.etapeInterims);        
        this.showProgressBar = true;
      }
    );
  }

  getEtapeInterimByiNTERIM() {
    this.etapeInterimService.getEtapeInterimsByInterim(this.idInterim).subscribe(
      (response) => {
        this.etapeInterims = response.body;
        console.log("Response etape interim :", response);
      },
      (err) => {
        this.showProgressBar = true;
      },
      () => {
        this.subject$.next(this.etapeInterims);
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

  ngOnDestroy() {}
  createEtapeInterim() {
    this.dialog.open(AddEtapeInterimComponent).afterClosed().subscribe((etapeInterim: any) => {
      /**
       * Dossier congé is the updated dossierConge (if the user pressed Save - otherwise it's null)
       */ if (etapeInterim) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.etapeInterims.unshift(new EtapeInterim(etapeInterim));
        this.subject$.next(this.etapeInterims);
      }
    });
  }
  updateEtapeInterim(etapeInterim: EtapeInterim) {
    this.dialog.open(AddEtapeInterimComponent, {
      data: etapeInterim
    }).afterClosed().subscribe((etapeInterim) => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (etapeInterim) {
        console.log('shf : ',etapeInterim);
        
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        const index = this.etapeInterims.findIndex((existingEtapeInterim) => existingEtapeInterim.id === existingEtapeInterim.id);
        this.etapeInterims[index] = new EtapeInterim(etapeInterim);
        this.subject$.next(this.etapeInterims);
      }
    });
  }
  deleteEtapeInterim(etapeInterim: EtapeInterim) { 
    this.dialogConfirmationService.confirmationDialog().subscribe(action =>{
      if (action === DialogUtil.confirmer){
    this.etapeInterimService.delete(etapeInterim).subscribe((response) => {
    console.log("etape interim deleted: ", response);
    
    this.etapeInterims.splice(
      this.etapeInterims.findIndex(
        (existingEtapeInterim) => existingEtapeInterim.id === existingEtapeInterim.id
      ),1
    );
    this.subject$.next(this.etapeInterims);
   
  });
}
})
}

closeEtapeInterim(etapeInterim: EtapeInterim){

  etapeInterim.etat = 'CLOSE';
  etapeInterim.action = 'CLOSE'
  this.etapeInterimService.update(etapeInterim).subscribe((response) => {
    console.log("etape interim close: ", response);
    
    // this.etapeInterims.splice(
    //   this.etapeInterims.findIndex(
    //     (existingEtapeInterim) => existingEtapeInterim.id === existingEtapeInterim.id
    //   ),1
    // );
    if (etapeInterim) {
    const index = this.etapeInterims.findIndex((existingInterim) => existingInterim.id === existingInterim.id);
    this.etapeInterims[index] = new EtapeInterim(etapeInterim);
    this.subject$.next(this.etapeInterims);
    }
  });
}

detailsEtapeInterim(etapeInterim: EtapeInterim){
  this.dialog.open(DetailsEtapeInterimComponent, {
    data: etapeInterim
  }).afterClosed().subscribe((etapeInterim) => {
    /**
     * Customer is the updated customer (if the user pressed Save - otherwise it's null)
     */
    if (etapeInterim) {
      console.log('shf : ',etapeInterim);
      
      /**
       * Here we are updating our local array.
       * You would probably make an HTTP request here.
       */
      const index = this.etapeInterims.findIndex((existingInterim) => existingInterim.id === etapeInterim.id);
      this.etapeInterims[index] = new EtapeInterim(etapeInterim);
      this.subject$.next(this.etapeInterims);
    }
  });
}
 retour() {
  this.router.navigate(['/gestion-interim/interim']);
 }


}