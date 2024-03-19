import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Concour } from 'src/app/model/councour.model';
import { ConcourService } from 'src/app/services/concour/concour.service';


@Component({
  selector: 'app-full-calendar',
  standalone: true,
  imports: [
    BrowserModule,
    FullCalendarModule
  ],
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.scss']
})
export class FullCalendarComponent implements OnInit {
  concours: Concour[] = [];
  events: any[] = [
    { title: 'event 1', date: '2024-04-01' , id:'reference' },
    { title: 'event 2', date: '2024-04-02' , id:'reference' }
  ]; 

  constructor(private concourService: ConcourService,private router: Router ) {}

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: false,
    events:[],
    eventClick: (info)  => { // Use an arrow function here
      info.jsEvent.preventDefault(); 
      this.redirectToExam(info.event.id);
    }
  };


  redirectToExam(reference:string){

    this.router.navigate(['/concours'], {queryParams: { reference:reference }});
  }

  ngOnInit(): void {
    this.retrieveConcours();
  }

  retrieveConcours(): void {
    this.concourService.getAllConcoursData().subscribe(
      (response: Concour[]) => {
        this.concours = response;
        this.events = [];

        for (let item of this.concours) {
          let ecritDate = {
            title: item.reference + ' : ' + item.filiere.label,
            start: item.dateConcoursEcrit,
            id:item.reference,
            backgroundColor:"#228B22"
          };

          let oralDate = {
            title: item.reference + ' : ' + item.filiere.label,
            start: item.dateConcoursOral,
            id:item.reference,
            backgroundColor:"#00BFFF"
          };

          this.events.push(ecritDate);
          this.events.push(oralDate);
          this.calendarOptions.events=this.events;
        }

        console.log(this.calendarOptions.events);
      },
      error => {
        console.log(error);
      }
    );
  }
}