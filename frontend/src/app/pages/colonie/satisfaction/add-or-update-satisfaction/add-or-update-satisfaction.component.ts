import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SatisfactionService } from '../../shared/service/satisfaction.service';
import { Satisfaction } from '../../shared/model/satisfaction.model';
import { CompteService } from 'src/app/pages/gestion-utilisateurs/shared/services/compte.service';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogUtil, NotificationUtil } from "src/app/shared/util/util";
import { DialogConfirmationService } from "src/app/shared/services/dialog-confirmation.service";
import { NotificationService } from 'src/app/shared/services/notification.service';
import { QuestionService } from '../../shared/service/question.service';
import { ReponseService } from '../../shared/service/reponse.service';
import { Question } from '../../shared/model/question.model';
import { Reponse } from '../../shared/model/reponse.model';
import { Agent } from 'src/app/shared/model/agent.model';

@Component({
  selector: 'fury-satisfaction-form',
  templateUrl: './add-or-update-satisfaction.component.html',
  styleUrls: ['./add-or-update-satisfaction.component.scss'],
})
export class AddOrUpdateSatisfactionComponent implements OnInit {
  form: FormGroup;
  satisfaction: Satisfaction;
  agentConnecte: Agent;
  questions: Question[] = [];
  mode: "create" | "update" = "create";
  reponses: Reponse[] = []; // Ajout de la variable reponses pour stocker les réponses fournies

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Satisfaction,
    private fb: FormBuilder,
    private satisfactionService: SatisfactionService,
    private authService: AuthenticationService,
    private compteService: CompteService,
    private dialogRef: MatDialogRef<AddOrUpdateSatisfactionComponent>,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService,
    private questionService: QuestionService,
    private reponseService: ReponseService
  ) {
    this.form = this.fb.group({
      questions: this.fb.array([]),
      commentaire: ['', Validators.required],
      codeDossier: [null],
    });
  }

  ngOnInit(): void {
    this.questionService.getAllQuestions().subscribe(
      response => {
        const questionsFromBody = response.body; 
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
  

  initForm(): void {
    const questionGroups = this.questions.map((question) => {
      return this.fb.group({
        id: [question.id],
        texte: [question.texte],
        reponse: ['']
      });
    });

    this.form.setControl('questions', this.fb.array(questionGroups));

    if (this.defaults) {
      this.form.patchValue({
        codeDossier: this.defaults.codeDossier.code,
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
  loadExistingReponses(satisfactionId: Satisfaction): void {
    this.reponseService.getReponsesByFormulaireId(satisfactionId.id).subscribe(
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
      question: new Question({ id: q.id, texte: q.texte }),
      reponse: q.reponse
    }));

    const satisfactionData: Satisfaction = {
      ...this.defaults,
      codeDossier: this.defaults ? this.defaults.codeDossier : null,
      commentaire: this.form.get('commentaire').value,
      dateCreation: this.isCreateMode() ? new Date() : this.defaults.dateCreation,
    };

    if (this.isCreateMode()) {
      this.addSatisfaction(satisfactionData, this.reponses);
    } else {
      this.updateSatisfaction(satisfactionData, this.reponses);
    }
  }

  addSatisfaction(formData: Satisfaction, reponses: Reponse[]) {
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

  updateSatisfaction(formData: Satisfaction, reponses: Reponse[]) {
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
          this.notificationService.warn(NotificationUtil.echec);
        });
      } else {
        this.dialogRef.close();
      }
    });
  }

  saveReponses(satisfaction: Satisfaction, reponses: Reponse[]) {
    reponses.forEach((reponse) => {
      reponse.formulaire = satisfaction;
      this.reponseService.addReponse(reponse).subscribe(() => {
        this.dialogRef.close(satisfaction);
      }, err => {
        this.notificationService.warn(NotificationUtil.echec);
      });
    });
  }

  updateReponses(satisfaction: Satisfaction, reponses: Reponse[]) {
    reponses.forEach((reponse) => {
      reponse.formulaire = satisfaction;
      this.reponseService.updateReponse(reponse).subscribe(() => {
        this.dialogRef.close(satisfaction);
      }, err => {
        this.notificationService.warn(NotificationUtil.echec);
      });
    });
  }
}
