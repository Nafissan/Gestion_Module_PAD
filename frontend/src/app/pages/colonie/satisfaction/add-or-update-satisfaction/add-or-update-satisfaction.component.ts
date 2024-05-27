import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SatisfactionService } from '../../shared/service/satisfaction.service';
import { Satisfaction } from '../../shared/model/satisfaction.model';
import { CompteService } from 'src/app/pages/gestion-utilisateurs/shared/services/compte.service';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
@Component({
  selector: 'fury-satisfaction-form',
  templateUrl: './add-or-update-satisfaction.component.html',
  styleUrls: ['./add-or-update-satisfaction.component.scss', "../../../../shared/util/bootstrap4.css"],
})
export class AddOrUpdateSatisfactionComponent implements OnInit {
  form: FormGroup;
  satisfaction: Satisfaction;
  agentConnecte: any;
  questions: string[] = [
    'question1',
    'question2',
    'question3',
    'question4',
    'question5'
  ];
  constructor(
    private fb: FormBuilder,
    private satisfactionService: SatisfactionService,
    private authService: AuthenticationService,
    private compteService: CompteService,
    private dialogRef: MatDialogRef<AddOrUpdateSatisfactionComponent>
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      questions: [this.questions, Validators.required],
      reponses: this.fb.group({}), // Créez un groupe de contrôles pour les réponses
      dateCreation: [{ value: null, disabled: true }],
      traitePar: [null, Validators.required],
      code: [null, Validators.required]  ,
      commentaire: [null] 
     });
      this.getAgentConnecte();

    if (this.satisfaction) {
      this.form.patchValue(this.satisfaction);
    }
  }

  isCreateMode(): boolean {
    return !this.satisfaction || !this.satisfaction.id;
  }

  isUpdateMode(): boolean {
    return !!this.satisfaction && !!this.satisfaction.id;
  }
  getAgentConnecte(): void {
    const username = this.authService.getUsername();
    this.compteService.getByUsername(username).subscribe((response) => {
      const compte = response.body;
      this.agentConnecte = compte.agent;
      this.form.patchValue({
        traitePar: this.agentConnecte,
        dateCreation: new Date()
      });
    }, err => {
      console.error('Failed to get the connected agent', err);
    });
  }
  save(): void {
    if (this.form.valid) {
      const satisfactionData = { ...this.form.value }; // Copiez les données du formulaire
      const reponses = satisfactionData.reponses; // Obtenez le groupe de contrôles pour les réponses
      const reponsesArray = []; // Initialisez un tableau pour stocker les réponses
  
      // Parcourez les clés du groupe de contrôles pour les réponses (les noms des questions)
      for (const questionKey in reponses) {
        if (reponses.hasOwnProperty(questionKey)) {
          const reponseValue = reponses[questionKey]; // Obtenez la valeur de la réponse pour cette question
          const question = this.questions.find(q => q === questionKey); // Obtenez le libellé de la question
          reponsesArray.push({ question, reponse: reponseValue }); // Ajoutez la question et sa réponse au tableau
        }
      }
  
      satisfactionData.reponses = reponsesArray; // Remplacez le groupe de contrôles par le tableau de réponses
  
      if (this.isCreateMode()) {
        this.satisfactionService.addSatisfaction(satisfactionData);
      } else {
        this.satisfactionService.updateSatisfaction(satisfactionData);
      }
      this.dialogRef.close();
    }
  }
}
