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

import { MailService } from "../../../../../shared/services/mail.service";
import { Mail } from "../../../../../shared/model/mail.model";

import * as _moment from "moment";
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from "moment";
import { SuiviStock } from "../../shared/models/suiviStock.model";
import { SuiviStockService } from "../../shared/suiviStock.service";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { formatDateEnMois } from "src/app/shared/util/formatageDate";
import { Fournisseur } from "src/app/pages/parametrage/shared/model/fournisseur.model";
import { Marque } from "src/app/pages/parametrage/shared/model/marque.model";
import { FournisseurService } from "src/app/pages/parametrage/shared/service/fournisseur.service";
import { MarqueService } from "src/app/pages/parametrage/shared/service/marque.service";
import { CategorieLait } from "src/app/pages/parametrage/shared/model/categorie-lait.model";
import { CategorieLaitService } from "src/app/pages/parametrage/shared/service/categorie-lait.service";
import { ActivatedRoute, Router } from "@angular/router";
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
  selector: "fury-add-or-update-suivi-stock-lait",
  templateUrl: "./add-or-update-suivi-stock-lait.component.html",
  styleUrls: ["./add-or-update-suivi-stock-lait.component.scss"],
})
export class AddOrUpdateSuiviStockLaitComponent implements OnInit {
  username: string;
  compte: Compte;
  agent: Agent;
  stock: Stock;
  suiviStock: SuiviStock;
  form: FormGroup;

  fournisseurs: Fournisseur[];
  marques: Marque[];

  // autocomplete select
  fournisseurCrtl: FormControl = new FormControl();
  filteredFournisseurs: Observable<any[]>;

  fournisseur: Fournisseur
  marque: Marque

  // autocomplete select
  marqueCrtl: FormControl = new FormControl();
  filteredMarques: Observable<any[]>;

  categorieLaits: CategorieLait[];
  categorieLaitSelected: CategorieLait;
  // autocomplete select
  categorieLaitCrtl: FormControl = new FormControl();
  filteredCategorieLait: Observable<any[]>;

  mode: "create" | "update" = "create";

  @ViewChild(MatDatepicker) picker;
  date = new FormControl(moment());

  anneeSelected = new Date().getFullYear();

  mois = formatDateEnMois(new Date());

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: SuiviStock,
    private dialogRef: MatDialogRef<AddOrUpdateSuiviStockLaitComponent>,
    private fb: FormBuilder,
    private suiviStockService: SuiviStockService,
    private fournisseurService: FournisseurService,
    private marqueService: MarqueService,
    private stockService: StockService,
    private authService: AuthenticationService,
    private compteService: CompteService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService,
    private mailService: MailService,
    private categorieLaitService: CategorieLaitService,
    private _router: Router,
    private _activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.getStockAnnee();
    this.getFournisseurs();
    this.getMarques();
    this.getcategorieLait();
    this.username = this.authService.getUsername();

    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
    });

    if (this.defaults) {
      this.mode = "update";
      this.suiviStock = this.defaults;

      //  if(this.defaults.ville){
      //   this.villeFctr.setValue(this.defaults.ville.nom);
      //   this.ville = this.defaults.ville;
      //  }
    } else {
      this.defaults = {} as SuiviStock;
    }

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
      observation: new FormControl(this.defaults.observation || "", [
      ]),
      //  type: new FormControl(this.defaults.type || "", [Validators.required,]),
      //  annee: new FormControl(this.defaults.annee || "", [Validators.required,]),
    });
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

  setFournisseur(fournisseur) {
    this.fournisseur = fournisseur;
  }

  setMarque(marque) {
    this.marque = marque;
  }

  setCategorieLait(categorie){
    this.categorieLaitSelected = categorie;
  }

  createSuiviStock() {
    let suiviStock: SuiviStock = this.form.value;
    suiviStock.operation = 'acquisition';
    suiviStock.matriculeAgent = this.agent.matricule;
    suiviStock.nomAgent = this.agent.nom;
    suiviStock.prenomAgent = this.agent.prenom;
    suiviStock.fournisseur = this.fournisseur;
    suiviStock.marque = this.marque;
    suiviStock.categorieLait = this.categorieLaitSelected;
    suiviStock.mois = this.mois;
    
    this.dialogConfirmationService.confirmationDialog().subscribe((action) => {
      if (action === DialogUtil.confirmer) {
        this.suiviStockService.create(suiviStock).subscribe(
          (response) => {
            // this.sendMail();
            this.notificationService.success(NotificationUtil.ajout);
            // this._router.navigate(['../stock-lait/'], { relativeTo: this._activeRoute });
            this.dialogRef.close(response.body);
          },
          (err) => {
            this.notificationService.warn(NotificationUtil.echec);
          },
          () => {
            // this.sendMail();
          }
        );
      } else {
        this.dialogRef.close();
      }
    });
  }

  updateSuiviStock() {
    let suiviStock: SuiviStock = this.form.value;
    suiviStock.id = this.suiviStock.id;
    suiviStock.operation = "acquisition";
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
          () => {
            this.sendMail();
          }
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
      (err) => { },
      () => {
        //  this.subject$.next(this.SuiviStocks.filter(continent => continent.active === true));
        //  this.subject$.next(this.suiviStocks);
        //   this.showProgressBar = true;
      }
    );
  }

  getFournisseurs() {
    this.fournisseurService.getAll().subscribe(
      (response) => {
        this.fournisseurs = response.body;
      },
      (err) => { },
      () => {
        // used by autocomplete in agent
        this.filteredFournisseurs = this.fournisseurCrtl.valueChanges.pipe(
          startWith(""),
          map((state) =>
            state ? this.filterFournisseurs(state) : this.fournisseurs.slice()
          )
        );
      }
    );
  }

  getMarques() {
    this.marqueService.getAll().subscribe(
      (response) => {
        this.marques = response.body;
      },
      (err) => { },
      () => {
        // used by autocomplete in agent
        this.filteredMarques = this.marqueCrtl.valueChanges.pipe(
          startWith(""),
          map((marque) =>
            marque ? this.filterMarques(marque) : this.marques.slice()
          )
        );
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
  createStock() {
    this.stock.quantiteReference =
      this.stock.quantiteReference + this.form.value.quantite;

    this.dialogConfirmationService.confirmationDialog().subscribe((action) => {
      this.stockService.create(this.stock).subscribe(
        (response) => { },
        (err) => {
          this.notificationService.warn(NotificationUtil.echec);
        },
        () => { }
      );
    });
  }

  isCreateMode() {
    return this.mode === "create";
  }

  isUpdateMode() {
    return this.mode === "update";
  }



  filterFournisseurs(name: string) {
    return this.fournisseurs.filter(
      (fournisseur) =>
        fournisseur.nomfournisseur.toLowerCase().indexOf(name.toLowerCase()) === 0 ||
        fournisseur.reffournisseur.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }

  filterMarques(name: string) {
    return this.marques.filter(
      (marque) =>
        marque.libelle.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }

  filterCategorieLaits(name: string) {
    return this.categorieLaits.filter(
      (categorieLait) =>
      categorieLait.libelle.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }

  sendMail() {

    let mail: Mail

    mail.contenu = "NOUVELLE ACQUISITION"
    mail.objet = "NOUVELLE ACQUISITION"
    mail.destinataires = ["cheikhibra.samb@portdakar.sn"]

    this.dialogConfirmationService.confirmationDialog().subscribe((action) => {
      this.mailService.sendMailByDirections(mail).subscribe(
        (response) => { },
        (err) => {
          this.notificationService.warn(NotificationUtil.echec);
        },
        () => { }
      );
    });
  }
}
