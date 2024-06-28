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
import { DossierColonieService } from '../../shared/service/dossier-colonie.service';
import { QuestionService } from '../../shared/service/question.service';
import { Question } from '../../shared/model/question.model';
import { Agent } from 'src/app/shared/model/agent.model';
import { EtatDossierColonie } from '../../shared/util/util';

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
    private dossierColonieService: DossierColonieService
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
        this.questions = response.body.map(q => new Question(q));
        this.initForm();
      },
      error => {
        console.error('Error fetching questions', error);
      }
    );
    this.getAgentConnecte();
  }

  initForm(): void {
    const questionGroups = this.questions.map((question) => {
      return this.fb.group({
        id: [question.id],
        texte: [question.texte],
        reponse: [this.defaults ? this.defaults.reponses[question.id] : '']
      });
    });

    this.form.setControl('questions', this.fb.array(questionGroups));

    if (this.defaults) {
      this.form.patchValue({
        codeDossier: this.defaults.codeDossier.code,
        commentaire: this.defaults.commentaire,
      });
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

  save(): void {
    const formValue = this.form.value;
    const reponses = formValue.questions.reduce((acc, curr) => {
      acc[curr.id] = curr.reponse;
      return acc;
    }, {});

    const satisfactionData: Satisfaction = {
      ...this.defaults,
      reponses: reponses,
      codeDossier: this.defaults ? this.defaults.codeDossier : null,
      commentaire: this.form.get('commentaire').value,
      dateCreation: this.isCreateMode() ? new Date() : this.defaults.dateCreation,
    };

    if (this.isCreateMode()) {
      this.addSatisfaction(satisfactionData);
    } else {
      this.updateSatisfaction(satisfactionData);
    }
  }

  addSatisfaction(formData: Satisfaction) {
    formData.nom = this.agentConnecte.nom;
    formData.prenom = this.agentConnecte.prenom;
    formData.matricule = this.agentConnecte.matricule;
    this.dossierColonieService.getAll().subscribe(dossiersResponse => {
      const dossiers = dossiersResponse.body;
      const openOrSaisiDossier = dossiers.find(dossier => dossier.etat === EtatDossierColonie.ouvert || dossier.etat === EtatDossierColonie.saisi);
      if (openOrSaisiDossier) {
        formData.codeDossier = openOrSaisiDossier;
        console.log(formData);
        this.dialogConfirmationService.confirmationDialog().subscribe(action => {
          if (action === DialogUtil.confirmer) {
            this.satisfactionService.addSatisfaction(formData).subscribe((response) => {
              const newSatisfaction = response.body;
              if (newSatisfaction && newSatisfaction.id != null) {
                this.notificationService.success(NotificationUtil.ajout);
                this.dialogRef.close(formData);
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
      } else {
        this.notificationService.warn("No open or saisie dossier found");
        this.dialogRef.close();
      }
    });
  }

  updateSatisfaction(formData: Satisfaction) {
    formData.id = this.defaults.id;
    formData.matricule = this.agentConnecte.matricule;
    formData.nom = this.agentConnecte.nom;
    formData.prenom = this.agentConnecte.prenom;
    formData.dateCreation = this.defaults.dateCreation;
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.satisfactionService.updateSatisfaction(formData).subscribe(() => {
          this.notificationService.success(NotificationUtil.modification);
          this.dialogRef.close(formData);
        }, err => {
          this.notificationService.warn(NotificationUtil.echec);
        });
      } else {
        this.dialogRef.close();
      }
    });
  }
}
