import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Compte } from 'src/app/pages/gestion-utilisateurs/shared/model/compte.model';
import { CompteService } from 'src/app/pages/gestion-utilisateurs/shared/services/compte.service';
import { Domaine } from 'src/app/pages/parametrage/shared/model/domaine.model';
import { TypePartenariat } from 'src/app/pages/parametrage/shared/model/type-partenariat.model';
import { DomaineService } from 'src/app/pages/parametrage/shared/service/domaine.service';
import { TypePartenariatService } from 'src/app/pages/parametrage/shared/service/type-partenariat.service';
import { Agent } from 'src/app/shared/model/agent.model';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogUtil, NotificationUtil } from 'src/app/shared/util/util';
import { AddOrUpdatePartenariatComponent } from '../../partenariat/add-or-update-partenariat/add-or-update-partenariat.component';
import { Convention } from '../../shared/model/convention.model';
import { Partenaire } from '../../shared/model/partenaire.model';
import { ConventionService } from '../../shared/service/convention.service';
import { PartenaireService } from '../../shared/service/partenaire.service';

@Component({
  selector: 'fury-add-or-update-convention',
  templateUrl: './add-or-update-convention.component.html',
  styleUrls: ['./add-or-update-convention.component.scss']
})
export class AddOrUpdateConventionComponent implements OnInit {

  username: string;
  compte: Compte;
  agent: Agent;
  convention: Convention;
  //
  typePartenariats: TypePartenariat[];
  typePartenariat: TypePartenariat;
  typepartenaireFctr: FormControl;
  filteredTypePartenariat: Observable<TypePartenariat[]>;
  //
  form: FormGroup;
  //

  
  partenaires: Partenaire[];
  domaines: Domaine[];
  mode: "create" | "update" = "create";

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Convention,
    private dialogRef: MatDialogRef<AddOrUpdatePartenariatComponent>,
    private fb: FormBuilder,
    private conventionService: ConventionService,
    private partenaireService: PartenaireService,
    private domaineService: DomaineService,
    private typePartenaireService: TypePartenariatService,
    private authService: AuthenticationService,
    private compteService: CompteService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.username = this.authService.getUsername();
    this.typepartenaireFctr = new FormControl();
    this.getAllTypePartenariat();
    this.getAllPartenaire();
    this.getAllDomaine();

    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
    });

    if (this.defaults) {
      this.mode = "update";
      this.convention = this.defaults;

      if (this.defaults.type) {
        this.typepartenaireFctr.setValue(this.defaults.type.libelle);
        this.typePartenariat = this.defaults.type;
      }

    } else {
      this.defaults = {} as Convention;
    }
    
    // FormGroup
    this.form = this.fb.group({
      libelle: new FormControl(this.defaults.libelle || "", [Validators.required,]),
      code: new FormControl(this.defaults.code ),
      dateSignature: [new Date(this.defaults.dateSignature) || '', Validators.required],
      dateFin: [new Date(this.defaults.dateFin) || '', Validators.required],
      active: new FormControl(this.defaults.active || false, [Validators.required,]),
      partenaires: new FormControl(this.defaults.partenaires || "", [Validators.required,]),
      statut: new FormControl(this.defaults.statut?.toString()|| "1", [Validators.required,]),
      domaines: new FormControl(this.defaults.domaines || "", [Validators.required,]),
      // type: new FormControl(this.defaults.type || "", [Validators.required,]),
    });
  }

  save() {
    if (this.mode === "create") {
      this.createConvention();
    } else if (this.mode === "update") {
      this.updateConvention();
    }
  }
  getAllPartenaire() {
    this.partenaireService.getAll()
      .subscribe(response => {
        this.partenaires = response.body;
      },
        (err) => { },
        () => {
      });
  }
  getAllDomaine() {
    this.domaineService.getAll()
      .subscribe(response => {
        this.domaines = response.body;
      },
        (err) => { },
        () => {
      });
  }
  getAllTypePartenariat() {
    this.typePartenaireService.getAll()
      .subscribe(response => {
        this.typePartenariats = response.body;
      },
        (err) => { },
        () => {
          // Autocomplete
          this.filteredTypePartenariat = this.typepartenaireFctr.valueChanges.pipe(
            startWith(""),
            map((typePartenariat) =>
              typePartenariat ? this.filterStates(typePartenariat) : this.typePartenariats.slice()
            )
          );
        });
  }
  filterStates(matricule: string) {
    return this.typePartenariats.filter(
      (typePartenariat) =>
        typePartenariat.libelle.toLowerCase().indexOf(matricule.toLowerCase()) === 0 
        
    );
  }
  setTypePartenariat(typePartenariat: TypePartenariat){
    this.typePartenariat = typePartenariat;
  }
  createConvention() {
    let convention: Convention = this.form.value;
    convention.type = this.typePartenariat;
    console.log(convention);
    

    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.conventionService.create(convention).subscribe((response) => {
          this.notificationService.success(NotificationUtil.ajout);
          console.log("response", response);
          
          this.dialogRef.close(response.body);
        }, err => {
          this.notificationService.warn(NotificationUtil.echec);
        },
          () => { });
      } else {
        this.dialogRef.close();
      }
    })

  };

  updateConvention() {
    let convention: Convention = this.form.value;
    convention.id = this.defaults.id;
    convention.type = this.typePartenariat;
    convention.dateSignature = new Date(this.form.value.dateSignature);
    convention.dateFin = new Date(this.form.value.dateFin);
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.conventionService.update(convention).subscribe((response) => {
          this.notificationService.success(NotificationUtil.modification);
          this.dialogRef.close(convention);
        }, err => {
          this.notificationService.warn(NotificationUtil.echec);
        },
          () => { })
      } else {
        this.dialogRef.close();
      }
    })
  }
  isCreateMode() {
    return this.mode === "create";
  }

  isUpdateMode() {
    return this.mode === "update";
  }
  compareObjects(o1: any, o2: any): boolean {
    if (o1 && o2) return o1.id === o2.id;
  }

}
