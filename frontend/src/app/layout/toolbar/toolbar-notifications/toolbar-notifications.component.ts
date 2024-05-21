import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SuiviDotation } from 'src/app/pages/dotation/dotation-lait/shared/models/suiviDotation.model';
import { SuiviDotationService } from 'src/app/pages/dotation/dotation-lait/shared/services/suivi-dotation.service';
import { formatDateEnMois } from 'src/app/shared/util/formatageDate';
import { LIST_FADE_ANIMATION } from '../../../../@fury/shared/list.animation';

@Component({
  selector: 'fury-toolbar-notifications',
  templateUrl: './toolbar-notifications.component.html',
  styleUrls: ['./toolbar-notifications.component.scss'],
  animations: [...LIST_FADE_ANIMATION],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarNotificationsComponent implements OnInit {

  notifications: any[];
  isOpen: boolean;

  suiviDotations: any[] = [];
  annee = new Date().getFullYear();
  mois = formatDateEnMois(new Date());

  constructor(  private suiviDotationService: SuiviDotationService) {
  }

  ngOnInit() {
    this.notifications = [

    ];
    this.suiviDotations = [];
    this.getSuiviDotationsByAnneAndMois(this.annee, this.mois);
  }

  markAsRead(notification) {
    notification.read = true;
  }

  dismiss(notification, event) {
    event.stopPropagation();
    this.suiviDotations.splice(this.suiviDotations.indexOf(notification), 1);
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }

  markAllAsRead() {
    this.suiviDotations.forEach(notification => notification.read = true);
  }



    getSuiviDotationsByAnneAndMois(annee, mois) {
    this.suiviDotationService.getByAnneeAndMois(annee, mois).subscribe(
      (response) => {
        this.suiviDotations = response.body;
         this.suiviDotations = this.suiviDotations.filter(s => s.etat === "A VALIDER");
      },
      (err) => {
      },
      () => {
      
      }
    );
  }
}
