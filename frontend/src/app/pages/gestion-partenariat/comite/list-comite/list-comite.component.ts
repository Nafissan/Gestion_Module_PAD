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
import { DialogConfirmationService } from "../../../../shared/services/dialog-confirmation.service";
import { DialogUtil, NotificationUtil } from "../../../../shared/util/util";
import { AuthenticationService } from "../../../../shared/services/authentification.service";
import { NotificationService } from "../../../../shared/services/notification.service";
import { Agent } from "src/app/shared/model/agent.model";
import { Comite } from "../../shared/model/comite.model";
import { ComiteService } from "../../shared/service/comite.service";
import { AddOrUpdateComiteComponent } from "../add-or-update-comite/add-or-update-comite.component";
import { DetailsComiteComponent } from "../details-comite/details-comite.component";
import { JoindrePvComponent } from "../joindre-pv/joindre-pv.component";
import { saveAs as importedSaveAs } from "file-saver";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'fury-list-comite',
  templateUrl: './list-comite.component.html',
  styleUrls: ['./list-comite.component.scss', '../../../../shared/util/bootstrap4.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ListComiteComponent implements OnInit, AfterViewInit, OnDestroy {
  showProgressBar: boolean = false;
  date: Date = new Date();
  // currentYear: number = new Date().getFullYear();
  agentsChefStructure: Agent[] = [];
  agentsChefStructureMail: string[] = [];
  currentComite: Comite = undefined;
  comites: Comite[] = [];
  subject$: ReplaySubject<Comite[]> = new ReplaySubject<Comite[]>(
    1
  );
  data$: Observable<Comite[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<Comite> | null;


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
    { name: "Code ", property: "code", visible: true, isModelProperty: true },
    { name: "Libelle",property: "libelle",visible: true, isModelProperty: true},
    { name: "Active", property: "active", visible: true, isModelProperty: true },
    { name: "Actions", property: "actions", visible: true },
     
   

  ] as ListColumn[];
  constructor(
    private comiteService: ComiteService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private notificationService: NotificationService,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getComites();
    this.dataSource = new MatTableDataSource();
  }
  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
    this.dataSource.filterPredicate = (data: any, value) => { const dataStr = JSON.stringify(data).toLowerCase(); return dataStr.indexOf(value) != -1; }
  }

  getComites() {
    this.comiteService.getAll().subscribe(
      (response) => {
        this.comites = response.body;
      },
      (err) => {
      },
      () => {
        this.showProgressBar = true;
        this.data$.pipe(filter((data) => !!data)).subscribe((comites) => {
          this.comites = comites;
          this.dataSource.data = comites;
        });

        this.subject$.next(this.comites);

      });
  }

  createComite() {
    this.dialog
      .open(AddOrUpdateComiteComponent)
      .afterClosed()
      .subscribe((comite: any) => {
        if (comite) {

          this.comites.unshift(new Comite(comite));
          this.subject$.next(this.comites);
        }
      });
  }
  updateComite(comite: Comite) {
    this.dialog
      .open(AddOrUpdateComiteComponent, {
        data: comite,
      })
      .afterClosed()
      .subscribe((comite) => {
       
        if (comite) {
      
          const index = this.comites.findIndex(
            (existingComite) =>
            existingComite.id === comite.id
          );
          this.comites[index] = new Comite(comite);
          this.subject$.next(this.comites);
        }
      });
  }
  detailsComite(comite: Comite) {
    this.dialog
      .open(DetailsComiteComponent, {
        data: comite,
      })
      .afterClosed()
      .subscribe((comite) => {

        if (comite) {

          const index = this.comites.findIndex(
            (existingComite) =>
              existingComite.id === comite.id
          );
          this.comites[index] = new Comite(comite);
          this.subject$.next(this.comites);
        }
      });
  }
  
  deleteComite(comite: Comite) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.comiteService.delete(comite).subscribe((response) => {
          this.comites.splice(
            this.comites.findIndex(
              (existingComite) => existingComite.id === comite.id
            ), 1);
          this.subject$.next(this.comites);
          this.notificationService.success(NotificationUtil.suppression);
        }, err => {
          this.notificationService.warn(NotificationUtil.echec);
        }, () => { })
      }
    })
  }
  joindrePV(comite: Comite){
    this.dialog
    .open(JoindrePvComponent,{
      data: comite,
    })
    .afterClosed()
    .subscribe((fileMetaData) => {
     if(fileMetaData){
      comite.fileMetaData = fileMetaData;
     }
      
    });

}
download(comite: Comite){
  this.comiteService.download(comite).subscribe((response) => {
    let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });   
    const url = window.URL.createObjectURL(blob);
    importedSaveAs(blob, comite. fileMetaData.fileName);
    this.snackbar.open('Téléchargement réussie!', null, {
      duration: 5000
    });

  });
   
}
  ngOnDestroy() { }

  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }
}

