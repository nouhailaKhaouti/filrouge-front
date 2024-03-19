import { Component, ViewChild } from '@angular/core';
import { Filiere } from 'src/app/model/councour.model';
import { Departement } from 'src/app/model/departement.model';
import { DepartementService } from 'src/app/services/departement/departement.service';
import { FiliereService } from 'src/app/services/filiere/filiere.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-filiere',
  standalone: true,
  imports: [],
  templateUrl: './filiere.component.html',
  styleUrl: './filiere.component.scss'
})
export class FiliereComponent {
  @ViewChild('FiliereAdd') FiliereModal: any;
  filieres: Filiere[] = [];
  departements:Departement[]=[];
  filiere: Filiere 
  constructor(private FiliereService: FiliereService,private departementService:DepartementService) { }

  ngOnInit(): void {
    // this.fetchFiliereData();
    this.retrieveFilieres();
  }

  retrieveFilieres(): void {

    this.FiliereService.getFilieresData()
    .subscribe(
      response => {
        this.filieres = response;
        console.log(response);
      },
      error => {
        console.log(error);
      });

      this.departementService.getDepartementsData()
      .subscribe(
        response => {
          this.departements = response;
          console.log(response);
        },
        error => {
          console.log(error);
        });
    
  }

  openModal(): void {
    this.FiliereModal.nativeElement.classList.add('show');
    this.FiliereModal.nativeElement.style.display = 'block';
    }

  closeModal(): void {
    this.FiliereModal.nativeElement.classList.add('hide');
    this.FiliereModal.nativeElement.style.display = 'none';
    
    this.filiere={
      label:"",
      departement:{
        label:""
      }
    };

  }

  deleteModal(Filiere:Filiere){
    this.deleteFiliere(Filiere);
  }

  submitForm(): void {
    this.closeModal();
    this.FiliereService.addFiliere(this.filiere).subscribe(
      (response) => {
        console.log('Filiere data sent successfully:', response);
          this.retrieveFilieres();
          Swal.fire('Success', 'This Filiere has been registred successfully!', 'success');

        },
        (error) => {
          console.error('Error sending competition data:', error);
          if (Array.isArray(error.error.error)) {
            const errorMessage = error.error.error.join('<br>'); 
            Swal.fire({
              icon: 'error',
              title: 'Error',
              html: errorMessage  
            });
          } else {
            console.log('Unexpected error structure:', error.error);
            Swal.fire('Error', error.error, 'error'); 
          }
  
        }
    );
  }

  deleteFiliere(Filiere:Filiere): void {
    this.FiliereService.deleteFiliere(Filiere.label,Filiere.departement.label).subscribe(
      (response) => {
        console.log('Filiere data deleted successfully:', response);
          this.retrieveFilieres();
          Swal.fire('Success', 'the user deleted successfully!', 'success');
        },
        (error) => {
          console.error('Error sending competition data:', error);
          if (Array.isArray(error.error.error)) {
            const errorMessage = error.error.error.join('<br>'); 
            Swal.fire({
              icon: 'error',
              title: 'Error',
              html: errorMessage  
            });
          } else {
            console.log('Unexpected error structure:', error.error);
            Swal.fire('Error', error.error, 'error'); 
          }
  
        }
    );
  }
}
