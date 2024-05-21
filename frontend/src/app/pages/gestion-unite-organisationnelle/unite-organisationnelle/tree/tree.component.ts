import { Component, OnInit, ViewChild } from '@angular/core';
import { fadeInRightAnimation } from '../../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../../../@fury/animations/fade-in-up.animation';
import { UniteOrganisationnelleService } from '../../shared/services/unite-organisationnelle.service';
import { UniteOrganisationnelle } from '../../../../shared/model/unite-organisationelle';
import { EditSettingsModel, ToolbarItems, TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { DialogEditEventArgs, SaveEventArgs, RowSelectEventArgs} from '@syncfusion/ej2-angular-grids';
import { NiveauHierarchique } from '../../shared/model/niveau-hierarchique.model';
import { NiveauHierarchiqueService } from '../../shared/services/niveau-hierarchique.service';
import { DataUtil } from '@syncfusion/ej2-data';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import {ExcelExportProperties} from '@syncfusion/ej2-grids'

@Component({
  selector: 'fury-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class TreeComponent implements OnInit {
  data: Object[] = [];
  pageSetting: Object;
  toolbarOptions: ToolbarItems[];
  editSettings: EditSettingsModel;
  public treeForm: FormGroup;
  public submitClicked: boolean = false;
  rowSelectedSup: Object;
  niveauHierarchiques: NiveauHierarchique[];
  show: string = 'add';
  public superieuresDistinct: Object;
  superieures: FormControl;
  uniteOrganisationnelles: UniteOrganisationnelle[];
  @ViewChild('treegrid',{static:false})
  public treegrid: TreeGridComponent;
  
  constructor(private uniteService: UniteOrganisationnelleService,
              private uniteOrganisationnelleService: UniteOrganisationnelleService,
              private niveauHierarchiqueService: NiveauHierarchiqueService) { }

  ngOnInit(): void {
    this.getAllInferieures();
    this.pageSetting = { pageCount: 8 };
    this.toolbarOptions = ['Search', 'Add', 'Edit', 'Delete','ExcelExport'];   
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true , mode: 'Dialog' , newRowPosition: 'Below'}; 
    this.getNiveauHierarchiques()
    this.superieures = new FormControl();
  }
  getAllInferieures(){
    this.uniteService.getAll().subscribe(
      response => {
        this.uniteOrganisationnelles = response.body
      }, err => {

      }, () => {
        this.data = this.formatdata(this.uniteOrganisationnelles, undefined)
        this.superieuresDistinct = DataUtil.distinct(this.uniteOrganisationnelles,'description', true);
      }
    )
  }
/**
 * 
 * @param data 
 * @param root 
 */
  formatdata(data, root){
    let t = {};
    data.forEach( element => {
      Object.assign(t[element.id] = t[element.id] || {}, element);
      if(element.uniteSuperieure === null){
        element.uniteSuperieure = new UniteOrganisationnelle(element.uniteSuperieure);
        element.uniteSuperieure.id = undefined
      }
      t[element.uniteSuperieure.id] = t[element.uniteSuperieure.id] || {}; 
      t[element.uniteSuperieure.id].uniteInferieurs = t[element.uniteSuperieure.id].uniteInferieurs || []; 
      t[element.uniteSuperieure.id].uniteInferieurs.push(t[element.id]);
    });
    return t[root].uniteInferieurs;
  }
  createFormGroup(data: ITreeModel): FormGroup {
    return new FormGroup({
      id: new FormControl({value: data.id, disabled: true}),
      code: new FormControl(data.code, Validators.required),
      description: new FormControl(data.description),
      superieure: new FormControl(data.uniteSuperieure),
    });
}


rowSelected(args:RowSelectEventArgs){ 
  this.rowSelectedSup = args.data;
}

actionBegin(args: SaveEventArgs): void {
  
  if (args.requestType === 'beginEdit') {
      this.show = 'edit';
      this.submitClicked = false;
      
      this.treeForm = this.createFormGroup(args.rowData);
  }
  else if (args.requestType === 'add') {
      this.show = 'add';
      this.submitClicked = false;
      this.treeForm = this.createFormGroup(args.rowData); 
  }
  if (args.requestType === 'save') {    
      this.submitClicked = true;
      if (this.treeForm.valid) {

          let unite: UniteOrganisationnelle = new UniteOrganisationnelle(this.treeForm.value);
          unite.code = this.treeForm.value.code;
          unite.id = 0;
          unite.description = this.treeForm.value.description;
          unite.uniteSuperieure = new UniteOrganisationnelle(this.rowSelectedSup);
          let niveauInferieur: NiveauHierarchique = this.getNiveauInferieur( unite.uniteSuperieure.niveauHierarchique)
          if(niveauInferieur === undefined){
            unite.niveauHierarchique = unite.uniteSuperieure.niveauHierarchique
          }else {
            unite.niveauHierarchique = niveauInferieur;
          }          
          this.createUniteOrganisationnelle(unite);
      } else {
          args.cancel = true;
      }
  }
}

actionComplete(args: DialogEditEventArgs): void {
  if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
      // Set initial Focus
      if (args.requestType === 'beginEdit') {
          (args.form.elements.namedItem('id') as HTMLInputElement).focus();
      } else if (args.requestType === 'add') {
          (args.form.elements.namedItem('id') as HTMLInputElement).focus();
      }
  }
}
get id(): AbstractControl  { return this.treeForm.get('id'); }
get code(): AbstractControl  { return this.treeForm.get('code'); }
get description(): AbstractControl  { return this.treeForm.get('description'); }
get nom(): AbstractControl  { return this.treeForm.get('nom'); }

  createUniteOrganisationnelle(uniteOrganisationnelle: UniteOrganisationnelle) {
    this.uniteOrganisationnelleService.create(uniteOrganisationnelle).subscribe(
        response => {  
          this.uniteOrganisationnelles.push(response.body);    
        }, err => {  }, 
        () => { 
          this.data = this.formatdata(this.uniteOrganisationnelles, undefined); 
          }
      )
  }
  
  getNiveauHierarchiques() {
    this.niveauHierarchiqueService.getAll().subscribe(
      response => {  
        this.niveauHierarchiques = response.body;
        
      }, err => {  }
    )
  }
  public toolbarClick(args: ClickEventArgs):void{
   switch (args.item.text){
     case 'Excel Export':
       let excelProperties : ExcelExportProperties = {
         fileName: 'Liste UniteOrganisationnelles.xlsx'
       };
       this.treegrid.excelExport(excelProperties);
       break;
   }

  }
  getNiveauInferieur(niveauCourant: NiveauHierarchique): NiveauHierarchique{
    let position = niveauCourant.position;
    return this.niveauHierarchiques.find(el => el.position == position + 1)
  }
}

export interface ITreeModel {
  id?: number;
  code?: string;
  description?: string;
  nom?: string;
  uniteSuperieure?: UniteOrganisationnelle;
  niveauHierarchique?: NiveauHierarchique;
  parentItem?:any;
}
