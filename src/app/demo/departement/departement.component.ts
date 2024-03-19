import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Departement } from 'src/app/model/departement.model';
import { DepartementService } from 'src/app/services/departement/departement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-departement',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './departement.component.html',
  styleUrl: './departement.component.scss'
})
export class DepartementComponent {
  @ViewChild('departementAdd') DepartementModal: any;
  departements: Departement[] = [];
  departement: Departement 
  constructor(private DepartementService: DepartementService) { }

  ngOnInit(): void {
    // this.fetchDepartementData();
    this.retrieveDepartements();
  }

  retrieveDepartements(): void {

    this.DepartementService.getDepartementsData()
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
    this.DepartementModal.nativeElement.classList.add('show');
    this.DepartementModal.nativeElement.style.display = 'block';
    }

  closeModal(): void {
    this.DepartementModal.nativeElement.classList.add('hide');
    this.DepartementModal.nativeElement.style.display = 'none';
    
    this.departement={
      label:""
    };

  }

  deleteModal(Departement:Departement){
    this.deleteDepartement(Departement);
  }

  submitForm(): void {
    this.closeModal();
    this.DepartementService.addDepartement(this.departement).subscribe(
      (response) => {
        console.log('Departement data sent successfully:', response);
          this.retrieveDepartements();
          Swal.fire('Success', 'This Departement has been registred successfully!', 'success');

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

  deleteDepartement(Departement:Departement): void {
    this.DepartementService.deleteDepartement(Departement.label).subscribe(
      (response) => {
        console.log('Departement data deleted successfully:', response);
          this.retrieveDepartements();
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
