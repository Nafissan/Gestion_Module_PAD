import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogUtil, NotificationUtil } from 'src/app/shared/util/util';
import {Fournisseur} from '../../shared/model/fournisseur.model'
import {FournisseurService} from '../../shared/service/fournisseur.service'
import { AddOrUpdateFournisseurComponent } from './../add-or-update-fournisseur/add-or-update-fournisseur.component';


@Component({
  selector: 'fury-list-fournisseur',
  templateUrl: './list-fournisseur.component.html',
  styleUrls: ['./list-fournisseur.component.scss', '../../../../shared/util/bootstrap4.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ListFournisseurComponent implements OnInit {


  FournisseurAnneePrecedente:Fournisseur;

  showProgressBar: boolean = false;
  date: Date = new Date();
  // currentYear: number = new Date().getFullYear();

  agentsChefStructureMail: string[] = [];
  currentFournisseur: Fournisseur = undefined;
  fournisseurs: Fournisseur[] = [];
  subject$: ReplaySubject<Fournisseur[]> = new ReplaySubject<Fournisseur[]>(
    1
  );
  data$: Observable<Fournisseur[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<Fournisseur> | null;

  idFournisseur:number;
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
    { name: "Checkbox", property: "checkbox", visible: false},
    { name: "Id", property: "id", visible: false, isModelProperty: true },
    { name: "Nom ", property: "nomfournisseur", visible: true, isModelProperty: true },
    { name: "REF fournisseur", property: "reffournisseur", visible: true, isModelProperty: true },
    { name: "Commentaire", property: "commentaire", visible: true, isModelProperty: true },

    // { name: "type", property: "type", visible: false, isModelProperty: true },
    // { name: "Active ", property: "active", visible: true, isModelProperty: true },
    { name: "Actions", property: "action", visible: true },

  ] as ListColumn[];
  constructor(
    private FournisseurService: FournisseurService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.getFournisseurs();

    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((Fournisseurs) => {
      this.fournisseurs = Fournisseurs;
      this.dataSource.data = Fournisseurs;
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
    this.dataSource.filterPredicate = (data: any, value) => { const dataStr = JSON.stringify(data).toLowerCase(); return dataStr.indexOf(value) != -1; }
  }
  getFournisseurs() {
    this.FournisseurService.getAll().subscribe(
      (response) => {
        this.fournisseurs = response.body;
      },
      (err) => {
      },
      () => {

       this.subject$.next(this.fournisseurs);
        this.showProgressBar = true;

      }
    );
  }

  createFournisseur() {
    this.dialog
      .open(AddOrUpdateFournisseurComponent)
      .afterClosed()
      .subscribe((fournisseur: any) => {
        /**
         * Fournisseur is the updated continent (if the user pressed Save - otherwise it's null)
         */ if (fournisseur) {
          /**
           * Here we are updating our local array.
           */
           this.fournisseurs.unshift(new Fournisseur(fournisseur));
          this.subject$.next(this.fournisseurs);
        }
      });
  }
  updateFournisseur(Fournisseur: Fournisseur) {
    this.dialog
      .open(AddOrUpdateFournisseurComponent, {
        data: Fournisseur,
      })
      .afterClosed()
      .subscribe((Fournisseur) => {
        /**
         * Fournisseur is the updated continent (if the user pressed Save - otherwise it's null)
         */
        if (Fournisseur) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index =      this.fournisseurs.findIndex(
            (existingFournisseur) =>
            existingFournisseur.id === Fournisseur.id
          );
          this.fournisseurs[index] = new Fournisseur(Fournisseur);
          this.subject$.next(     this.fournisseurs);
        }
      });
  }


  deleteFournisseur(Fournisseur: Fournisseur) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.FournisseurService.delete(Fournisseur).subscribe((response) => {
          this.fournisseurs.splice(
            this.fournisseurs.findIndex(
              (existingFournisseur) => existingFournisseur.id === Fournisseur.id
            ), 1);
          this.subject$.next(this.fournisseurs);
          this.notificationService.success(NotificationUtil.suppression);
        }, err => {
          this.notificationService.warn(NotificationUtil.echec);
        }, () => { })
      }
    })
  }


  ngOnDestroy() { }

  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }


}
