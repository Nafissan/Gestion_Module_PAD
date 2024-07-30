import { Component, Inject, OnInit } from '@angular/core';
import { SatisfactionPelerinage } from '../../shared/model/satisfaction-pelerinage.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Agent } from 'src/app/shared/model/agent.model';
import { ReponsePelerinage } from '../../shared/model/reponse-pelerinage.model';
import { SatisfactionPelerinageService } from '../../shared/services/satisfaction-pelerinage.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReponsePelerinageService } from '../../shared/services/reponse-pelerinage.service';
import { CompteService } from 'src/app/pages/gestion-utilisateurs/shared/services/compte.service';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogUtil, NotificationUtil } from 'src/app/shared/util/util';
import { Question } from 'src/app/pages/colonie/shared/model/question.model';
import { QuestionService } from 'src/app/pages/colonie/shared/service/question.service';

@Component({
  selector: 'fury-add-or-update-satisfaction-pelerinage',
  templateUrl: './add-or-update-satisfaction-pelerinage.component.html',
  styleUrls: ['./add-or-update-satisfaction-pelerinage.component.scss']
})
export class AddOrUpdateSatisfactionPelerinageComponent implements OnInit {
  form: FormGroup;
  satisfaction: SatisfactionPelerinage;
  agentConnecte: Agent;
  questions: Question[] = [];
  mode: "create" | "update" = "create";
  reponses: ReponsePelerinage[] = []; // Ajout de la variable reponses pour stocker les réponses fournies

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: SatisfactionPelerinage,
    private fb: FormBuilder,
    private satisfactionService: SatisfactionPelerinageService,
    private authService: AuthenticationService,
    private compteService: CompteService,
    private dialogRef: MatDialogRef<AddOrUpdateSatisfactionPelerinageComponent>,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService,
    private questionService: QuestionService,
    private reponseService: ReponsePelerinageService) {this.form = this.fb.group({
      questions: this.fb.array([]),
      commentaire: ['', Validators.required],
      dossierPelerinage: [null],
    }); }

  ngOnInit(): void { 
    this.questionService.getQuestionsPelerinage().subscribe(
    response => {
      const questionsFromBody = response.body; 
      console.log(questionsFromBody);
      this.questions = questionsFromBody.map((q, index) => ({
        id: index + 1, 
        texte: q.texte, 
      }));
      this.initForm(); 
    },
    error => {
      console.error('Erreur lors du chargement des questions', error);
    }
  );

  this.getAgentConnecte(); 
  }
  initForm() {
    const questionGroups = this.questions.map((question) => {
      return this.fb.group({
        id: [question.id],
        texte: [question.texte],
        type: [question.type],
        reponse: ['']
      });
    });

    this.form.setControl('questions', this.fb.array(questionGroups));

    if (this.defaults) {
      this.form.patchValue({
        dossierPelerinage: this.defaults.dossierPelerinage.code,
        commentaire: this.defaults.commentaire,
      });
      this.loadExistingReponses(this.defaults);
    }
  }

  isCreateMode(): boolean {
    return !this.defaults || !this.defaults.id;
  }

  isUpdateMode(): boolean {
    return !!this.defaults && !!this.defaults.id;
  }
  get questionsArray() {
    return this.form.get('questions') as FormArray;
  }

  getAgentConnecte(): void {
    const username = this.authService.getUsername();
    this.compteService.getByUsername(username).subscribe((response) => {
      const compte = response.body;
      this.agentConnecte = compte.agent;
    }, err => {
      console.error('Failed to get the connected agent', err);
    });
  }
  loadExistingReponses(satisfactionId: SatisfactionPelerinage): void {
    this.reponseService.getReponsesByFormulaireId(satisfactionId).subscribe(
      response => {
        const reponses = response.body;
        this.questionsArray.controls.forEach((group, index) => {
          const questionId = group.get('id').value;
          const reponse = reponses.find(r => r.question.id === questionId);
          if (reponse) {
            group.get('reponse').setValue(reponse.reponse);
          }
        });
      },
      error => {
        console.error('Error fetching responses', error);
      }
    );
  }
  save(): void {
    const formValue = this.form.value;
    this.reponses = formValue.questions.map((q) => ({
      question: new Question({ id: q.id, texte: q.texte ,type:q.type}),
      reponse: q.reponse
    }));

    const satisfactionData: SatisfactionPelerinage = {
      ...this.defaults,
      dossierPelerinage: this.defaults ? this.defaults.dossierPelerinage : null,
      commentaire: this.form.get('commentaire').value,
      dateCreation: this.isCreateMode() ? new Date() : this.defaults.dateCreation,
    };

    if (this.isCreateMode()) {
      this.addSatisfaction(satisfactionData, this.reponses);
    } else {
      this.updateSatisfaction(satisfactionData, this.reponses);
    }
  }
  updateSatisfaction(formData: SatisfactionPelerinage, reponses: ReponsePelerinage[]) {
    formData.id = this.defaults.id;
    formData.matricule = this.agentConnecte.matricule;
    formData.nom = this.agentConnecte.nom;
    formData.prenom = this.agentConnecte.prenom;
    formData.dateCreation = this.defaults.dateCreation;
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.satisfactionService.updateSatisfaction(formData).subscribe((response) => {
          this.notificationService.success(NotificationUtil.modification);
          this.updateReponses(response.body, reponses); 
          this.dialogRef.close(formData);
        }, err => {
          this.notificationService.warn("Erreur lors de la mise a jour du formulaire");
        });
      } else {
        this.dialogRef.close();
      }
    });
  }
  updateReponses(satisfaction: SatisfactionPelerinage, reponses: ReponsePelerinage[]) {
    reponses.forEach((reponse) => {
      reponse.formulaire = satisfaction;
      this.reponseService.updateReponse(reponse).subscribe(() => {
        this.dialogRef.close(satisfaction);
      }, err => {
        this.notificationService.warn("Erreur lors de la mise a jour des reponses!");
      });
    });
  }
  addSatisfaction(formData: SatisfactionPelerinage, reponses: ReponsePelerinage[]) {
    formData.nom = this.agentConnecte.nom;
    formData.prenom = this.agentConnecte.prenom;
    formData.matricule = this.agentConnecte.matricule;
        this.dialogConfirmationService.confirmationDialog().subscribe(action => {
          if (action === DialogUtil.confirmer) {
            this.satisfactionService.addSatisfaction(formData).subscribe((response) => {
              const newSatisfaction = response.body;
              if (newSatisfaction && newSatisfaction.id != null) {
                this.notificationService.success(NotificationUtil.ajout);
                this.saveReponses(newSatisfaction, reponses);
                this.dialogRef.close(newSatisfaction);
              } else {
                this.notificationService.warn("Erreur dans l'ajout du formulaire");
                this.dialogRef.close();
              }
            }, err => {
              this.notificationService.warn(NotificationUtil.echec);
            });
          } else {
            this.dialogRef.close();
          }
        });
      
  }
  saveReponses(satisfaction: SatisfactionPelerinage, reponses: ReponsePelerinage[]) {
    reponses.forEach((reponse) => {
      reponse.formulaire = satisfaction;
      this.reponseService.addReponse(reponse).subscribe(() => {
        this.dialogRef.close(satisfaction);
      }, err => {
        this.notificationService.warn(NotificationUtil.echec);
      });
    });
  }
}
