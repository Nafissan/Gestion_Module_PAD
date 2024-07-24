import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { Pelerin } from '../../shared/model/pelerin-pelerinage.model';
import { DossierPelerinage } from '../../shared/model/dossier-pelerinage.model';
import { PelerinsService } from '../../shared/services/pelerin-pelerinage.service';
import { filter } from 'rxjs/operators';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReplaySubject, Observable } from 'rxjs';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';

@Component({
  selector: 'fury-list-pelerin-pelerinage',
  templateUrl: './list-pelerin-pelerinage.component.html',
  styleUrls: ['./list-pelerin-pelerinage.component.scss', "../../../../shared/util/bootstrap4.css"]
})
export class ListPelerinPelerinageComponent implements OnInit {
  setDataSourceAttributes() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }  }
  subject$: ReplaySubject<Pelerin[]> = new ReplaySubject<Pelerin[]>(1);
  data$: Observable<Pelerin[]> = this.subject$.asObservable();
  pelerins: Pelerin[] = [];        
  showProgressBar = false;
  private sort: MatSort;
  private paginator: MatPaginator;
  dataSource: MatTableDataSource<Pelerin> | null;
 
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatAccordion) accordion: MatAccordion;
  showIcon = true;
  constructor(@Inject(MAT_DIALOG_DATA) public defaults: DossierPelerinage ,
   private pelerinService: PelerinsService
) { }
  ngOnInit(): void {
    this.loadPelerins();
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((pelerin) => {
      this.pelerins = pelerin;
      this.dataSource.data = pelerin;
    });
  }
  @Input()
columns: ListColumn[] = [
  { name: "Code Dossier", property: "dossierPelerinage", visible: true, isModelProperty: true },
  { name: "Matricule", property: "matricule", visible: true,  },
  { name: "Nom ", property: "nom", visible: true,  },
  { name: "Prenom ", property: "prenom", visible: true,  },
  {
    name: "Sexe",
    property: "sexe", 
    visible: true,   
    isModelProperty: true,
  },
 
   { name: "Date de Naissance", property: "dateNaissance", visible: true, },
  { name: "Date Engagement", property: "dateEngagement", visible: true,  },

] as ListColumn[];
get visibleColumns() {
  return this.columns.filter((column) => column.visible).map((column) => column.property);
}
  loadPelerins() {
    const annee = this.defaults.annee;
    this.pelerinService.getPelerinsByAnnee(annee).subscribe(
      (response) => {
        this.pelerins = response.body as Pelerin[];
      },
      error => {
        console.error('Erreur lors de la récupération des colons :', error);
      },()=>{
        this.subject$.next(this.pelerins);
        this.showProgressBar = true;
      }
    );
    }

}
