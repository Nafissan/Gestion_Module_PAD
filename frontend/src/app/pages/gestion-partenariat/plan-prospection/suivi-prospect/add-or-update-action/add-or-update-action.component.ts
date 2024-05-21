import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { UniteOrganisationnelleService } from 'src/app/pages/gestion-unite-organisationnelle/shared/services/unite-organisationnelle.service';
import { UniteOrganisationnelle } from 'src/app/shared/model/unite-organisationelle';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogUtil, NotificationUtil } from 'src/app/shared/util/util';
import { Partenaire, Prospect } from '../../../shared/model/partenaire.model';
import { SuiviPlanProspectionService } from '../../../shared/service/suivi-plan-prospection.service';
import { PartenaireService } from '../../../shared/service/partenaire.service';
import { SuiviProspect } from '../../../shared/model/suiviplan.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'fury-form-besoin',
  templateUrl: './add-or-update-action.component.html',
  styleUrls: ['./add-or-update-action.component.scss', '../../../../../shared/util/bootstrap4.css'],
  animations: [fadeInUpAnimation, fadeInRightAnimation]
})
export class AddOrUpdateActionComponent implements OnInit, AfterViewInit  {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['date',  'statut', 'action'];
  
  pQVFormGroup: FormGroup;
  pQPFormGroup: FormGroup;
  pCibleFormGroup: FormGroup;
  filteredUniteOrganisationnelles: Observable<any[]>;
  uniteOrganisationnelles: UniteOrganisationnelle[];
  uniteOrganisationnelleCtrl = new FormControl();
  statuts: any[];
  prospects: Partenaire[];
  dataSourceSuiviPQV = new MatTableDataSource<SuiviProspect>();
  dataSourceSuiviPQP = new MatTableDataSource<SuiviProspect>();
  suiviPQV: SuiviProspect[];
  suiviPQP: SuiviProspect[];
  isSavedBesoin: boolean = false;
  isSavedProspect: boolean = false;
  mode: "create" | "update" = "create";

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Prospect,
    private dialogRef: MatDialogRef<AddOrUpdateActionComponent>,
    private fb: FormBuilder,
    private  _router: Router,
    private suiviProspectService: SuiviPlanProspectionService,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService,
    private partenaireService: PartenaireService,
  ) {
  }
  ngAfterViewInit(): void {
    this.dataSourceSuiviPQV = new MatTableDataSource<SuiviProspect>(this.suiviPQV)
    this.dataSourceSuiviPQV.paginator = this.paginator;
  }

  ngOnInit() {
    this.statuts = [
      { id: 0, libelle: 'En cours' },
      { id: 1, libelle: 'Effectué' },
      { id: 2, libelle: 'Annulé' },
      { id: 3, libelle: 'Prévu' },
    ]
    this.dataSourceSuiviPQV = new MatTableDataSource<SuiviProspect>();
    this.dataSourceSuiviPQP = new MatTableDataSource<SuiviProspect>();

    this.getSuiviProspect();

    if (this.defaults) {
      this.mode = "update";
    }
    /**
     * Horizontal Stepper
     * @type {FormGroup}
     */

    this.pCibleFormGroup = this.fb.group({
      profil: [this.defaults.profil || null],
      nature: [this.defaults.nature || null],
      objectifAccord: [this.defaults.objectifAccord],
      dureeAccord: [this.defaults.dureeAccord || null],
      interetPAD: [this.defaults.interetPAD],
      interetGobalProspect: [this.defaults.interetGobalProspect],
      statut: [null],
    });

    this.pQVFormGroup = this.fb.group({
      type: ["PQV" || null],
      date: [null],
      action: [null],
      prospect: [this.defaults || null],
      statut: [null],
    });

    this.pQPFormGroup = this.fb.group({
      type: ["PQP" || null],
      date: [null],
      action: [null],
      prospect: [this.defaults || null],
      statut: [null],
    });
  }

  getSuiviProspect() {
    this.suiviProspectService.getSuiviByProspectId(this.defaults.id).subscribe(response => {
      const suivis: SuiviProspect[] = response.body;
      this.suiviPQV = suivis.filter((suivi) => suivi.type === 'PQV')
      this.suiviPQP = suivis.filter((suivi) => suivi.type === 'PQP')
    }, (err) => {
    }, () => {
      this.dataSourceSuiviPQV = new MatTableDataSource<SuiviProspect>(this.suiviPQV);
      this.dataSourceSuiviPQP = new MatTableDataSource<SuiviProspect>(this.suiviPQP);
    });
  }

  filterUniteOrg(uniteOrg: string) {
    return this.uniteOrganisationnelles.filter(uniteOrganisationnelle =>
      uniteOrganisationnelle.nom.toLowerCase().indexOf(uniteOrg.toLowerCase()) === 0 ||
      uniteOrganisationnelle.description.toLowerCase().indexOf(uniteOrg.toLowerCase()) === 0);
  }


  createOrUpdate(): void {
    if (this.mode === 'create') {

    } else if (this.mode === 'update') {
      this.createLigneActionPQV();
    }
  }

  createLigneActionPQV(): void {
    console.log(this.pQVFormGroup.value);

    this.dialogConfirmationService.confirmationDialog().subscribe({
      next: (action) => {
        if (action === DialogUtil.confirmer) {
          this.suiviProspectService.create(this.pQVFormGroup.value).subscribe({
            next: (response) => {
              this.suiviPQV.push(response.body)
              this.notificationService.success(NotificationUtil.ajout);
            },
            error: (err) => {
              this.notificationService.warn(NotificationUtil.echec);
            },
            complete: () => {
              this.getSuiviProspect();
              this.isSavedBesoin = true;
            }
          });
        }
      }
    })
  }

  createLigneActionPQP(): void {
    console.log(this.pQPFormGroup.value);

    this.dialogConfirmationService.confirmationDialog().subscribe({
      next: (action) => {
        if (action === DialogUtil.confirmer) {
          this.suiviProspectService.create(this.pQPFormGroup.value).subscribe({
            next: (response) => {
              this.suiviPQV.push(response.body)
              this.notificationService.success(NotificationUtil.ajout);
            },
            error: (err) => {
              this.notificationService.warn(NotificationUtil.echec);
            },
            complete: () => {
              this.getSuiviProspect();
              this.isSavedBesoin = true;
            }
          });
        }
      }
    })
  }

  qualifierPartenaire() {
    this.dialogConfirmationService.confirmationDialog().subscribe({
      next: (action) => {
        if (action === DialogUtil.confirmer) {
          const prospect: Prospect = this.defaults;
          prospect.statut = 3;
          prospect.partenaire = true;
          this.partenaireService.qualifierPartenaire(prospect).subscribe({
            next: (response) => {
              this.defaults = prospect;
              this.notificationService.success(NotificationUtil.ajout);
            },
            error: (err) => {
              this.notificationService.warn(NotificationUtil.echec);
            },
            complete: () => {
              this.isSavedProspect = true;
            }
          });
        }
      }
    })
  }

  qualifierProspectPotentiel() {
    this.dialogConfirmationService.confirmationDialog().subscribe({
      next: (action) => {
        if (action === DialogUtil.confirmer) {
          const prospect: Prospect = this.defaults;
          prospect.statut = 1;
          this.partenaireService.qualifierProspectPotentiel(prospect).subscribe({
            next: (response) => {
              this.defaults = prospect;
              this.notificationService.success(NotificationUtil.ajout);
            },
            error: (err) => {
              this.notificationService.warn(NotificationUtil.echec);
            },
            complete: () => {
              this.isSavedProspect = true;
            }
          });
        }
      }
    })
  }

  updateProspectCible() {
    this.dialogConfirmationService.confirmationDialog().subscribe({
      next: (action) => {
        if (action === DialogUtil.confirmer) {
          const prospectToUpdate: Prospect = this.pCibleFormGroup.value;
          const prospect: Prospect = this.defaults;
          prospect.nature = prospectToUpdate.nature;
          prospect.profil = prospectToUpdate.profil;
          prospect.objectifAccord = prospectToUpdate.objectifAccord;
          prospect.dureeAccord = prospectToUpdate.dureeAccord;
          prospect.interetPAD = prospectToUpdate.interetPAD;
          prospect.interetGobalProspect = prospectToUpdate.interetGobalProspect;
          this.partenaireService.updateProspect(prospect).subscribe({
            next: (response) => {
              this.defaults = prospect;
              this.notificationService.success(NotificationUtil.ajout);
            },
            error: (err) => {
              this.notificationService.warn(NotificationUtil.echec);
            },
            complete: () => {
              this.isSavedProspect = true;
            }
          });
        }
      }
    })
  }

  annulerEtape(): void {
    this.dialogConfirmationService.confirmationDialog().subscribe({
      next: (action) => {
        if (action === DialogUtil.confirmer) {
          const prospect: Prospect = this.defaults;
          prospect.statut = 0;
          prospect.partenaire = false;
          this.partenaireService.updateProspect(prospect).subscribe({
            next: (response) => {
              this.defaults = prospect;
              this.notificationService.success(NotificationUtil.ajout);
            },
            error: (err) => {
              this.notificationService.warn(NotificationUtil.echec);
            },
            complete: () => {
              this.isSavedProspect = true;
            }
          });
        }
      }
    })
  }

  updateLignePQV(ligne): void {

  }

  deleteLignePQV(ligne): void {

  }
  updateLignePQP(ligne): void {

  }

  deleteLignePQP(ligne): void {

  }

  refreshList(): void{
    let currentUrl = this._router.url;
    this._router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this._router.navigate([currentUrl]);
        console.log(currentUrl);
    });
  }

  private _gap = 16;
  gap = `${this._gap}px`;

  col(colAmount: number) {
    return `1 1 calc(${100 / colAmount}% - ${this._gap - (this._gap / colAmount)}px)`;
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o1 && o2) return o1.id === o2.id;
  }
}

