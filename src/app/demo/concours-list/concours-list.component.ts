import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Concour } from 'src/app/model/councour.model';
import { ConcourService } from 'src/app/services/concour/concour.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-concours-list',
  standalone: true,
  imports: [FormsModule,
  SharedModule],
  templateUrl: './concours-list.component.html',
  styleUrl: './concours-list.component.scss'
})
export class ConcoursListComponent {
  concoursList: Concour[] = [];

  ngOnInit(): void {
    this.retrieveConcours();
  }
  constructor(private router: Router ,private concourService:ConcourService) {}

  isBeforeEcritDate(concours: Concour): boolean {
    const currentDate = new Date();
    return currentDate < new Date(concours.dateConcoursEcrit);
  }

  isBetweenEcritAndOralDate(concours: Concour): boolean {
    const currentDate = new Date();
    const ecritDate = new Date(concours.dateConcoursEcrit);
    const oralDate = new Date(concours.dateConcoursOral);
    return currentDate >= ecritDate && currentDate < oralDate;
  }

  isAfterOralDate(concours: Concour): boolean {
    const currentDate = new Date();
    const oralDate = new Date(concours.dateConcoursOral);
    return currentDate >= oralDate;
  }

  inscriptionPreselection(concours: Concour): void {
    this.router.navigate(['/inscription_List'], { queryParams: { concour: JSON.stringify(concours) ,prefix:'preselection'} });
  }

  createConcours(): void {
    this.router.navigate(['/CreateConcour']);
  }

  inscriptionWriting(concours: Concour): void {
    this.router.navigate(['/inscription_List'], { queryParams: { concour: JSON.stringify(concours) ,prefix:'writing'} });
  }

  inscriptionAdmis(concours: Concour): void {
    this.router.navigate(['/inscription_List'], { queryParams: { concour: JSON.stringify(concours) ,prefix:'admis'} });
  }
  inscription(concours: Concour): void {
    this.router.navigate(['/inscription_List'], { queryParams: { concour: JSON.stringify(concours) ,prefix:'all'} });
  }

  retrieveConcours(): void {
    this.concourService.getAllConcoursData().subscribe(
      (response: Concour[]) => {
        this.concoursList = response;
      },
      error => {
        console.log(error);
      }
    );
  }
}

