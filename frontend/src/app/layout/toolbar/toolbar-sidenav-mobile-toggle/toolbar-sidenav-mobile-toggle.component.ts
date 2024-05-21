import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GuideComponent } from '../../../pages/guide/guide.component';

@Component({
  selector: 'fury-toolbar-sidenav-mobile-toggle',
  templateUrl: './toolbar-sidenav-mobile-toggle.component.html',
  styleUrls: ['./toolbar-sidenav-mobile-toggle.component.scss']
})
export class ToolbarSidenavMobileToggleComponent {

  @Output() openSidenav = new EventEmitter();

  constructor( private router: Router,private dialog:MatDialog) {}
  aide(){
 /*    console.log('logout');

    this.router.navigateByUrl("/guide"); */
    
    this.dialog
    .open(GuideComponent,{
      height: '600px',
      width: '800px',
    })
    .afterClosed()
 ;
  }
}
