import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { UniteOrganisationnelleService } from 'src/app/pages/gestion-unite-organisationnelle/shared/services/unite-organisationnelle.service';
import { Domaine } from 'src/app/pages/parametrage/shared/model/domaine.model';
import { DomaineService } from 'src/app/pages/parametrage/shared/service/domaine.service';
import { UniteOrganisationnelle } from 'src/app/shared/model/unite-organisationelle';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogUtil, NotificationUtil } from 'src/app/shared/util/util';
import { Besoin } from '../../../shared/model/besoin.model';
import { Partenaire } from '../../../shared/model/partenaire.model';
import { BesoinService } from '../../../shared/service/besoin.service';
import { PartenaireService } from '../../../shared/service/partenaire.service';


@Component({
  selector: 'fury-form-besoin',
  templateUrl: './add-or-update-besoin.component.html',
  styleUrls: ['./add-or-update-besoin.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation]
})
export class AddOrUpdateBesoinComponent implements OnInit {

  besoinFormGroup: FormGroup;
  prospectFormGroup: FormGroup;
  filteredUniteOrganisationnelles: Observable<any[]>;
  uniteOrganisationnelles: UniteOrganisationnelle[];
  uniteOrganisationnelleCtrl = new FormControl();
  besoin: Besoin;
  domaines: Domaine[];
  prospects: Partenaire[];
  isSavedBesoin: boolean = false;
  isSavedProspect: boolean = false;
  mode: "create" | "update" = "create";

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Besoin,
    private dialogRef: MatDialogRef<AddOrUpdateBesoinComponent>,
    private fb: FormBuilder,
    private  _router: Router,
    private uniteOrganisationnelleService: UniteOrganisationnelleService,
    private domaineService: DomaineService,
    private besoinService: BesoinService,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService,
    private partenaireService: PartenaireService,
  ) {
  }

  ngOnInit() {
    this.getUniteOrganisationnelles();
    this.getDomaines();
    this.getProspects();

    console.log(this.defaults);
    

    if (this.defaults?.libelle ) {
      this.mode = "update";
      this.besoin = this.defaults;
      this.uniteOrganisationnelleCtrl.setValue(this.defaults.unite);
      
    }
    /**
     * Horizontal Stepper
     * @type {FormGroup}
     */

    this.besoinFormGroup = this.fb.group({
      id: [this.defaults?.id || null],
      planprospection: [this.defaults?.planprospection || null],
      unite: [this.defaults?.unite || null, Validators.required],
      libelle: [this.defaults?.libelle || null, Validators.required],
      domaines: [this.defaults?.domaines || this.domaines, Validators.required],
      code: [this.defaults?.code || null],
      active: [this.defaults?.active || null],
      partenaires: [this.defaults?.partenaires || []],
    });

    this.prospectFormGroup = this.fb.group({
      partenaires: [this.defaults?.partenaires, Validators.required],
    });

    this.besoinFormGroup?.controls['unite']?.setValue(this.defaults.unite);
  }

  getUniteOrganisationnelles() {
    this.uniteOrganisationnelleService.getAll().subscribe(response => {
      this.uniteOrganisationnelles = response.body;
    }, (err) => {
    }, () => {
      this.filteredUniteOrganisationnelles = this.uniteOrganisationnelleCtrl.valueChanges.pipe(
        startWith(''), map(uniteOrganisationnelle => uniteOrganisationnelle ? this.filterUniteOrg(uniteOrganisationnelle) : this.uniteOrganisationnelles.slice())

      );
    });
  }

  getDomaines() {
    this.domaineService.getAll().subscribe({
      next: (response) => {
        this.domaines = response.body;
      }
    });
  }

  getProspects() {
    this.partenaireService.getAll().subscribe({
      next: (response) => {
        this.prospects = response.body;
      }
    });
  }

  filterUniteOrg(uniteOrg: string) {
    return this.uniteOrganisationnelles.filter(uniteOrganisationnelle =>
      uniteOrganisationnelle.nom.toLowerCase().indexOf(uniteOrg.toLowerCase()) === 0 ||
      uniteOrganisationnelle.description.toLowerCase().indexOf(uniteOrg.toLowerCase()) === 0);
  }


  createOrUpdate(): void {
    if (this.mode === 'create') {
      this.createBesoin();
    } else if (this.mode === 'update') {
      this.updateBesoin();
    }
  }


  createBesoin() {   
    this.dialogConfirmationService.confirmationDialog().subscribe({
      next: (action) => {
        if (action === DialogUtil.confirmer) {
          this.besoinService.create(this.besoinFormGroup.value).subscribe({
            next: (response) => {
              this.besoin = response.body;
              this.notificationService.success(NotificationUtil.modification);
            },
            error: (err) => {
              this.notificationService.warn(NotificationUtil.echec);
            },
            complete: () => {
              this.besoinFormGroup.controls['id'].setValue(this.besoin.id);
              this.besoinFormGroup.controls['code'].setValue(this.besoin.code);
              this.isSavedBesoin = true;
            }
          });
        }
      }
    })
  }

  updateBesoin() {   
    this.dialogConfirmationService.confirmationDialog().subscribe({
      next: (action) => {
        if (action === DialogUtil.confirmer) {
          this.besoinService.update(this.besoinFormGroup.value).subscribe({
            next: (response) => {
              this.besoin = response.body;
              this.notificationService.success(NotificationUtil.ajout);
            },
            error: (err) => {
              this.notificationService.warn(NotificationUtil.echec);
            },
            complete: () => {
              this.isSavedBesoin = true;
            }
          });
        }
      }
    })    
  }

  createProspect() {   
    this.dialogConfirmationService.confirmationDialog().subscribe({
      next: (action) => {
        if (action === DialogUtil.confirmer) {
          const prospects = this.prospectFormGroup.controls['partenaires'].value;
          console.log(prospects);
          this.besoin = this.besoinFormGroup.value;
          this.besoin.partenaires = prospects ;
          this.besoinService.update(this.besoin).subscribe({
            next: (response) => {
              this.besoin = response.body;
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

  refreshList(): void{
    // this.dialogRef.close(this.besoin);
    let currentUrl = this._router.url;
    this._router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this._router.navigate([currentUrl]);
        console.log(currentUrl);
    });
  }

  setUniteOrganisationnelle(uniteOrganisationnelle) {
    this.besoinFormGroup?.controls['unite']?.setValue(uniteOrganisationnelle);
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o1 && o2) return o1.id === o2.id;
  }
}
