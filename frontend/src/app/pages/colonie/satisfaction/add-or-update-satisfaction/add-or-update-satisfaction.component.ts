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
@Component({
  selector: 'fury-satisfaction-form',
  templateUrl: './add-or-update-satisfaction.component.html',
  styleUrls: ['./add-or-update-satisfaction.component.scss', "../../../../shared/util/bootstrap4.css"],
})
export class AddOrUpdateSatisfactionComponent implements OnInit {
  form: FormGroup;
  satisfaction: Satisfaction;
  agentConnecte: any;
  questions: string[] = [];
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
        this.questions = response.body.map(q => q.texte); 
        this.initForm();
      },
      error => {
        console.error('Error fetching questions', error);
      }
    );
  }
  initForm(): void {
    this.form = this.formBuilder.group({});
    this.questions.forEach(question => {
      this.form.addControl(question, this.formBuilder.control(null));
    });
    this.form.addControl('code', this.formBuilder.control(null));
    this.form.addControl('commentaire', this.formBuilder.control(null));

    if (this.satisfaction) {
      this.form.patchValue(this.satisfaction);
      this.form.patchValue({ reponses: this.satisfaction.reponses });
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
      reponses[question] = this.form.get(question).value;
    });

    const code = this.form.get('code').value;
    const commentaire = this.form.get('commentaire').value;
    const satisfactionData: Satisfaction = {
      ...this.form.value,
      reponses: reponses,
      code: code,
      commentaire: commentaire,
      questions: this.questions,
      traitePar: this.agentConnecte,
      dateCreation: new Date()
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
        formData.code = openOrSaisiDossier.code;
      }});
    console.log(formData);
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.satisfactionService.addSatisfaction(formData).subscribe((response) => {
          if(response.body.id != null){
            this.notificationService.success(NotificationUtil.ajout);
            this.dialogRef.close(formData);

          }else{
            this.notificationService.warn("Erreur dans l'ajout du formulaire");
            this.dialogRef.close();
          }
        },err => {
          this.notificationService.warn(NotificationUtil.echec);
        });
      } else {
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
