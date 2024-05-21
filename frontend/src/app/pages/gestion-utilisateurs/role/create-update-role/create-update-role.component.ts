import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { Role } from '../../shared/model/role.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleService } from '../../shared/services/role.service';
import { Ressource } from '../../shared/model/ressource.model';
import { RessourceService } from '../../shared/services/ressource.service';
import { PrivilegeService } from '../../shared/services/privilege.service';
import { Privilege } from '../../shared/model/privilege.model';
import { NotificationUtil } from '../../../../shared/util/util';
import { DialogConfirmationService } from '../../../../shared/services/dialog-confirmation.service';
import { NotificationService } from '../../../../shared/services/notification.service';
@Component({
  selector: 'fury-create-update-role',
  templateUrl: './create-update-role.component.html',
  styleUrls: ['./create-update-role.component.scss', '../../../../shared/util/bootstrap4.css']
})
export class CreateUpdateRoleComponent implements OnInit {

  static id = 100;
  role: Role = new Role();
  form: FormGroup;
  mode: 'create' | 'update' = 'create';


  ressources: Array<Ressource>;
  permissions: string[] = new Array();
  allComplete: boolean = false;
  checkboxColor = 'primary';
  // using for update
  privileges: Array<Privilege> = new Array();
  privilegesChecked: string[] = new Array();

  
  nomRoleCtrl: FormControl;
  privilegeCtrl: FormControl;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<CreateUpdateRoleComponent>,
    private roleService: RoleService,
    private ressourceService: RessourceService,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService
  ) { 
    
    this.nomRoleCtrl = new FormControl();
    this.privilegeCtrl = new FormControl();
  }

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
      this.role = this.defaults
      this.getAllRessourcesWithPrivilegeChecked()
    } else {
      this.defaults = {} as Role;
      this.getAllRessource()
    }
  }
  getAllRessource() {
    this.ressourceService.getAll()
      .subscribe(response => {
        this.ressources = response.body
        this.ressources.forEach(x => x.privileges.forEach(x => x.checked = false))
      })
  }
  save() {
    if (this.mode === 'create') {
      this.createRole();
    } else if (this.mode === 'update') {
      this.updateRole();
    }
  }
  createRole() {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === 'CONFIRMER') {
        this.roleService.createWithPrivileges(this.role, this.permissions).subscribe(
          response => {
            this.notificationService.success(NotificationUtil.ajout)
            this.dialogRef.close(response.body);
          }
        )
      } 
    })
  }

  updateRole() {
    // role.name = this.defaults.name;
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === 'CONFIRMER') {
        this.roleService.updateWithPrivilege(this.role, this.permissions).subscribe(
          response => {
            this.notificationService.success(NotificationUtil.modification)
            this.dialogRef.close(response.body);
          }
        )} 
    })
  }
  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

  updateCheckbox() {
    this.ressources.forEach(x => x.privileges.filter(x => x.checked === true).map(x => x.nom));
    this.permissions = [];
    for (let r of this.ressources) {
      this.permissions.push(...r.privileges.filter(x => x.checked === true).map(x => x.nom));
    }
  }
  setLine(ressource: Ressource, completed: boolean) {
    // this.allComplete = completed;
    ressource.privileges.forEach(t => t.checked = completed);
    this.ressources.forEach(x => x.privileges.filter(x => x.checked === true).map(x => x.nom));
    this.permissions = [];
    for (let r of this.ressources) {
      this.permissions.push(...r.privileges.filter(x => x.checked === true).map(x => x.nom));
    }
  }
  setAll(completed: boolean) {
    for (let r of this.ressources) {
      r.checked = completed
      r.privileges.forEach(t => t.checked = completed);
      this.permissions.push(...r.privileges.filter(x => x.checked === true).map(x => x.nom));
    }
  }

  getAllRessourcesWithPrivilegeChecked() {
    this.ressourceService.getAll()
      .subscribe(data => {
        this.ressources = data.body
        this.ressources.forEach(x => x.privileges.forEach(x => x.checked = false))
        for (let r of this.ressources) {
          for (let p of r.privileges) {
            for (let puser of this.role.privileges)
              if (p.nom === puser.nom) {
                p.checked = true;
              }
          }
        }
        this.privilegesChecked = [];
        for (let r of this.ressources) {
          this.privilegesChecked.push(...r.privileges.filter(x => x.checked === true).map(x => x.nom));
        }
      })
  }
  fermerDialog() {
    this.dialogRef.close()
  }
}
