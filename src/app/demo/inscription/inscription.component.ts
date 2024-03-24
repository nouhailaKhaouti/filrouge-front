import { Component, ViewChild } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl, FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { NgbAlertModule, NgbDateParserFormatter, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Inscription,Choix, Semestre, Diplome, } from 'src/app/model/inscription.model';
import { InscriptionService } from 'src/app/services/inscription/inscription.service';
import { ConcourService } from 'src/app/services/concour/concour.service';
import { Filiere, Reference } from 'src/app/model/councour.model';
import { ActivatedRoute } from '@angular/router';
import { FiliereService } from 'src/app/services/filiere/filiere.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgbDatepickerModule, NgbAlertModule,
    JsonPipe,
    SharedModule,
    CommonModule
  ],
  providers: [
    DatePipe
  ],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss'
})
export class InscriptionComponent {
  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild('inscriptionForm') inscriptionForm: MatStepper;

  options1: Reference[] = [];
  options2: Reference[] = [];
  options3: Reference[] = [];

  selectedValue1: string;
  selectedValue2: string;
  selectedValue3: string;
  filiere: string;

  niveau:string;

  cin = new FormControl();

  inscription:Inscription={
    cne:'',
    nom:'',
    prenom:'',
    cin:'',
    tel:'',
    email:'',
    niveau:'',
    AdressePersonnelle:'',
    dateNaissance:'',
    choixs: [],
    diplomes:[],
  }

  choix:Choix={
    concour:{
      reference:''
    }
  }
  choix1:Choix={
    concour:{
      reference:''
    }
  }
  choix2:Choix={
    concour:{
      reference:''
    }
  }
  
  diplome: Diplome = {
    refDiplome: '',
    anneeObtention: null,
    mention: '',
    note: 0,
    semestres: [] // Initialize semestres array
  };
  diplome2: Diplome = {
    refDiplome: '',
    anneeObtention: null,
    mention: '',
    note: 0,
    semestres: [] // Initialize semestres array
  };

  semestre1:Semestre={
    refSemestre:'semestre_1',
    note:null
  }
  semestre6:Semestre={
    refSemestre:'semestre_6',
    note:null
  }
  semestre2:Semestre={
    refSemestre:'semestre_2',
    note:null
  }
  semestre3:Semestre={
    refSemestre:'semestre_3',
    note:null
  }
  semestre4:Semestre={
    refSemestre:'semestre_4',
    note:null
  }
  semestre5:Semestre={
    refSemestre:'semestre_5',
    note:null
  }


  filieres:Filiere[]
  
  model:NgbDateStruct;


  ngOnInit(): void{
    this.route.params.subscribe(params => {
      this.niveau = params['niveau'];
    });
    console.log(this.niveau);
    this.filiereService.getFilieresData().subscribe(
      (response) => {
        console.log('inscription data sent successfully:', response);
            this.filieres=response;
        },
        (error) => {
          console.error('Error getting fields data:', error);
        }
    );
  }


  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private ngbDateParserFormatter: NgbDateParserFormatter,private datePipe: DatePipe,private filiereService:FiliereService,private route: ActivatedRoute,private _formBuilder: FormBuilder,private inscriptionService:InscriptionService,private concoursService:ConcourService) {}
  updateOptions(selectedValue: string, selectNumber: number) {
    // Remove the selected value from other select elements
    if (selectNumber !== 1) {
      this.options2 = this.options2.filter(option => option.reference !== selectedValue);
      this.options3 = this.options3.filter(option => option.reference !== selectedValue);
    }
    if (selectNumber !== 2) {
      this.options1 = this.options1.filter(option => option.reference !== selectedValue);
      this.options3 = this.options3.filter(option => option.reference !== selectedValue);
    }
    if (selectNumber !== 3) {
      this.options1 = this.options1.filter(option => option.reference !== selectedValue);
      this.options2 = this.options2.filter(option => option.reference !== selectedValue);
    }
  }

  updateFiliere(filiere:string) {
    this.concoursService.getAllConcoursDataByFiliere(filiere,this.niveau).subscribe(
      (response) => {
        console.log('inscription data sent successfully:', response);
          this.options1=response;
          this.options2=response;
          this.options3=response;
        },
        (error) => {
          console.error('Error getting concours data:', error);
        }
    );  }
  submitForm(){
    this.inscription.niveau=this.niveau;

    this.diplome.semestres.push(this.semestre1,this.semestre2,this.semestre3,this.semestre4);
    this.inscription.diplomes.push(this.diplome);

    if( this.niveau === 'MASTER' || this.niveau === 'CYCLE_D_INGENIEUR_2'){
    this.diplome2.semestres.push(this.semestre5,this.semestre6);
    this.inscription.diplomes.push(this.diplome2);
    }
    this.choix.concour.reference=this.selectedValue1
    this.choix1.concour.reference=this.selectedValue2
    this.choix2.concour.reference=this.selectedValue3
    this.inscription.choixs.push(this.choix,this.choix1,this.choix2)
  
    this.inscription.cin=this.cin.value;
    if (this.model) {
      this.inscription.dateNaissance = this.datePipe.transform(this.ngbDateParserFormatter.format(this.model), 'yyyy-MM-dd');
    } else {
      this.inscription.dateNaissance = ''; // or any default value
    }
    console.log(this.inscription);
    this.inscriptionService.addInscription(this.inscription).subscribe(
      (response) => {
        console.log('inscription data sent successfully:', response);
          Swal.fire('Success', 'The application for Exam has been registred successfully!', 'success');
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
    this.stepper.reset();

    this.inscription={
      cne:'',
      nom:'',
      prenom:'',
      cin:'',
      tel:'',
      email:'',
      niveau:'',
      AdressePersonnelle:'',
      dateNaissance:'',
      choixs: [],
      diplomes:[],
    }
    this.diplome={
      refDiplome: '',
      anneeObtention: null,
      mention: '',
      note: 0,
      semestres: []
    }
    this.diplome2={
      refDiplome: '',
      anneeObtention: null,
      mention: '',
      note: 0,
      semestres: []
    }
    this.options1= [];
    this.options2= [];
    this.options3= [];
  }
}
