import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ListColumn } from '../../../../../@fury/shared/list/list-column.model';
import { MatDialog } from '@angular/material/dialog';
import { AgentService } from '../../../../shared/services/agent.service';
import { from, Observable, ReplaySubject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Agent } from '../../../../shared/model/agent.model';
import { filter } from 'rxjs/operators';
import { fadeInUpAnimation } from '../../../../../@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from '../../../../../@fury/animations/fade-in-right.animation';
import { CreateUpdateAgentComponent } from '../create-update-agent/create-update-agent.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogUtil } from '../../../../shared/util/util';
import { DialogConfirmationService } from '../../../../shared/services/dialog-confirmation.service';
import { ImportAgentComponent } from '../import-agent/import-agent.component'
import { DownloadsService } from '../../../../shared/services/downloads.service'
import { saveAs as importedSaveAs } from "file-saver";
@Component({
  selector: 'fury-list-agent',
  templateUrl: './list-agent.component.html',
  styleUrls: ['./list-agent.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class ListAgentComponent implements OnInit, AfterViewInit, OnDestroy {
  showProgressBar: boolean = false;
  dialogUtil: DialogUtil = new DialogUtil();
  agents: Agent[];
  subject$: ReplaySubject<Agent[]> = new ReplaySubject<Agent[]>(
    1
  );
  data$: Observable<Agent[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<Agent> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input()
  columns: ListColumn[] = [
    { name: "Checkbox", property: "checkbox", visible: false },
    { name: "ID", property: "id", visible: false, isModelProperty: true },
    {
      name: "Sexe",
      property: "sexe", // cette propriete se trouve dans l'objet agent
      visible: true,   // qui est un sous objet dans agent
      isModelProperty: true,
    },
    {
      name: "Matricule",
      property: "matricule", // cette propriete se trouve dans l'objet agent
      visible: true,      // qui est un sous objet dans agent
      isModelProperty: true,
    },
    {
      name: "Prenom",
      property: "prenom", // cette propriete se trouve dans l'objet agent
      visible: true,      // qui est un sous objet dans agent
      isModelProperty: true,
    },
    {
      name: "Nom",
      property: "nom", // cette propriete se trouve dans l'objet agent
      visible: true,   // qui est un sous objet dans agent
      isModelProperty: true,
    },
    {
      name: "Adresse",
      property: "adresse", // cette propriete se trouve dans l'objet agent
      visible: false,   // qui est un sous objet dans agent
      isModelProperty: true,
    },
    {
      name: "E-mail",
      property: "email", // cette propriete se trouve dans l'objet agent
      visible: true,   // qui est un sous objet dans agent
      isModelProperty: true,
    },
    {
      name: "Télephone",
      property: "telephone", // cette propriete se trouve dans l'objet agent
      visible: false,   // qui est un sous objet dans agent
      isModelProperty: true,
    },

    {
      name: "Fonction",
      property: "fonction", // cette propriete se trouve dans l'objet agent
      visible: true,   // qui est un sous objet dans agent
      isModelProperty: true,
    },
    {
      name: "Date de naissance",
      property: "dateNaissance", // cette propriete se trouve dans l'objet agent
      visible: false,   // qui est un sous objet dans agent
      isModelProperty: true,
    },
    {
      name: "Lieu de naissance",
      property: "lieuNaissance", // cette propriete se trouve dans l'objet agent
      visible: false,   // qui est un sous objet dans agent
      isModelProperty: true,
    },
    {
      name: "Date d'engagement",
      property: "dateEngagement", // cette propriete se trouve dans l'objet agent
      visible: false,   // qui est un sous objet dans agent
      isModelProperty: true,
    },
    {
      name: "Responsable",
      property: "estResponsable", // cette propriete se trouve dans l'objet agent
      visible: false,   // qui est un sous objet dans agent
      isModelProperty: true,
    },
    { name: "Actions", property: "actions", visible: true },
  ] as ListColumn[];

  constructor(
    private dialogConfirmationService: DialogConfirmationService,
    private agentService: AgentService,
    private snackbar: MatSnackBar,
    private downloadsService: DownloadsService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAgents();

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter((data) => !!data)).subscribe((agents) => {
      this.agents = agents;
      this.dataSource.data = agents;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAgents() {
    this.agentService.getAll().subscribe(
      (response) => {
        this.agents = response.body;
      },
      (err) => {
      },
      () => {
        this.subject$.next(this.agents);
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
    this.dataSource.filterPredicate = (data: any, value) => { const dataStr =JSON.stringify(data).toLowerCase(); return dataStr.indexOf(value) != -1; }
  
  }

  ngOnDestroy() { }
  createAgent() {
    this.dialog
      .open(CreateUpdateAgentComponent)
      .afterClosed()
      .subscribe((agent: any) => {
        /**
         * Agent is the updated agent (if the user pressed Save - otherwise it's null)
         */ if (agent) {
          /**
           * Here we are updating our local array.
           */
          this.agents.unshift(agent);
          this.subject$.next(this.agents);
        }
      });
  }
  importAgent() {
    this.dialog
      .open(ImportAgentComponent)
      .afterClosed()
      .subscribe((agents: any) => {
        /**
         * Agent is the updated agent (if the user pressed Save - otherwise it's null)
         */ if (agents) {
          this.getAgents();
        }
      });
  }
  updateAgent(agent: Agent) {
    this.dialog
      .open(CreateUpdateAgentComponent, {
        data: agent,
      })
      .afterClosed()
      .subscribe((agent) => {
        /**
         * Customer is the updated agent (if the user pressed Save - otherwise it's null)
         */
        if (agent) {


          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.agents.findIndex(
            (existingAgent) =>
              existingAgent.id === agent.id
          );
          this.agents[index] = agent;
          this.subject$.next(this.agents);
        }
      });
  }
  deleteAgent(agent: Agent) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.agentService.delete(agent).subscribe((response) => {
          this.agents.splice(
            this.agents.findIndex(
              (existingAgent) => existingAgent.id === agent.id
            ),
            1
          );
          this.snackbar.open('Suppression réussie!', null, {
            duration: 5000
          });
          this.subject$.next(this.agents);
        });
      }
    })
  }

  downloadTemplate() {
    this.downloadsService.downloadTemplate('liste_agents').subscribe((response) => {
      let blob: any = new Blob([response]);
      const url = window.URL.createObjectURL(blob);
      importedSaveAs(blob, 'agents.xlsx');
      this.snackbar.open('Téléchargement réussie!', null, {
        duration: 5000
      });

    });
  }

}
