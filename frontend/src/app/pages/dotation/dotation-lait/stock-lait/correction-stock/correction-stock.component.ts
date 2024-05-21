

import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { Compte } from "src/app/pages/gestion-utilisateurs/shared/model/compte.model";
import { CompteService } from "src/app/pages/gestion-utilisateurs/shared/services/compte.service";
import { Agent } from "src/app/shared/model/agent.model";
import { AuthenticationService } from "src/app/shared/services/authentification.service";
import { DialogConfirmationService } from "src/app/shared/services/dialog-confirmation.service";
import { NotificationService } from "src/app/shared/services/notification.service";
import { DialogUtil, NotificationUtil } from "src/app/shared/util/util";
import { Stock } from "../../shared/models/stock.model";
import { StockService } from "../../shared/stock.service";
import { MatDatepicker } from "@angular/material/datepicker";

import * as _moment from "moment";
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from "moment";
import { SuiviStock } from "../../shared/models/suiviStock.model";
import { SuiviStockService } from "../../shared/suiviStock.service";
import { CategorieLait } from "src/app/pages/parametrage/shared/model/categorie-lait.model";
import { Observable } from "rxjs";
import { CategorieLaitService } from "src/app/pages/parametrage/shared/service/categorie-lait.service";
import { map, startWith } from "rxjs/operators";
const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: "YYYY",
  },
  display: {
    dateInput: "YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};
@Component({
  selector: 'fury-correction-stock',
  templateUrl: './correction-stock.component.html',
  styleUrls: ['./correction-stock.component.scss','./correction-stock.component.css']
})
export class CorrectionStockComponent implements OnInit {
  username: string;
  compte: Compte;
  agent: Agent;
  stock: Stock;
  suiviStock: SuiviStock;
  form: FormGroup;

  mode: "create" | "update" = "create";

  @ViewChild(MatDatepicker) picker;
  date = new FormControl(moment());

  anneeSelected = new Date().getFullYear();

  checked = false;
  indeterminate = false;
  labelPosition: 'exces' | 'manquant' = 'manquant';
  // hiddenExeces = false;
  // hiddenManquant: true;

  isExces: boolean
  isManquant:boolean
  categorieLaits: CategorieLait[];
  categorieLaitSelected: CategorieLait;
  // autocomplete select
  categorieLaitCrtl: FormControl = new FormControl();
  filteredCategorieLait: Observable<any[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: SuiviStock,
    private dialogRef: MatDialogRef<CorrectionStockComponent>,
    private fb: FormBuilder,
    private suiviStockService: SuiviStockService,
    private stockService: StockService,
    private authService: AuthenticationService,
    private compteService: CompteService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService,
    private categorieLaitService: CategorieLaitService
  ) {}

  ngOnInit() {
    this.getcategorieLait();
    this.getStockAnnee();
    this.username = this.authService.getUsername();

    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
    });

    if (this.defaults) {
      this.mode = "update";
      this.suiviStock = this.defaults;


    } else {
      this.defaults = {} as SuiviStock;
    }

    this.isExces = false
    this.isManquant = true

    // this.labelPosition = "manquant"
   
    // FormGroup
    this.form = this.fb.group({
      libelle: new FormControl(this.defaults.libelle || "", [
        Validators.required,
      ]),
      quantite: new FormControl(this.defaults.quantite || "", [
        Validators.required,
      ]),
      dateOperation: new FormControl(this.defaults.dateOperation || "", [
        Validators.required,
      ]),
      //  type: new FormControl(this.defaults.type || "", [Validators.required,]),
      //  annee: new FormControl(this.defaults.annee || "", [Validators.required,]),
    });
  }

  showExces() {
    this.isManquant = false;
     this.isExces =  true;
  }

  showManquant() {
    this.isManquant = true;
     this.isExces =  false;
  }

  yearSelected(params) {
    this.date.setValue(params);
    this.anneeSelected = params.year();
    this.picker.close();
    // this.setDossierInterimAnnee(this.anneeSelected);
  }

  save() {
    if (this.mode === "create") {
      this.createSuiviStock();
    } else if (this.mode === "update") {
      this.updateSuiviStock();
    }
  }

  setCategorieLait(categorie){
    this.categorieLaitSelected = categorie;
  }

  createSuiviStock() {
    let suiviStock: SuiviStock = this.form.getRawValue();
    suiviStock.operation = 'correction';
    suiviStock.matriculeAgent = this.agent.matricule;
    suiviStock.nomAgent = this.agent.nom;
    suiviStock.prenomAgent = this.agent.prenom;
    suiviStock.categorieLait = this.categorieLaitSelected;
    if(this.isExces === true){
      suiviStock.quantite = -this.form.value.quantite
     }
    this.dialogConfirmationService.confirmationDialog().subscribe((action) => {
      if (action === DialogUtil.confirmer) {
        this.suiviStockService.addCorrectionStock(suiviStock).subscribe(
          (response) => {
            this.notificationService.success(NotificationUtil.ajout);
            this.dialogRef.close(response.body);
          },
          (error) => {
              this.notificationService.warn(error.error.message);
          },
          () => {}
        );
      } else {
        this.dialogRef.close();
      }
    });
  }

  updateSuiviStock() {
    let suiviStock: SuiviStock = this.form.value;
    suiviStock.id = this.suiviStock.id;
    suiviStock.operation = "correction";
    suiviStock.stock = this.stock;

    this.dialogConfirmationService.confirmationDialog().subscribe((action) => {
      if (action === DialogUtil.confirmer) {
        this.suiviStockService.update(suiviStock).subscribe(
          (response) => {
            this.notificationService.success(NotificationUtil.modification);
            this.dialogRef.close(Stock);
          },
          (err) => {
            this.notificationService.warn(NotificationUtil.echec);
          },
          () => {}
        );
      } else {
        this.dialogRef.close();
      }
    });
  }

  getStockAnnee() {
    this.stockService.getByAnnee(this.anneeSelected).subscribe(
      (response) => {
        this.stock = response.body;
        console.log("Stock Recupéré:  " + this.stock);
      },
      (err) => {},
      () => {
        //  this.subject$.next(this.SuiviStocks.filter(continent => continent.active === true));
        //  this.subject$.next(this.suiviStocks);
        //   this.showProgressBar = true;
      }
    );
  }

  getcategorieLait() {
    this.categorieLaitService.getAll().subscribe(
      (response) => {
        this.categorieLaits = response.body;
      },
      (err) => {
      },
      () => {
        console.log(this.categorieLaits);
        
             // used by autocomplete in agent
             this.filteredCategorieLait = this.categorieLaitCrtl.valueChanges.pipe(
              startWith(""),
              map((categorieLait) =>
              categorieLait ? this.filterCategorieLaits(categorieLait) : this.categorieLaits.slice()
              )
            );
      });
  }

  filterCategorieLaits(name: string) {
    return this.categorieLaits.filter(
      (categorieLait) =>
      categorieLait.libelle.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }

  isCreateMode() {
    return this.mode === "create";
  }

  isUpdateMode() {
    return this.mode === "update";
  }
}

