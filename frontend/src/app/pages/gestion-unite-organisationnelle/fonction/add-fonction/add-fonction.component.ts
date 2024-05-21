import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Fonction } from '../../shared/model/fonction.model'
import { UniteOrganisationnelleService } from '../../shared/services/unite-organisationnelle.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FonctionService } from "../../shared/services/fonction.service";
import { UniteOrganisationnelle } from '../../../../shared/model/unite-organisationelle';

@Component({
  selector: 'fury-add-fonction',
  templateUrl: './add-fonction.component.html',
  styleUrls: ['./add-fonction.component.scss']
})
export class AddFonctionComponent implements OnInit {
  fonction: Fonction;
  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  uniteOrganisationnelle: UniteOrganisationnelle[];
  fonctionsByName: Fonction[];
  uniteOrgSelected: UniteOrganisationnelle[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<AddFonctionComponent>,
    private fb: FormBuilder,
    private fonctionService: FonctionService,
    private uniteOrganisationnelleService: UniteOrganisationnelleService
  ) { }

  ngOnInit() {
    if (this.defaults) {//update

      this.mode = 'update';
      this.uniteOrgSelected=this.defaults.uniteOrganisationnelle

    } else {//Ajout  
      this.defaults = {} as Fonction;
    }

    this.getUniteOrganisationnelle();//On appelle la fonction qui recupere les unités organisationnelle pour les sauvegarder dans le tableau uniteOrganisationnelle de la classe
    
    this.form = this.fb.group({//Initialisation du formulaire
      nom: [this.defaults.nom || '', Validators.required],
      uniteOrganisationnelle: [this.defaults.uniteOrganisationnelle || '', Validators.required],
    });


    /*
    ** * si on est sur le mode update on initialise la select box du formulaire avec les unites qui sont deja dans la fonction a modifier
    */
    if (this.mode=='update'){

        let tab: string[] = []
        if(this.uniteOrgSelected != null ){       
          this.uniteOrgSelected.forEach(unite => {
            tab.push(unite.code)      
          })
        }
        this.form.controls.uniteOrganisationnelle.setValue(tab)
    }

  }
  
  /**
   * fonction qui sauvegarde ou modifie une fonction selon le mode dans lequel on se trouve create | update
   * fait appel aux fonction createFonction() et updateFonction() de cette classe
   */
  save() {
    if (this.mode === 'create'){
      this.createFonction();
    } else if (this.mode === 'update') {
      this.updateFonction();
    }
  }

/**
 * Fonction qui sauvegarde une fonction à partir du formulaire
 * Fait appel au service create() de la classe service fonctionService
 * Et à la fonction getUniteFromTableau() de la classe
 */
  createFonction() {

    let fonctionRecupere = this.form.value; //recupere la fonction à partir du formulaire
    let fonctionToSave = new Fonction();
    fonctionToSave=fonctionRecupere; //juste pour convertir la variable recupere dans le formulaire en objet fonction 

    let tabNewUnite: UniteOrganisationnelle[] = [] 
    let tabNewUnite2: UniteOrganisationnelle[] = []
    tabNewUnite=fonctionToSave.uniteOrganisationnelle; //recupere les unites renseigne dans le formulaire dans un tableau

    /** * Le tableau des unites recupere a partir du formulaire ne contient pas des objets unite mais juste le code des unites
     *  * Dans cette boucle on parcourt le tableau contenant les unites recupéré à partir du formulaire pour recupéré la vraie unité 
     *  * à laquelle elle correspond dans le tableau qui contient toutes les unités qu'on a initié dans ngOnInit()
     *  * On sauvegarde ces unites dans un second tableau qui contiendra cette fois les vraies unités
    */
    tabNewUnite.forEach(unite => {
      unite=this.getUniteFromTableau(String(unite))
      tabNewUnite2.push(unite)
    })

    fonctionToSave.uniteOrganisationnelle=tabNewUnite2 //dans l'objet fonction a enregistrer on affecte à la propriété unité organisationnelle le tableau contenant les vraies unités

   /* let tableauFonctionToSave: Fonction[] = []
       
      uniteOrgRecupere.forEach(unite => {
        let fonctionToSave = new Fonction()
        fonctionToSave.nom=fonctionRecupere.nom   
        fonctionToSave.uniteOrganisationnelle = unite
        tableauFonctionToSave.push(fonctionToSave)

      });
      */



    this.fonctionService.create(fonctionToSave).subscribe( //sauvegarde la fonction à enregistrer en souscrivant a l'observable renvoye par la methode create de la classe fonctionService 
         response => { 
            this.dialogRef.close(response.body);  
         }
    )
  }

/**
 * Fonction qui modifie une fonction renseignée dans le formulaire
 * Fait appel au service update () de la classe service fonctionService
 * Et à la fonction getUniteFromTableau() de la classe
 * Le processus est le même que pour la methode create()
 */
  updateFonction(){
    let fonction = this.form.value;
    fonction.id = this.defaults.id;


    let fonctionToUpdate = new Fonction();
    fonctionToUpdate=fonction;
    
    let tabNewUnite: UniteOrganisationnelle[] = []
    let tabNewUnite2: UniteOrganisationnelle[] = []
    tabNewUnite=fonctionToUpdate.uniteOrganisationnelle

    tabNewUnite.forEach(unite => {
      unite=this.getUniteFromTableau(String(unite))
      tabNewUnite2.push(unite)
    })

    fonctionToUpdate.uniteOrganisationnelle=tabNewUnite2

    this.fonctionService.update(fonction).subscribe(
       response => {
        this.dialogRef.close(fonction);
       }
    )
  }
/**
 * fonction qui renvoit une unite trouve dans le tableau "uniteOrganisationnelle" a partir d'un code d'unité qu'on lui fournit en parametre
 * @param code 
 */
  getUniteFromTableau(code :String) {
    let uniteTrouve : UniteOrganisationnelle
    this.uniteOrganisationnelle.forEach(unite=>{
      if(unite.code==code){
        uniteTrouve=unite
      }
    })
    return uniteTrouve

   /* let i=0
    let vu=false
    while(i!=this.uniteOrganisationnelle.length) || (vu=true ){
    }*/


  }

  /**
   * Recupere les unites organisationnelles de l'application en souscrivant a l'observable renvoye par le methode getAll du service fontion service 
   * Sauvegarde la liste d'unité récupéré dans le tableau uniteOrganisationnelle de cette classe
   */
  getUniteOrganisationnelle() {
    this.uniteOrganisationnelleService.getAll().subscribe(
      (response) => {
        this.uniteOrganisationnelle = response.body;
      }
    );
  }

  /**
   * Recupere qui recupere une fonction a partir de son nom grace a la fonction getByNom du service fonctionService
   */
  getFonctionByNom(nom:string) { 
    this.fonctionService.getByNom(nom).subscribe(
      (response) => {
        this.fonctionsByName = response.body;
      }
    );
  }

/**
 * Verifie si une fonction a deja ete affecté a une unité
 * @param uniteAtester 
 */
  isFonctionExistDansUnite( uniteAtester:UniteOrganisationnelle){
    let exist : Boolean
    exist = false    
    
    this.uniteOrgSelected.forEach(unite => {
      if (unite.code==uniteAtester.code){
        exist==true
      }
    });

    return exist;
  }
  
  /*setUniteOrganisationnelle(uneUniteOrg:UniteOrganisationnelle){
    this.uniteOrgSelected.push(uneUniteOrg)
  }*/

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

}
