import { Component, OnInit, Inject } from '@angular/core';
import { UniteOrganisationnelleService } from '../../shared/services/unite-organisationnelle.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NiveauHierarchique } from '../../shared/model/niveau-hierarchique.model';
import { UniteOrganisationnelle } from '../../../../shared/model/unite-organisationelle';
import { NiveauHierarchiqueService } from '../../shared/services/niveau-hierarchique.service';

@Component({
  selector: 'fury-add-unite-organisationnelle',
  templateUrl: './add-unite-organisationnelle.component.html',
  styleUrls: ['./add-unite-organisationnelle.component.scss']
})
export class AddUniteOrganisationnelleComponent implements OnInit {
  uniteOrganisationnelle: UniteOrganisationnelle;
  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  uniteOrganisationnelles: UniteOrganisationnelle[];
  uniteOrgSelected: {};
  niveauxHierarchiques: NiveauHierarchique[];
  niveauHierSelected: {};
  id = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<AddUniteOrganisationnelleComponent>,
    private fb: FormBuilder,
    private uniteOrganisationnelleService: UniteOrganisationnelleService,
    private niveauHierarchiqueService: NiveauHierarchiqueService
  ) { }

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as UniteOrganisationnelle;
    }
    this.getNiveauxHierarchiques();
    this.getUniteOrganisationnelles();
    this.form = this.fb.group({
      nom:[this.defaults.nom || '', Validators.required],
      code:[this.defaults.code || '',Validators.required],
      description:[ this.defaults.description || '', Validators.required],
      uniteSuperieure:[this.defaults.uniteSuperieure || '',Validators.required],
      niveauHierarchique:[this.defaults.niveauHierarchique || '',Validators.required]
      });
  }

  save() {
    if (this.mode === 'create') {
      this.createUniteOrganisationnelle();
    } else if (this.mode === 'update') {
      this.updateUniteOrganisationnelle();
    }
  }
  getNiveauxHierarchiques(){
    this.niveauHierarchiqueService.getAll().subscribe(
      (response) => {
        this.niveauxHierarchiques = response.body
      }
    )
    
  }
  getUniteOrganisationnelles() {
    this.uniteOrganisationnelleService.getAll().subscribe(
      (response) => {
        this.uniteOrganisationnelles = response.body;
      }
    );
  }
  createUniteOrganisationnelle() {
    let uniteOrganisationnelle = this.form.value;
    uniteOrganisationnelle.id =this.id;
    uniteOrganisationnelle.niveauHierarchique = this.niveauHierSelected;
    uniteOrganisationnelle.uniteSuperieure = this.uniteOrgSelected;
    
    this.uniteOrganisationnelleService.create(uniteOrganisationnelle).subscribe(
         response => {      
          this.dialogRef.close(response.body);
         }
    )
  }

  updateUniteOrganisationnelle() {
    let uniteOrganisationnelle = this.form.value;
    uniteOrganisationnelle.id = this.defaults.id;
    /*uniteOrganisationnelle.code = this.defaults.code;
    uniteOrganisationnelle.description = this.defaults.description;
    uniteOrganisationnelle.nom= this.defaults.nom;*/
    uniteOrganisationnelle.uniteSuperieure = this.uniteOrgSelected;
    uniteOrganisationnelle.niveauHierarchique = this.niveauHierSelected;
    
    this.uniteOrganisationnelleService.update(uniteOrganisationnelle).subscribe(
       response => {
        this.dialogRef.close(uniteOrganisationnelle);
       }
    )
  }
  setNiveauHierarchique(unNiveauHier){
    this.niveauHierSelected = unNiveauHier
    
  }
  setUniteOrganisationnelle(uneUniteOrg){
    this.uniteOrgSelected = uneUniteOrg
  }
  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

}
