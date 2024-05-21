import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, Input} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { ReplaySubject } from 'rxjs';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  image?:string;
 
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
   {
    name: 'Gestion Interim',
    children: [
      {
        name: 'Interim',
        children: [
          {name: 'Ajout Interim',image:'interim/addinterim.JPG'},
          {name: 'Action interim',image:'interim/actinterim.JPG'},
        ]
      }, {
        name: 'Suivi interim',
        image:'interim/suiviinterim.JPG'
        
      },
    ]
  },
  {
    name: 'gestion attestation',
    children: [
      {
        name: 'Demande attestation',
        children: [
          {name: 'Ajout attestation',image:'/'},
          {name: 'Action Demande attestation'},
        ]
      }, {
        name: 'suivi attestation',
        
      },
    ]
  },
  {
    name: 'espace Agent',
    children: [
      {
        name: 'Acces ',image:'client/espaceclient.JPG'
       
      },
      {
        name:'Mes Absence',image:'client/mesabsence.JPG'
      },
      

      {
        name: 'Mes Congés',image:'client/conge.JPG'
        
      },
      {
        name:'Mes Intérims',image:'/client/interime.JPG'
      }
      ,
     
      {
        name:'Mes Attestation',image:'/client/attestation.JPG'
      }
     
     

    ]
  },
  {
    name: 'Gestion Conge',
    children: [
      {
        name: 'Planification',
        children: [
          {
            name: 'Dossier Congé',
            children:[
              {name:'Ajouter dossier congé',image:'congenew/addconge.JPG'},
              {name:'Action dossier conge',image:'congenew/actdossierconge.JPG'}
            ]
            
          },
          {
            name: 'Planning conge',
            children:[
              {name:'Ajouter Planning',image:'congenew/planningcongeadd.JPG'},
              {name:'Action planning direction',image:'congenew/actplanning.JPG'}
            ]
            
          },
          {
            name: 'conge',
            children:[
              {
                name:'Ajouter Congé',image:'congenew/addcongee.JPG'
              
             },
             {name:'Action congé',image:'congenew/actionconge.JPG'}
            ]
          },
        ]
      }, {
        name: 'Suivi conge',
        children:[
          {
            name:'Suivi Congé',image:'congenew/suiconge.JPG'
          },
          {
            name:'Valider Congé',image:'congenew/valideconge.JPG'
          },
          {
            name:'Envoi planning',image:'congenew/valideplanning.JPG'
          }
        ]
        
      },
    ]
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'fury-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})
export class GuideComponent{
  
  TREE_DATA: FoodNode[] = [
    {
     name: 'Gestion Interim',
     children: [
       {
         name: 'Interim',
         children: [
           {name: 'Ajout Interim',image:'interim/addinterim.JPG'},
           {name: 'Bouton d’action interim',image:'interim/actinterim.JPG'},
         ]
       }, {
         name: 'Suivi interim',
         image:'interim/suiviinterim.JPG'
         
       },
     ]
   },
   {
     name: 'gestion attestation',
     children: [
       {
         name: 'Demande attestation',
         children: [
           {name: 'Ajout attestation',image:'/'},
           {name: 'Bouton d’action Demande attestation'},
         ]
       }, {
         name: 'suivi attestation',
         
       },
     ]
   },
   {
     name: 'espace Agent',
     children: [
       {
         name: 'Acces ',image:'client/espaceclient.JPG'
        
       },
       {
         name:'Mes Absence',image:'client/mesabsence.JPG'
       },
       
 
       {
         name: 'Mes Congés',image:'client/conge.JPG'
         
       },
       {
         name:'Mes Intérims',image:'/client/interime.JPG'
       }
       ,
      
       {
         name:'Mes Attestation',image:'/client/attestation.JPG'
       }
      
      
 
     ]
   },
   {
     name: 'Gestion Conge',
     children: [
       {
         name: 'Planification',
         children: [
           {
             name: 'Dossier Congé',
             children:[
               {name:'Ajouter dossier congé',image:'congenew/addconge.JPG'},
               {name:'Action dossier conge',image:'congenew/actdossierconge.JPG'}
             ]
             
           },
           {
             name: 'Planning conge',
             children:[
               {name:'Ajouter Planning',image:'congenew/planningcongeadd.JPG'},
               {name:'bouton d’Action planning direction',image:'congenew/actplanning.JPG'}
             ]
             
           },
           {
             name: 'conge',
             children:[
               {
                 name:'Ajouter Congé',image:'congenew/addcongee.JPG'
               
              },
              {name:'Bouton d’Action congé',image:'congenew/actionconge.JPG'}
             ]
           },
         ]
       }, {
         name: 'Suivi conge',
         children:[
           {
             name:'Suivi Congé',image:'congenew/suiconge.JPG'
           },
           {
             name:'Valider Congé',image:'congenew/valideconge.JPG'
           },
           {
             name:'Envoi planning',image:'congenew/valideplanning.JPG'
           }
         ]
         
       },
     ]
   },
 ];
  searche:string
  image:string
  verifie:boolean=false
  subject$: ReplaySubject<FoodNode[]> = new ReplaySubject<FoodNode[]>(
    1
  );
    private _transformer = (node: FoodNode, level: number) => {
  return {
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
    image:node.image,
    level: level,

  };
}

treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

constructor() {
  this.dataSource.data =this.TREE_DATA;
  this.image=this.dataSource.data[0].children[0].children[0].image;
 
}

hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
onguide(imagee:string){
 
  this.image=imagee
  this.verifie=true
}
onFilterChange(value) {
  if (!this.dataSource) {
    return;
  }
  value = value.trim();
  value = value.toLowerCase();
  this.TREE_DATA.filter = value;
  }
  onsearche(){
  
    this.dataSource.data =this.TREE_DATA
  .filter((column) => column.name.toLowerCase().includes(this.searche.toLowerCase()))
  this.image=this.dataSource.data[0].image
  if(this.image=''){
    this.image=this.dataSource.data[0].children[0].image
  }
  else{
    this.image=this.dataSource.data[0].children[0].children[0].image
  }

 

  }
}


/**  Copyright 2020 Google LLC. All Rights Reserved.
  Use of this source code is governed by an MIT-style license that
  can be found in the LICENSE file at http://angular.io/license */