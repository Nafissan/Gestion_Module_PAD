import { Component, OnInit, ViewEncapsulation, Inject } from "@angular/core";
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
} from "angular-calendar";
import { Subject } from "rxjs";
import clone from "lodash-es/clone";
import * as moment from "moment";
import { Conge } from "../../shared/model/conge.model";

@Component({
  selector: "fury-details-conge",
  templateUrl: "./details-conge.component.html",
  styleUrls: ["./details-conge.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DetailsCongeComponent implements OnInit {
  view = "month";

  refresh: Subject<any> = new Subject();

  activeDayIsOpen: boolean = true;
  viewDate: Date = new Date();
  // actions: any[] = [
  //   {
  //     label: '<i class="icon material-icons-outlined">edit</i>',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       this.handleEvent("Edited", event);
  //     },
  //   },
  //   {
  //     label: '<i class="icon material-icons-outlined">delete</i>',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       const foundIndex = this.events.indexOf(event);

  //       if (foundIndex > -1) {
  //         this.events = this.events.splice(foundIndex, 1);
  //       }

  //       this.snackBar
  //         .open("Deleted Event: " + event.title, "UNDO", { duration: 3000 })
  //         .onAction()
  //         .subscribe(() => {
  //           this.events.splice(foundIndex, 0, event);
  //         });
  //     },
  //   },
  // ]; 
  events: any[];
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DetailsCongeComponent>
  ) { }
  ngOnInit(): void {
    this.events = [];
    let i = 1;
    let conges: Conge[] =  this.data.conges;
    if (this.data.conge) {
      this.viewDate = new Date(this.data.conge.dateDepart);
      this.events.push(
        {
          start: moment(this.data.conge.dateDepart).toDate(),
          end: moment(this.data.conge.dateRetourPrevisionnelle).toDate(),
          title:
            "AGENT: " +
            this.data.conge.agent.matricule +
            " -- " +
            this.data.conge.agent.prenom +
            "__" +
            this.data.conge.agent.nom.toUpperCase(),
          color: {
            primary:   "#" +  (Math.random() * 0xffffff).toString(16).split(".")[0],
            secondary: "#" + (Math.random()  * 0xffffff).toString(16).split(".")[0]
          },
          // actions: this.actions,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
          draggable: false,
        });
    }else{
      this.data.conges.forEach(conge => {
        if(i === this.data.conges.length ){
          this.viewDate = new Date(conge.dateDepart);
        }
        this.events.push(
          {
            start: moment(conge.dateDepart).toDate(),
            end: moment(conge.dateRetourPrevisionnelle).toDate(),
            title:
            "AGENT: " +
            conge.agent.matricule +
            " -- " +
            conge.agent.prenom +
            "__" +
            conge.agent.nom.toUpperCase(),
            color: {
              primary:   "#" + (Math.random() * 0xffffff).toString(16).split(".")[0],
              secondary: "#" + (Math.random() * 0xffffff).toString(16).split(".")[0]
            },
            // actions: this.actions,
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
            draggable: true,
          });
          i += 1;
      });
    }    
  }
  handleEvent(action: string, event: CalendarEvent<any>): void {
    const eventCopy = clone(event);
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (moment(this.viewDate).isSame(date, "month")) {
      if (
        (moment(this.viewDate).isSame(date, "day") &&
          this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.snackBar.open(
      "Moved Event: '" +
      event.title +
      "' to " +
      newEnd.getDate() +
      "." +
      newEnd.getMonth() +
      "." +
      newEnd.getFullYear()
    );
    this.refresh.next();
  }

}
