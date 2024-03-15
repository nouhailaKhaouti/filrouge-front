import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Module } from 'src/app/model/module.model';
import Swal from 'sweetalert2';
import { Concour,Filiere } from 'src/app/model/councour.model';
import { ConcourService } from 'src/app/services/concour/concour.service';



@Component({
  selector: 'app-create-concour',
  standalone: true,
  imports: [
    SharedModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  providers:[provideNativeDateAdapter()],
  templateUrl: './create-concour.component.html',
  styleUrl: './create-concour.component.scss'
})
export class CreateConcourComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  modules:Module[]=[];
  module:Module={
    coefModule:0,
     label:"",
  }
  concour:Concour={
    reference:"",
    anneeConcours:0,
    dateConcoursEcrit:"", // Initialize as Date objects
    dateConcoursOral: "",
    nbreplace:0,
    nbreplaceConcoursEcrit:0,
    nbreplaceConcoursOral:0,
    filiere: {
       label:""
    } ,
    niveau:"",
    modules:[]
  }
  addSubject() {
    const moduleExists = this.modules.some(existingModule => {
      return existingModule.label === this.module.label && existingModule.coefModule === this.module.coefModule;
    });
    if (!moduleExists) {
      const newModule: Module = {
        coefModule: this.module.coefModule,
        label: this.module.label
      };
      
      this.modules.push(newModule);
      
    } else {
      Swal.fire('Error', 'the subject your trying to add already exist in yours subjects table', 'error'); 
    }

        this.resetModule();
  }

  resetModule(){
    this.module={
      coefModule:0,
      label:"",
    }
  }

  removeSubject(module:Module){
    const moduleIndex = this.modules.findIndex(existingModule => {
      return existingModule.label === module.label && existingModule.coefModule === module.coefModule;
    });
    this.modules = this.modules.filter((_, index) => index !== moduleIndex);

  }

  onDateChange(event: Event, propertyName: string) {
    const selectedDate = (event.target as HTMLInputElement).value;
    this.concour[propertyName] = selectedDate;
  }


  submitForm(){
    this.concour.niveau="MASTER";
    this.concour.anneeConcours=2024;
    this.concourService.addConcour(this.concour).subscribe(
      (response) => {
        console.log('concour data sent successfully:', response);
          Swal.fire('Success', 'This concour has been registred successfully!', 'success');

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
  }
  constructor(private _formBuilder: FormBuilder,private concourService:ConcourService) {}
}
