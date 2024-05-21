import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import {
  MatDialog,
} from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
} from "angular-calendar";
import { Observable, ReplaySubject, Subject } from "rxjs";
import clone from "lodash-es/clone";
import * as moment from "moment";
import { Evenement } from "../../shared/model/evenement.model";
import { CalendarEditComponent } from './calendar-edit/calendar-edit.component';
import { MatTableDataSource } from "@angular/material/table";
import { filter } from "lodash";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { EvenementService } from "../../shared/service/evenement.service";

@Component({
  selector: "fury-calendrier-evenement",
  templateUrl: "./calendrier-evenement.component.html",
  styleUrls: ["./calendrier-evenement.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CalendrierEvenementComponent implements OnInit {

  view = 'month';

  refresh: Subject<any> = new Subject();

  activeDayIsOpen = false;
  viewDate: Date = new Date();
  actions: any[] = [{
    label: '<i class="icon material-icons-outlined">edit</i>',
    onClick: ({ event }: { event: CalendarEvent }): void => {
      this.handleEvent('Edited', event);
    }
  }, {
    label: '<i class="icon material-icons-outlined">delete</i>',
    onClick: ({ event }: { event: CalendarEvent }): void => {
      const foundIndex = this.events.indexOf(event);

      if (foundIndex > -1) {
        this.events = this.events.splice(foundIndex, 1);
      }

      this.snackBar.open('Deleted Event: ' + event.title, 'UNDO', { duration: 3000 })
        .onAction().subscribe(() => {
        this.events.splice(foundIndex, 0, event);
      });
    }
  }];
  events: any[] = [ ];

  dataSource: any;
  evenements: Evenement[] = [];

  
  subject$: ReplaySubject<Evenement[]> = new ReplaySubject<Evenement[]>(
    1
  );
  data$: Observable<Evenement[]> = this.subject$.asObservable();
  showProgressBar: boolean;
  paginator: MatPaginator;
  sort: MatSort;
 

 

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private evenementService: EvenementService,
              
              ) {
  }
 
  handleEvent(action: string, event: CalendarEvent<any>): void {
    const eventCopy = clone(event);

    console.log(event);

    const dialogRef = this.dialog.open(CalendarEditComponent, {
      data: event
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        event = result;
        this.snackBar.open('Changed Event: ' + event.title, 'UNDO')
          .onAction().subscribe(() => {
          event = eventCopy;
          this.refresh.next();
        });
        this.refresh.next();
      }
    });
  }

  dayClicked({ date, events }: { date: Date, events: CalendarEvent[] }): void {

    if (moment(this.viewDate).isSame(date, 'month')) {
      if (
        (moment(this.viewDate).isSame(date, 'day') && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.snackBar.open('Moved Event: \'' + event.title + '\' to ' + newEnd.getDate() + '.' + newEnd.getMonth() + '.' + newEnd.getFullYear());
    this.refresh.next();
  }


  ngOnInit() {this.getEvenements();
              // this.getColor();
    
  }
  getEvenements() {
    this.evenementService.getAll().subscribe(
      (response) => {
        this.evenements = response.body;
      },
      (_err) => {
      },
      () => {
        
       
        for (let index = 0; index < this.evenements.length; index++) {
          const element = this.evenements[index];
          this.events.push({
            start:moment(element.datedebut).toDate(),
            end: moment(element.datefin).toDate(),
            title: element.libelle,
            color:{
              primary: this.getColor(),
              secondary: this.getColor()
            }
            
            
              
            
            
            // actions: this.actions
          })
          
        }
        console.log(this.events);
        this.subject$.next(this.evenements);
        this.showProgressBar = true;
      });
  }
  colors(colors: any) {
    throw new Error("Method not implemented.");
  }
  getColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
    this.dataSource.filterPredicate = (data: any, value) => { const dataStr = JSON.stringify(data).toLowerCase(); return dataStr.indexOf(value) != -1; }
  }

}
