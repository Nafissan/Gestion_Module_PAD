import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Compte } from 'src/app/pages/gestion-utilisateurs/shared/model/compte.model';
import { CompteService } from 'src/app/pages/gestion-utilisateurs/shared/services/compte.service';
import { Zone } from 'src/app/pages/parametrage/shared/model/zone.model';
import { ZoneService } from 'src/app/pages/parametrage/shared/service/zone.service';
import { Agent } from 'src/app/shared/model/agent.model';
import { Ville } from 'src/app/shared/model/ville.model';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { VilleService } from 'src/app/shared/services/ville.service';
import { DialogUtil, NotificationUtil } from 'src/app/shared/util/util';
import { Partenaire } from '../../shared/model/partenaire.model';
import { PartenaireService } from '../../shared/service/partenaire.service';

@Component({
  selector: 'fury-add-or-update-partenariat',
  templateUrl: './add-or-update-partenariat.component.html',
  styleUrls: ['./add-or-update-partenariat.component.scss', '../../../../shared/util/bootstrap4.css']
})
export class AddOrUpdatePartenariatComponent implements OnInit {

  username: string;
  compte: Compte;
  agent: Agent;
  partenaire: Partenaire;
  filteredVilles: Observable<any[]>;
  filteredZones: Observable<any[]>;
  villes: Ville[];
  zones: Zone[];
  ville: Ville;
  zone: Zone;
  form: FormGroup;
  villeFctr: FormControl = new FormControl();
  zoneFctr: FormControl = new FormControl();;
  mode: "create" | "update" = "create";

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Partenaire,
    private dialogRef: MatDialogRef<AddOrUpdatePartenariatComponent>,
    private fb: FormBuilder,
    private partenaireService: PartenaireService,
    private villeService: VilleService,
    private zoneService: ZoneService,
    private authService: AuthenticationService,
    private compteService: CompteService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.username = this.authService.getUsername();
    this.getAllVille();
    this.getAllZone();

    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
    });

    if (this.defaults) {
      this.mode = "update";
      this.partenaire = this.defaults;

      this.villeFctr.setValue(this.defaults?.ville?.nom);

      this.zoneFctr.setValue(this.defaults?.zone?.nom);
      this.zone = this.defaults.zone;
      this.ville = this.defaults.ville;

    } else {
      this.defaults = {} as Partenaire;
    }


    // FormGroup
    this.form = this.fb.group({
      nom: new FormControl(this.defaults.nom || "", [Validators.required,]),
      email: new FormControl(this.defaults.email || "", [Validators.required]),
      code: new FormControl(this.defaults.code),
      telephone: new FormControl(this.defaults.telephone || "", [Validators.required,]),
      adresse: new FormControl(this.defaults.adresse || "", [Validators.required,]),
      fax: new FormControl(this.defaults.fax || ""),
      dateApprobation: new FormControl(this.defaults.dateApprobation || null),
      siteWeb: new FormControl(this.defaults.siteWeb || "", [Validators.required,]),
      representantPrenom: new FormControl(this.defaults.representantPrenom || "", [Validators.required,]),
      representantNom: new FormControl(this.defaults.representantNom || "", [Validators.required,]),
      representantEmail: new FormControl(this.defaults.representantEmail || "", [Validators.required,]),
      representantTelephone: new FormControl(this.defaults.representantTelephone || "", [Validators.required,]),
      latitude: new FormControl(this.defaults.latitude || "", [Validators.required,]),
      longitude: new FormControl(this.defaults.longitude || "", [Validators.required,]),
      statut: new FormControl(this.defaults.statut || 0, [Validators.required,]),
      active: new FormControl(this.defaults.active),
      partenaire: new FormControl(this.defaults.partenaire),
    });
  }
  getAllVille() {
    this.villeService.getAll()
      .subscribe(response => {
        this.villes = response.body;
      },
        (err) => { },
        () => {
          // Autocomplete
          this.filteredVilles = this.villeFctr.valueChanges.pipe(
            startWith(""),
            map((ville) =>
              ville ? this.filterStates(ville) : this.villes.slice()
            )
          );
        });
  }
  getAllZone() {
    this.zoneService.getAll()
      .subscribe(response => {
        this.zones = response.body;
      },
        (err) => { },
        () => {
          // Autocomplete
          this.filteredZones = this.zoneFctr.valueChanges.pipe(
            startWith(""),
            map((zone) =>
              zone ? this.filterState(zone) : this.zones.slice()
            )
          );
        });
  }
  filterStates(matricule: string) {
    return this.villes.filter(
      (ville) =>
        ville.nom.toLowerCase().indexOf(matricule.toLowerCase()) === 0 ||
        ville.code.toLowerCase().indexOf(matricule.toLowerCase()) === 0
    );
  }
  setVille(ville) {
    this.ville = ville;
  }
  filterState(matricule: string) {
    return this.zones.filter(
      (zone) =>
        zone.nom.toLowerCase().indexOf(matricule.toLowerCase()) === 0 ||
        zone.code.toLowerCase().indexOf(matricule.toLowerCase()) === 0
    );
  }
  setZone(zone) {
    this.zone = zone;
  }
  save() {
    if (this.mode === "create") {
      this.createPartenaire();
    } else if (this.mode === "update") {
      this.updatePartenaire();
    }
  }
  createPartenaire() {
    let partenaire: Partenaire = this.form.value;
    partenaire.ville = this.ville;
    partenaire.zone = this.zone;
    console.log(partenaire);
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.partenaireService.create(partenaire).subscribe((response) => {
          this.notificationService.success(NotificationUtil.ajout);
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

  updatePartenaire() {
    let partenaire: Partenaire = this.form.value;
    partenaire.id = this.partenaire.id;
    partenaire.ville = this.ville;
    partenaire.zone = this.zone;

    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.partenaireService.update(partenaire).subscribe((response) => {
          this.notificationService.success(NotificationUtil.modification);
          this.dialogRef.close(partenaire);
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
}
