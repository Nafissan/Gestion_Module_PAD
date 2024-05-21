import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { Compte } from '../../shared/model/compte.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompteService } from '../../shared/services/compte.service';
import { RoleService } from '../../shared/services/role.service';
import { Role } from '../../shared/model/role.model';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { defaults } from 'chart.js';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogConfirmationService } from '../../../../shared/services/dialog-confirmation.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { NotificationUtil } from '../../../../shared/util/util';
@Component({
  selector: 'fury-create-update-compte',
  templateUrl: './create-update-compte.component.html',
  styleUrls: ['./create-update-compte.component.scss']
})
export class CreateUpdateCompteComponent implements OnInit {
  static id = 100;
  compte: Compte;
  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  inputType = 'password';
  visible = false;
  roles: Role[];
  rolesUser: Role[];
  agents: any;
  agent: {}
  // autocomplete select
  stateCtrl: FormControl = new FormControl();
  filteredStates: Observable<any[]>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Compte,
    private dialogRef: MatDialogRef<CreateUpdateCompteComponent>,
    private fb: FormBuilder,
    private compteService: CompteService,
    private cd: ChangeDetectorRef,
    private roleService: RoleService,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService
  ) { }
  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as Compte;
    }
    this.getRoles()
    this.getAgentsWithoutCompte()
    
    this.form = this.fb.group({
      username: [this.defaults.username || '', Validators.required],
      password: [this.defaults.password || '', Validators.required],
      roles: ['', Validators.required],
    });
}
filterStates(name: string) {
return this.agents.filter(agent =>
  agent.matricule.toLowerCase().indexOf(name.toLowerCase()) === 0 ||
  agent.prenom.toLowerCase().indexOf(name.toLowerCase()) === 0 ||
  agent.nom.toLowerCase().indexOf(name.toLowerCase()) === 0);
}

setAgent(agent){
this.agent = agent
}
togglePassword() {
if (this.visible) {
  this.inputType = 'password';
  this.visible = false;
  this.cd.markForCheck();
} else {
  this.inputType = 'text';
  this.visible = true;
  this.cd.markForCheck();
}
}
save() {
if (this.mode === 'create') {
  this.createCompte();
} else if (this.mode === 'update') {
  this.updateCompte();
}
}
createCompte() {
let compte = this.form.value;
compte.agent = this.agent;
this.dialogConfirmationService.confirmationDialog().subscribe(action => {
  if (action === 'CONFIRMER') {
    this.compteService.create(compte).subscribe(
      response => {
        this.notificationService.success(NotificationUtil.ajout);
        this.dialogRef.close(response.body);
      }, (error: HttpErrorResponse) => {
        if(error.status === 500){
          this.notificationService.warn(error.error.message);
        }
      }) 
    }
  })
}
updateCompte() {
let compte: Compte = this.form.value;
compte.id = this.defaults.id
compte.agent = this.defaults.agent;
compte.password = this.defaults.password;
compte.enabled = this.defaults.enabled; 
this.dialogConfirmationService.confirmationDialog().subscribe(action => {
  if (action === 'CONFIRMER') {
    this.compteService.update(compte).subscribe(
      response => {
        this.notificationService.success(NotificationUtil.modification);
        this.dialogRef.close(compte);
      }
    )
  } 
})
}
getRoles() {
this.roleService.getAll().subscribe(
  (response) => {
    this.roles = response.body;
  }, error => {}
  ,() => {
    this.rolesUser = this.roles.filter((role) => this.defaults.roles.find((item)=>role.id == item.id))
    this.form.get('roles').setValue(this.rolesUser) 
  }
);
}
getAgentsWithoutCompte() {
this.compteService.getAgensWithoutCompte().subscribe(
  (response) => {
    this.agents = response.body;
  }, err => {
  }, () => {
    // used by autocomplete in role
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(state => state ? this.filterStates(state) : this.agents.slice())
    );
  }
);
}
isCreateMode() {
return this.mode === 'create';
}
isUpdateMode() {
return this.mode === 'update';
}
}