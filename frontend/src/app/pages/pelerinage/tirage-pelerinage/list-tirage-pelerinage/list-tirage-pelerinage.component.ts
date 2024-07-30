import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TirageAgent } from '../../shared/model/tirage-pelerinage.model';
import { DossierPelerinage } from '../../shared/model/dossier-pelerinage.model';
import { TirageService } from '../../shared/services/tirage-pelerinage.service';
import { DetailsTiragePelerinageComponent } from '../details-tirage-pelerinage/details-tirage-pelerinage.component';
import { filter } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReplaySubject, Observable } from 'rxjs';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DossierPelerinageService } from '../../shared/services/dossier-pelerinage.service';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { Compte } from 'src/app/pages/gestion-utilisateurs/shared/model/compte.model';
import { CompteService } from 'src/app/pages/gestion-utilisateurs/shared/services/compte.service';
import { Agent } from 'src/app/shared/model/agent.model';

@Component({
  selector: 'fury-list-tirage-pelerinage',
  templateUrl: './list-tirage-pelerinage.component.html',
  styleUrls: ['./list-tirage-pelerinage.component.scss', "../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation]

})
export class ListTiragePelerinageComponent implements OnInit {
  showProgressBar: boolean = false;
  agentSelected: TirageAgent;
  agents: TirageAgent[] = [];
  subject$: ReplaySubject<TirageAgent[]> = new ReplaySubject<TirageAgent[]>(1);
  data$: Observable<TirageAgent[]> = this.subject$.asObservable();
  pageSize = 4;
  openOrSaisiDossier:DossierPelerinage;
  dataSource: MatTableDataSource<TirageAgent> | null;
  selection = new SelectionModel<TirageAgent>(true, []);
  dossierPelerinage:DossierPelerinage;
  private paginator: MatPaginator;
  private sort: MatSort;
  username: string;
  agent: Agent;
  compte: Compte;
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }
  
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  
  setDataSourceAttributes() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  
  @Input()
  columns: ListColumn[] = [
    { name: "Checkbox", property: "checkbox", visible: false },
    { name: "Code Dossier", property: "dossierPelerinage", visible: true, isModelProperty: true },
    { name: "Ajoute par", property: "ajoutePar", visible: true },
    { name: "Agent", property: "agent", visible: true },

  ] as ListColumn[];

  constructor(private tirageService: TirageService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private dossierPelerinageService:DossierPelerinageService,
    private authService: AuthenticationService,
    private compteService: CompteService,
  ) { }

  ngOnInit() {
    this.getDossierPelerinage();
    this.fetchAgent();
    this.username = this.authService.getUsername();

    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
    });

    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((agent) => {
      this.agents = agent;
      this.dataSource.data = agent;
    });
  }
  
  ngAfterViewInit() { }
  
  get visibleColumns() {
    return this.columns.filter((column) => column.visible).map((column) => column.property);
  }
  
  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim().toLowerCase();
    this.dataSource.filter = value;
    this.dataSource.filterPredicate = (data: any, value) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(value) != -1;
    }
  }
  
  fetchAgent() {
    this.tirageService.getAgentsByDossierEtat().subscribe(response => {
      this.agents = response.body as TirageAgent[];
      console.log('Agents:', this.agents);

    }, err => {
      console.error('Error loading substitut:', err);
    }, () => {
      this.subject$.next(this.agents);
      this.showProgressBar = true;
    });
  }
  
  refreshListe() { this.fetchAgent(); }
  
  getDossierPelerinage() {
    this.dossierPelerinageService.getDossier().subscribe(
      (response) => {
          this.dossierPelerinage = response.body as DossierPelerinage;
          console.log('Dossier substitut:', this.dossierPelerinage);
      },
      (err) => {
        console.error('Error loading dossier substitut:', err);
      }
    );
  }
  
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }
  
  checkboxLabel(row?: TirageAgent): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  
  
  generateAgent() {
    this.tirageService.assignedAgent(this.agent).subscribe(
      (response) => {

        this.notificationService.success('Tirage agents reussi');
        this.refreshListe();
      },
      (error) => {
        this.notificationService.warn("Erreur lors du tirage d'agents" );
      }
    );
  }
  
  
  
  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }
  
  detailsTirage(tirage: TirageAgent) {
    this.dialog.open(DetailsTiragePelerinageComponent, { data: tirage })
      .afterClosed()
      .subscribe((tirage: TirageAgent) => {
        if (tirage) {
          const index = this.agents.findIndex(
            (existingtirage) => existingtirage.id === tirage.id
          );
          this.agents[index] = new TirageAgent(tirage);
          this.subject$.next(this.agents);
          this.refreshListe();
        }
      });
  }
  
}
