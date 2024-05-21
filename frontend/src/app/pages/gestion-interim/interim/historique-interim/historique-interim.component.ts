import { Component, OnInit, ViewChild, Input, Inject } from "@angular/core";

import { ReplaySubject, Observable } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ListColumn } from "../../../../../@fury/shared/list/list-column.model";
import { filter } from "rxjs/operators";
import { fadeInRightAnimation } from "../../../../../@fury/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "../../../../../@fury/animations/fade-in-up.animation";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { EtapeInterim } from '../../shared/model/etapeInterim.modele';
import { EtapeInterimService } from '../../shared/services/etape-interim.service';
import { DialogUtil } from "../../../../shared/util/util";
import { DialogConfirmationService } from "../../../../shared/services/dialog-confirmation.service";import { AddEtapeInterimComponent } from "../../etape-interim/add-etape-interim/add-etape-interim.component";
import { DetailsEtapeInterimComponent } from "../../etape-interim/details-etape-interim/details-etape-interim.component";
import { ActivatedRoute, Router } from "@angular/router";
import { ListInterimComponent } from '../../interim/list-interim/list-interim.component';

@Component({
  selector: 'fury-historique-interim',
  templateUrl: './historique-interim.component.html',
  styleUrls: ['./historique-interim.component.scss',"../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class HistoriqueInterimComponent implements OnInit {

  
  etapeInterims: EtapeInterim[];
  idInterim: any;
  dialogUtil: DialogUtil = new DialogUtil();
  
  constructor(    
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private route: ActivatedRoute,
    private etapeInterimService: EtapeInterimService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,private router:Router) {    
    }

  ngOnInit() {

   this.idInterim = this.defaults.id

    this.getEtapeInterimByiNTERIM(this.idInterim);
  }

  getEtapeInterimByiNTERIM(idInterim:number) {
    this.etapeInterimService.getEtapeInterimsByInterim(idInterim).subscribe(
      (response) => {
        this.etapeInterims = response.body;
      },
      (err) => {
      },
      () => {
       // this.subject$.next(this.etapeInterims);
      }
    );
  }


  ngOnDestroy() {}

}