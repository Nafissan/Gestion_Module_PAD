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
import { Membre } from "../../shared/model/membre.model";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MembreService } from "../../shared/service/membre.service";
import { AddOrUpdateMembreComponent } from "../add-or-update-membre/add-or-update-membre.component";
import { DetailsMembreComponent } from "../details-membre/details-membre.component";
import { JoindrePhotoComponent } from "../joindre-photo/joindre-photo.component";
import { AgentService } from "src/app/shared/services/agent.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'fury-voir-membre',
  templateUrl: './voir-membre.component.html',
  styleUrls: ['./voir-membre.component.scss', '../../../../shared/util/bootstrap4.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class VoirMembreComponent implements OnInit, AfterViewInit, OnDestroy {
  showProgressBar: boolean = false;
  date: Date = new Date();
  membre: Membre;
  idMembre: number;
  membresChefStructure:Membre[] = [];
  membresChefStructureMail: string[] = [];
  currentMembre: Membre = undefined;
  membres: Membre[] = [];
  agents: Agent[] = [];
  subject$: ReplaySubject<Membre[]> = new ReplaySubject<Membre[]>(
    1
  );
data$: Observable<Membre[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<Membre> | null;
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
    { name: "Code ", property: "code", visible: false, isModelProperty: true },
    { name: "Nom",property: "nom",visible: true, isModelProperty: true},
    { name: "Prenom",property: "prenom",visible: true, isModelProperty: true},
    { name: "Matricule",property: "matricule",visible: true, isModelProperty: true},
    { name: "Active", property: "active", visible: false, isModelProperty: true },
    { name: "Actions", property: "actions", visible: true },
     
   ] as ListColumn[];
  constructor(
    private membreService: MembreService,

    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private notificationService: NotificationService,
    private snackbar: MatSnackBar,
    private route:ActivatedRoute
    

  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    
    this.getMembre();
    this.route.paramMap.subscribe((params) => {
      this.idMembre = parseInt(params.get("id"));
      this.membreService.getById(this.idMembre).subscribe((mem)=>{this.membre=mem.body;console.log(this.membre)});

    });
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


  getMembre() {
    this.membreService.getMembreByAgent(this.idMembre).subscribe(

      (response) => {

        this.membres = response.body;
      },
      (err) => {
      },
      () => {
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = this.membres;
        this.subject$.next(this.membres);
        this.showProgressBar = true;
      });
  }

  

 
  
 
  joindrePhoto(membre: Membre){
    this.dialog
    .open(JoindrePhotoComponent,{
      data: membre,
    })
    .afterClosed()
    .subscribe((fileMetaData) => {
     if(fileMetaData){
      membre.fileMetaData = fileMetaData;
     }
      
    });

}
voirPhoto(membre: Membre){


}
download(membre: Membre){
  this.membreService.download(membre).subscribe((response) => {
    let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });   
    const url = window.URL.createObjectURL(blob);
    // importedSaveAs(blob, membre. fileMetaData.fileName);
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



