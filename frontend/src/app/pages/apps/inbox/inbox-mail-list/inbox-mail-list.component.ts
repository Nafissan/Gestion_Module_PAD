import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { componentDestroyed } from '../../../../../@fury/shared/component-destroyed';
import { InboxService } from '../inbox.service';
import { Mail } from '../shared/mail.interface';

@Component({
  selector: 'fury-inbox-mail-list',
  templateUrl: './inbox-mail-list.component.html',
  styleUrls: ['./inbox-mail-list.component.scss']
})
export class InboxMailListComponent implements OnInit, OnDestroy {

  mails$: Observable<Mail[]>;

  constructor(private route: ActivatedRoute,
              private inboxService: InboxService) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      takeUntil(componentDestroyed(this))
    ).subscribe(paramMap => {
      if (paramMap.get('category') === 'starred') {
        this.mails$ = this.inboxService.getStarred();
      } else {
        this.mails$ = this.inboxService.getGroup(paramMap.get('category'));
      }
    });
  }

  toggleStarred(mail: Mail) {
    this.inboxService.toggleStarred(mail);
  }

  ngOnDestroy(): void {
  }
}
