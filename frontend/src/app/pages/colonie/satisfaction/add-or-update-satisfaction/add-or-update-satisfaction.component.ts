import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SatisfactionService } from '../../shared/service/satisfaction.service';
import { Satisfaction } from '../../shared/model/satisfaction.model';
import { CompteService } from 'src/app/pages/gestion-utilisateurs/shared/services/compte.service';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogUtil, NotificationUtil } from "src/app/shared/util/util";
import { DialogConfirmationService } from "src/app/shared/services/dialog-confirmation.service";
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DossierColonieService } from '../../shared/service/dossier-colonie.service';
import {QuestionService} from '../../shared/service/question.service';
import { Question } from '../../shared/model/question.model';
@Component({
  selector: 'fury-satisfaction-form',
  templateUrl: './add-or-update-satisfaction.component.html',
  styleUrls: ['./add-or-update-satisfaction.component.scss', "../../../../shared/util/bootstrap4.css"],
})
export class AddOrUpdateSatisfactionComponent implements OnInit {
  form: FormGroup;
  satisfaction: Satisfaction;
  agentConnecte: any;
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
    private notificationService:NotificationService,
    private formBuilder: FormBuilder,        
     private questionService: QuestionService ,
    private dossierColonieService: DossierColonieService 

  ) {
    this.satisfaction = defaults || {} as Satisfaction;
  }

  ngOnInit(): void {
    this.getQuestions();
    this.getAgentConnecte();
  }
  getQuestions() {
    this.questionService.getAllQuestions().subscribe(
      response => {
        this.questions = response.body.map(q => new Question(q)); 
        this.initForm();
      },
      error => {
        console.error('Error fetching questions', error);
      }
    );
  }
  initForm(): void {
    this.form = this.fb.group({});
    this.questions.forEach(question => {
      this.form.addControl(question.texte, this.fb.control(null));
    });
    this.form.addControl('codeDossier', this.fb.control(null));
    this.form.addControl('commentaire', this.fb.control(null));

    if (this.satisfaction && this.satisfaction.reponses) {
      Object.keys(this.satisfaction.reponses).forEach(questionId => {
        const question = this.questions.find(q => q.id === +questionId);
        if (question) {
          this.form.get(question.texte).setValue(this.satisfaction.reponses[questionId]);
        }
      });
      this.form.patchValue({
        codeDossier: this.satisfaction.codeDossier.code,
        commentaire: this.satisfaction.commentaire
      });    
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
    }, err => {
      console.error('Failed to get the connected agent', err);
    });
  }

  save(): void {
    const reponses = {};
    this.questions.forEach(question => {
      reponses[question.id] = this.form.get(question.texte).value;
    });

    const satisfactionData: Satisfaction = {
      ...this.form.value,
      reponses: reponses,
      codeDossier: this.satisfaction.codeDossier,
      dateCreation: new Date(),
      traitePar: this.agentConnecte
    };

    if (this.isCreateMode()) {
      this.addSatisfaction(satisfactionData);
    } else if (this.isUpdateMode()) {
      this.updateSatisfaction(satisfactionData);
    }
  }
  addSatisfaction(formData: Satisfaction) {
    this.dossierColonieService.getAll().subscribe(dossiersResponse => {
      const dossiers = dossiersResponse.body;
      const openOrSaisiDossier = dossiers.find(dossier => dossier.etat === 'ouvert' || dossier.etat === 'saisi');
      if (openOrSaisiDossier) {
        formData.codeDossier = openOrSaisiDossier;
  
        this.dialogConfirmationService.confirmationDialog().subscribe(action => {
          if (action === DialogUtil.confirmer) {
            this.satisfactionService.addSatisfaction(formData).subscribe((response) => {
              const newSatisfaction = response.body;
              if (newSatisfaction && newSatisfaction.id != null) {
                this.notificationService.success(NotificationUtil.ajout);
  
                // Update the dossier with the new satisfaction
                openOrSaisiDossier.formulaireSatisfaction = newSatisfaction;
  
                this.dossierColonieService.update(openOrSaisiDossier).subscribe(
                  updateResponse => {
                    this.notificationService.success('Dossier updated with new satisfaction');
                    this.dialogRef.close(formData);
                  },
                  updateError => {
                    this.notificationService.warn('Failed to update dossier with new satisfaction');
                    this.dialogRef.close();
                  }
                );
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
  
  updateSatisfaction(formData: Satisfaction){
    formData.id = this.satisfaction.id;
    console.log(formData); 
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
    this.satisfactionService.updateSatisfaction(formData).subscribe(() => {
      this.notificationService.success(NotificationUtil.modification);

      this.dialogRef.close(formData);
    },err => {
      this.notificationService.warn(NotificationUtil.echec);
  },
  () => {})
   } else{
    this.dialogRef.close();
   }
  })
}
}
