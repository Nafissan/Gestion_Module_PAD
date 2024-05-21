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
import { Dotation } from "../../shared/models/dotation.model";
import { SuiviDotation } from "../../shared/models/suiviDotation.model";
import { SuiviDotationService } from "../../shared/services/suivi-dotation.service";
import { MatDatepicker } from "@angular/material/datepicker";

import * as _moment from "moment";
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from "moment";
import { SuiviStockService } from "../../shared/suiviStock.service";
import { DotationService } from "../../shared/services/dotation.service";
import { SuiviStock } from "../../shared/models/suiviStock.model";
import { HttpErrorResponse } from "@angular/common/http";
import { formatDateEnMois } from "src/app/shared/util/formatageDate";
import { CategorieLait } from "src/app/pages/parametrage/shared/model/categorie-lait.model";
import { CategorieLaitService } from "src/app/pages/parametrage/shared/service/categorie-lait.service";
import { Observable } from "rxjs";
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
  selector: 'fury-correction-attribution',
  templateUrl: './correction-attribution.component.html',
  styleUrls: ['./correction-attribution.component.scss']
})
export class CorrectionAttributionComponent implements OnInit {
  username: string;
  compte: Compte;
  agent: Agent;
  dotation: Dotation;
  suiviStock: SuiviStock;
  suiviDotation: SuiviDotation;
  suiviDotations: SuiviDotation[]=[]
  form: FormGroup;
  stateCtrl: FormControl = new FormControl();
  mode: "create" | "update" = "create";

  @ViewChild(MatDatepicker) picker;
  date = new FormControl(moment());

  anneeSelected = new Date().getFullYear();

  currentYear: number = new Date().getFullYear();
  currentMois = formatDateEnMois(new Date());

  categorieLaits: CategorieLait[];
  categorieLaitSelected: CategorieLait;
  // autocomplete select
  categorieLaitCrtl: FormControl = new FormControl();
  filteredCategorieLait: Observable<any[]>;

  categorieLaitNAN1: CategorieLait;
  categorieLaitNAN2: CategorieLait;
  categorieLaitNAN3: CategorieLait;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: SuiviDotation,
    private dialogRef: MatDialogRef<CorrectionAttributionComponent>,
    private fb: FormBuilder,
    private suiviStockService: SuiviStockService,
    private suiviDotationService: SuiviDotationService,
    private dotationService: DotationService,
    private authService: AuthenticationService,
    private compteService: CompteService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService,
    private categorieLaitService: CategorieLaitService
  ) {}

  ngOnInit() {
   
    this.getcategorieLait();
    this.username = this.authService.getUsername();
    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
    });

      this.mode = "create";
      this.suiviDotation = this.defaults;
      this.getSuviDotationByDotationAndAnneeAndMois(this.defaults.id,this.currentYear,this.currentMois);
      this.categorieLaitCrtl.setValue(this.defaults?.categorieLait?.description);
    // FormGroup
    this.form = this.fb.group({
      nbreArticleAttribue: [{ value: this.defaults.dotation.typeDotation.nbreArticle * this.defaults.dotation.nbreEnfant , disabled: true}],
      dateAttribution: new FormControl({ value: new Date(this.defaults.dateAttribution), disabled: true }),
    });

  }

  yearSelected(params) {
    this.date.setValue(params);
    this.anneeSelected = params.year();
    this.picker.close();
  }

  save() {
      this.updateSuiviDotation();
  }
  updateSuiviDotation() {
    let suiviDotation: SuiviDotation = this.form.getRawValue();

    suiviDotation = this.defaults;
    suiviDotation.matriculeAgent = this.agent.matricule;
    suiviDotation.nomAgent = this.agent.nom;
    suiviDotation.prenomAgent = this.agent.prenom;
    suiviDotation.etat = "A VALIDER"
    suiviDotation.mois = formatDateEnMois(suiviDotation.dateAttribution);
    suiviDotation.annee = new Date().getFullYear();
    suiviDotation.categorieLait = this.categorieLaitSelected || suiviDotation?.categorieLait;

    this.dialogConfirmationService.confirmationDialog().subscribe((action) => {
      if (action === DialogUtil.confirmer) {
        this.suiviDotationService.create(suiviDotation).subscribe(
          (response) => {
            this.notificationService.success(NotificationUtil.ajout);
            this.dialogRef.close(response.body);
          },
          (error) => {
              this.notificationService.warn(error.error.message);
          },
          () => {
          }
        );
      } else {
        this.dialogRef.close();
      }
    });

  
  }

  // updateSuiviDotation() {
  //   let suiviDotation: SuiviDotation = this.form.value;
  //   suiviDotation.id = this.suiviDotation.id;

  //   this.dialogConfirmationService.confirmationDialog().subscribe((action) => {
  //     if (action === DialogUtil.confirmer) {
  //       this.suiviDotationService.update(suiviDotation).subscribe(
  //         (response) => {
  //           this.notificationService.success(NotificationUtil.modification);
  //           this.dialogRef.close(Dotation);
  //         },
  //         (err) => {
  //           this.notificationService.warn(NotificationUtil.echec);
  //         },
  //         () => {}
  //       );
  //     } else {
  //       this.dialogRef.close();
  //     }
  //   });
  // }

  createDotation() {
    this.dotation.nbreArticleRecu =
      this.dotation.nbreArticleRecu + this.form.value.quantite;

    this.dialogConfirmationService.confirmationDialog().subscribe((action) => {
      this.dotationService.create(this.dotation).subscribe(
        (response) => {},
        (err) => {
          this.notificationService.warn(NotificationUtil.echec);
        },
        () => {}
      );
    });
  }

  setCategorieLait(categorie){
    this.categorieLaitSelected = categorie;
  }

  
  getcategorieLait() {
    this.categorieLaitService.getAll().subscribe(
      (response) => {
        this.categorieLaits = response.body;
        this.categorieLaitNAN1 =this.categorieLaits.find(c=> c.libelle === 'NAN 1');
        this.categorieLaitNAN2 =this.categorieLaits.find(c=> c.libelle === 'NAN 2');
        this.categorieLaitNAN3 =this.categorieLaits.find(c=> c.libelle === 'NAN 3');
      },
      (err) => {
      },
      () => {
             // used by autocomplete in agent
             this.filteredCategorieLait = this.categorieLaitCrtl.valueChanges.pipe(
              startWith(""),
              map((categorieLait) =>
              categorieLait ? this.filterCategorieLaits(categorieLait) : this.categorieLaits.slice()
              )
            );
            // const nbreTotatAtt = this.defaults.dotation.typeDotation.nbreMois;
            // if(this.defaults.dotation.nbreAttribution <= (nbreTotatAtt/3)){
            //   this.categorieLaitCrtl.setValue(this.categorieLaitNAN1.description);
            // }
            // else if((this.defaults.dotation.nbreAttribution > (nbreTotatAtt/3) ) && (this.defaults.dotation.nbreAttribution <= (nbreTotatAtt*(2/3)))){
            //   this.categorieLaitCrtl.setValue(this.categorieLaitNAN2.description);
            // }
            // else{
            //   this.categorieLaitCrtl.setValue(this.categorieLaitNAN3.description);
            // }
      });
  }
  filterCategorieLaits(name: string) {
    return this.categorieLaits.filter(
      (categorieLait) =>
      categorieLait.libelle.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }
  getSuviDotationByDotationAndAnneeAndMois(id:number,annee:number,mois:string){
    this.suiviDotationService.getByDotationAnneeAndMois(id,annee,mois).subscribe(
      (response) => {
        this.suiviDotations = response.body;
      },
      (err) => {
        this.notificationService.warn(NotificationUtil.echec);
      },
      () => {}
    );
  }
  isCreateMode() {
    return this.mode === "create";
  }

  isUpdateMode() {
    return this.mode === "update";
  }
}