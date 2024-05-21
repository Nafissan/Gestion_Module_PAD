import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import sortBy from 'lodash-es/sortBy';
import * as moment from 'moment';
import { ScrollbarComponent } from '../../../../@fury/shared/scrollbar/scrollbar.component';
import { chatDemoData } from './chat.demo';
import { MediaObserver } from '@angular/flex-layout';
import { map, takeUntil } from 'rxjs/operators';
import { componentDestroyed } from '../../../../@fury/shared/component-destroyed';

@Component({
  selector: 'fury-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  drawerOpen = true;
  drawerMode = 'side';
  replyCtrl: FormControl;

  chats: any[];
  activeChat: any;

  @ViewChild('messagesScroll', { read: ScrollbarComponent, static: true }) messagesScroll: ScrollbarComponent;

  constructor(private cd: ChangeDetectorRef,
              private mediaObserver: MediaObserver) {
  }

  ngOnInit() {
    this.replyCtrl = new FormControl();

    this.chats = sortBy(chatDemoData, 'lastMessageTime').reverse();
    this.activeChat = this.chats[0];

    this.mediaObserver.asObservable().pipe(
      map(() => this.mediaObserver.isActive('lt-md')),
      takeUntil(componentDestroyed(this))
    ).subscribe(isLowerThanMedium => isLowerThanMedium ? this.hideDrawer() : this.showDrawer());
  }

  showDrawer() {
    this.drawerOpen = true;
    this.drawerMode = 'side';
  }

  hideDrawer() {
    this.drawerOpen = false;
    this.drawerMode = 'over';
  }

  setActiveChat(chat) {
    this.activeChat = chat;

    if (this.drawerMode === 'over') {
      this.drawerOpen = false;
    }
  }

  send() {
    if (this.replyCtrl.value) {
      this.chats[0].messages.push({
        message: this.replyCtrl.value,
        when: moment(),
        who: 'me'
      });

      this.replyCtrl.reset();
      this.cd.markForCheck();
      setTimeout(() => {
        this.messagesScroll.scrollbarRef.getScrollElement().scrollTo(0, this.messagesScroll.scrollbarRef.getScrollElement().scrollHeight);
      }, 10);
    }
  }

  clearMessages(activeChat) {
    activeChat.messages.length = 0;
  }

  ngOnDestroy(): void {}
}
