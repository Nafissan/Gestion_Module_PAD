import { HttpErrorResponse } from "@angular/common/http";
import { ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { RoleService } from "src/app/pages/gestion-utilisateurs/shared/services/role.service";
import { TypeDotationService } from "src/app/pages/parametrage/shared/service/type-dotation.service";
import { AgentService } from "src/app/shared/services/agent.service";
import { DialogConfirmationService } from "src/app/shared/services/dialog-confirmation.service";
import { NotificationService } from "src/app/shared/services/notification.service";
import { NotificationUtil } from "src/app/shared/util/util";
import { Dotation } from "../../shared/models/dotation.model";
import { DotationService } from "../../shared/services/dotation.service";
import { Agent } from "./../../../../../shared/model/agent.model";
import { TypeDotation } from "./../../shared/models/typedotation.model";

@Component({
  selector: "fury-add-or-update-demande-lait",
  templateUrl: "./add-or-update-demande-lait.component.html",
  styleUrls: ["./add-or-update-demande-lait.component.scss"],
})
export class AddOrUpdateDemandeLaitComponent implements OnInit {
  static id = 100;
  form: FormGroup;
  mode: "create" | "update" = "create";
  visible = false;

  minDateDebut: Date;
  agents: any[];
  agentBeneficiaire: Agent; /** Agent bénéficiaire de la dotation */
  typeDotations: TypeDotation[];

  // autocomplete select
  stateCtrl: FormControl = new FormControl();
  filteredStates: Observable<any[]>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Dotation,
    private dialogRef: MatDialogRef<AddOrUpdateDemandeLaitComponent>,
    private fb: FormBuilder,
    private agentService: AgentService,
    private dotationService: DotationService,
    private typeDotationService: TypeDotationService,
    private cd: ChangeDetectorRef,
    private roleService: RoleService,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService
  ) { }
  ngOnInit() {
    if (this.defaults) {
      this.mode = "update";
      /** remplissage champ beneficiaire */
      this.stateCtrl.setValue(
        this.defaults.beneficiaire.prenom + " " + this.defaults.beneficiaire.nom
      );
    } else {
      this.defaults = {} as Dotation;
    }
    this.getAgents();
    this.getTypeDotations();

    this.form = this.fb.group({
      observation: [this.defaults.observation || "", Validators.required],
      typeDotation: [this.defaults.typeDotation || "", Validators.required],
      dateDebut: new FormControl(
        { value: new Date(this.defaults.dateDebut), disabled: false },
        [Validators.required]
      ),
      dateFin: new FormControl(
        { value: new Date(this.defaults.dateFin) || "", disabled: false },
        [Validators.required]
      ),

      enfantFormGroup: this.fb.group({
        enfants: this.fb.array([]),
      }),

      // enfants: this.fb.array([]),

      conjoint: this.fb.group({
        prenom: [
          (this.defaults?.conjoint?.prenom) || "",
          Validators.required,
        ],
        nom: [
          (this.defaults?.conjoint?.nom) || "",
          Validators.required,
        ],
        sexe: [
          (this.defaults?.conjoint?.sexe) || "",
          Validators.required,
        ],
        estPortuaire: [
          (this.defaults?.conjoint?.estPortuaire) || false,
          Validators.required,
        ],
      }),
    });

    if (this.isUpdateMode()) {
      /**
       * Remplissage de la liste des enfants inscrits dans la demande de dotation
       */
      const enfantFormGroups = [];

      if (this.defaults.enfants.length > 0) {
        this.defaults.enfants.forEach((enf) => {
          enfantFormGroups.push(
            this.fb.group({
              id: [enf.id || ""],
              prenom: [enf.prenom || "", Validators.required],
              nom: [enf.nom || "", Validators.required],
              sexe: [enf.sexe || "", Validators.required],
              dateNaissance: [new Date(enf.dateNaissance) || "", Validators.required],
              
              numeroExtrait: [enf.numeroExtrait || "", Validators.required],
            })
          );
        });
      }

      enfantFormGroups.forEach((enfantFormGrp) => {
        (this.form.get('enfantFormGroup').get('enfants') as FormArray).push(enfantFormGrp);
      });
    }
  }

  addEnfantField(): void {
    // Create an empty email form group
    const enfantFormGroup = this.fb.group({
      prenom: ["", Validators.required],
      nom: ["", Validators.required],
      sexe: ["", Validators.required],
      dateNaissance: ["", Validators.required],
      numeroExtrait: ["", Validators.required],
    });

    // Add the email form group to the emails form array
    // (this.form.get("enfants") as FormArray).push(enfantFormGroup);
    (this.form.get('enfantFormGroup').get('enfants') as FormArray).push(enfantFormGroup);/**controle sur la saisi des enfants 6 juillet 2022 */
  }
  removeEnfantField(index: number): void {
    // Get form array for emails
    // const enfantFormArray = this.form.get("enfants") as FormArray;
    const enfantFormArray =    this.form.get('enfantFormGroup').get('enfants') as FormArray;/**controle sur la saisi des enfants 6 juillet 2022 */

    // Remove the email field
    enfantFormArray.removeAt(index);
  }

  setAgent(agent) {
    this.agentBeneficiaire = agent;
  }

  onDateChange(e) {
    this.minDateDebut = new Date(this.form.value.dateDebut);

    const calculMois =   this.minDateDebut.getMonth()+18;

    let dateFin = this.minDateDebut;
    dateFin.setMonth(calculMois);

    this.form.get('dateFin').setValue(new Date(dateFin));
    this.form.value.dateFin = new Date(
      new Date(this.minDateDebut).getFullYear(),
      11,
      31
    );
  }

  save() {
    if (this.mode === "create") {
      this.createDemandeDotation();
    } else if (this.mode === "update") {
      this.updateDemandeDotation();
    }
  }

  createDemandeDotation() {
    let dotation: Dotation = this.form.value;
    dotation.beneficiaire = this.agentBeneficiaire;
    dotation.type = "LAIT";
    // dotation.nbreEnfant = this.form.value.enfantFormGroup.enfants.length;
    // dotation.nbreEnfant = this.form.value.get('enfantFormGroup').get('enfants').length
    dotation.enfants = this.form.value.enfantFormGroup.enfants;
    dotation.nbreEnfant = (this.form.get('enfantFormGroup').get('enfants') as FormArray).length
    // console.log("objet dotation => ", dotation);
    this.dialogConfirmationService.confirmationDialog().subscribe((action) => {
      if (action === "CONFIRMER") {
        this.dotationService.create(dotation).subscribe(
          (response) => {
            this.notificationService.success(NotificationUtil.ajout);
            this.dialogRef.close(response.body);
            
          },
          (error: HttpErrorResponse) => {
            if (error.status === 500) {
              this.notificationService.warn(error.error.message);
              this.notificationService.warn('Ajout Echoué le numéro extrait doit être unique');
            }
          }
        );
      }
    });
  }
  updateDemandeDotation() {
    let dotation: Dotation = this.defaults;
    dotation = Object.assign(dotation, this.form.value);
    dotation.beneficiaire =
      this.agentBeneficiaire || this.defaults.beneficiaire;
      dotation.enfants = this.form.value.enfantFormGroup.enfants;
    // dotation.nbreEnfant = this.form.value.enfantFormGroup.enfants.length;
    dotation.nbreEnfant = (this.form.get('enfantFormGroup').get('enfants') as FormArray).length
    console.log("objet dotation to update => ", dotation);
    this.dialogConfirmationService.confirmationDialog().subscribe((action) => {
      if (action === "CONFIRMER") {
        this.dotationService.update(dotation).subscribe(
          (response) => {
            this.notificationService.success(NotificationUtil.modification);
            this.dialogRef.close(response.body);
          },
          (error: HttpErrorResponse) => {
            if (error.status === 500) {
              // this.notificationService.warn(error.error.message);
              this.notificationService.warn('Modification Echouée le numéro extrait doit être unique');
            }
          }
        );
      }
    });
  }
  getAgents() {
    this.agentService.getAll().subscribe(
      (response) => {
        this.agents = response.body;
      },
      (err) => { },
      () => {
        // used by autocomplete in agent
        this.filteredStates = this.stateCtrl.valueChanges.pipe(
          startWith(""),
          map((state) =>
            state ? this.filterStates(state) : this.agents.slice()
          )
        );
      }
    );
  }
  getTypeDotations() {
    this.typeDotationService.getAll().subscribe(
      (response) => {
        this.typeDotations = response.body;
      },
      (error) => { }
    );
  }
  
  filterStates(name: string) {
    return this.agents.filter(
      (agent) =>
        agent.matricule.toLowerCase().indexOf(name.toLowerCase()) === 0 ||
        agent.prenom.toLowerCase().indexOf(name.toLowerCase()) === 0 ||
        agent.nom.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
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
