import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogConfirmationService {

  constructor(
    private dialog: MatDialog
  ) { }
  public confirmationDialog(): Observable<any> {
    return this.dialog.open(DialogComponent, {
      disableClose: false,
      height: "40%",
      width:  "35%",
    }).afterClosed();
  }
}
