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
import { Concour, Filiere } from 'src/app/model/councour.model';
import { ConcourService } from 'src/app/services/concour/concour.service';
import { formatDate } from '@angular/common';
import { FiliereService } from 'src/app/services/filiere/filiere.service';
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


  date1 = new FormControl();
  date2 = new FormControl();
  reference = new FormControl();

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
    coef:0,
    reference:"",
  }
  concour:Concour={
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
  filieres: Filiere[] = [];
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
  }

  addSubject() {
    const moduleExists = this.modules.some(existingModule => {
      return existingModule.reference === this.module.reference;
    });
    if (!moduleExists) {
      const newModule: Module = {
        coef: this.module.coef,
        reference: this.module.reference
      };
      
      this.modules.push(newModule);
      
    } else {
      Swal.fire('Error', 'the subject your trying to add already exist in yours subjects table', 'error'); 
    }

        this.resetModule();
  }

  resetModule(){
    this.module={
      coef:0,
      reference:"",
    }
  }

  removeSubject(module:Module){
    const moduleIndex = this.modules.findIndex(existingModule => {
      return existingModule.reference === module.reference;
    });
    this.modules = this.modules.filter((_, index) => index !== moduleIndex);

  }

  onDateChange(event: Event, propertyName: string) {
    console.log("dkhal");
    const selectedDate = (event.target as HTMLInputElement).value;
    console.log(selectedDate);
    this.concour[propertyName] = selectedDate;
    console.log(this.concour[propertyName]);
  }


  submitForm(){
    this.concour.niveau="MASTER";
    this.concour.anneeConcours=2024;
    this.concour.modules=this.modules;
    this.concour.dateConcoursEcrit=this.date1.value;
    this.concour.dateConcoursOral=this.date2.value;
    this.concour.reference=this.reference.value;
    this.concour.filiere.label="Filiere 1"
    console.log(this.concour);
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
  constructor(private _formBuilder: FormBuilder,private concourService:ConcourService,private FiliereService: FiliereService) {}
}
