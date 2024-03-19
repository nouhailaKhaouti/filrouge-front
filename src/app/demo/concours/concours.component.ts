import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Concour } from 'src/app/model/councour.model';
import { ConcoursModule, Module } from 'src/app/model/module.model';
import { ConcourService } from 'src/app/services/concour/concour.service';
import { ModuleService } from 'src/app/services/module/module.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-concours',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './concours.component.html',
  styleUrl: './concours.component.scss'
})
export class ConcoursComponent {
  concours:Concour={
    reference:"",
    anneeConcours:0,
    dateConcoursEcrit:"", 
    dateConcoursOral: "",
    nbreplace:0,
    nbreplaceConcoursEcrit:0,
    nbreplaceConcoursOral:0,
    filiere: {
       label:"",
       departement:{
        label:""
       }
    } ,
    niveau:"",
    modules:[]
  };
  concoursModule:ConcoursModule={
    concours:{
      reference:"",
      anneeConcours:0,
      dateConcoursEcrit:"", 
      dateConcoursOral: "",
      nbreplace:0,
      nbreplaceConcoursEcrit:0,
      nbreplaceConcoursOral:0
    },
    reference:""
  };
  constructor(private route: ActivatedRoute,private router: Router ,private concourService:ConcourService,private moduleService:ModuleService) {}
  reference:string;
  module:Module={
    reference:"",
    coefModule:0
  };
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['reference'] ) {
        this.reference = params['reference'];
        console.log(this.reference); 
      }
    });
    this.getConcoursData();
  }

  getConcoursData(){
    this.concourService.getConcoursData(this.reference).subscribe(
      (response) => {
        console.log('concour data sent successfully:', response);
        this.concours=response;
        },
        (error) => {
          console.error('Error sending competition data:', error);  
        }
    );
  }

  submitModuleForm(): void {
    this.concoursModule.concours.reference=this.reference;
    this.concoursModule.reference=this.module.reference;
    this.moduleService.addModule(this.concoursModule).subscribe(
      (response) => {
        console.log('Module data sent successfully:', response);
        this.getConcoursData();
          Swal.fire('Success', 'subject is created successfully!', 'success');
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
  deleteModule(module:Module): void {
    this.moduleService.deleteModule(module.reference).subscribe(
      (response) => {
        console.log('Member data deleted successfully:', response);
        this.getConcoursData();
          Swal.fire('Success', 'the subject is  deleted successfully!', 'success');
        },
        (error) => {
          console.error('Error sending competition data:', error);
          // Check if error.error.error is an array
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
    // this.closeModal();
  }
}
