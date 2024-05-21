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
  selector: 'fury-list-membre',
  templateUrl: './list-membre.component.html',
  styleUrls: ['./list-membre.component.scss', '../../../../shared/util/bootstrap4.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ListMembreComponent implements OnInit, AfterViewInit, OnDestroy {
  showProgressBar: boolean = false;
  date: Date = new Date();
  membre: Membre;
  idMembre: number;
  agentsChefStructure: Agent[] = [];
  agentsChefStructureMail: string[] = [];
  currentMembre: Membre = undefined;
  membres: Membre[] = [];
  agents: Agent[] = [];
  subject$: ReplaySubject<Agent[]> = new ReplaySubject<Agent[]>(
    1
  );
  subjects$: ReplaySubject<Membre[]> = new ReplaySubject<Membre[]>(
    1
  );
  datas$: Observable<Membre[]> = this.subjects$.asObservable();
  // pagesSize = 5;
  // datasource: MatTableDataSource<Agent> | null;
  data$: Observable<Agent[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<Agent> | null;
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
    private agentService: AgentService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private notificationService: NotificationService,
    private snackbar: MatSnackBar,
    private route:ActivatedRoute
    

  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    
    this.getAgentAssure();
    // this.route.paramMap.subscribe((params) => {
    //   this.idMembre = parseInt(params.get("id"));
    //   this.membreService.getById(this.idMembre).subscribe((mem)=>{this.membre=mem.body;console.log(this.membre)});

    // });
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


  getAgentAssure() {
    this.agentService.getAgentsAssures().subscribe(

      (response) => {

        this.agents = response.body;
      },
      (err) => {
      },
      () => {
        console.log(this.agents);
        this.dataSource.data = this.agents;
        this.showProgressBar = true;
        this.data$.pipe(filter((data) => !!data)).subscribe((agents) => {
          // this.agents = agents;
         
        });

        this.subject$.next(this.agents);

      });
  }

  createMembre() {
    this.dialog
      .open(AddOrUpdateMembreComponent)
      .afterClosed()
      .subscribe((membre: any) => {
        if (membre) {

          this.membres.unshift(new Membre(membre));
          this.subject$.next(this.agents);
        }
      });
  }
  updateMembre(membre: Membre) {
    this.dialog
      .open(AddOrUpdateMembreComponent, {
        data: membre,
      })
      .afterClosed()
      .subscribe((membre) => {
       
        if (membre) {
      
          const index = this.membres.findIndex(
            (existingMembre) =>
            existingMembre.id === membre.id
          );
          this.membres[index] = new Membre(membre);
          this.subject$.next(this.agents);
        }
      });
  }
  detailsMembre(agent: Agent) {
    this.dialog
      .open(DetailsMembreComponent, {
        data: agent,
      })
      .afterClosed()
      .subscribe((agent) => {

        if (agent) {

          const index = this.agents.findIndex(
            (existingMembre) =>
              existingMembre.id === agent.id
          );
          this.agents[index] = new Agent(agent);
          this.subject$.next(this.agents);
        }
      });
  }
  
  deleteMembre(membre: Membre) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.membreService.delete(membre).subscribe((response) => {
          this.membres.splice(
            this.membres.findIndex(
              (existingMembre) => existingMembre.id === membre.id
            ), 1);
          this.subjects$.next(this.membres);
          this.notificationService.success(NotificationUtil.suppression);
        }, err => {
          this.notificationService.warn(NotificationUtil.echec);
        }, () => { })
      }
    })
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


