import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Concour, Reference } from 'src/app/model/councour.model';
import { InscriptionResult } from 'src/app/model/inscription.model';
import { NoteModule, Result } from 'src/app/model/result.model';
import { ChoixService } from 'src/app/services/choix/choix.service';
import { ResultService } from 'src/app/services/result/result.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscription-list',
  standalone: true,
  imports: [FormsModule,
  SharedModule],
  templateUrl: './inscription-list.component.html',
  styleUrl: './inscription-list.component.scss'
})
export class InscriptionListComponent {
  @ViewChild('result') resultModal: any;
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
  }
  prefix:string
  modules:NoteModule[]=[]

  inscriptions:InscriptionResult[]=[]
  result:Result={
    choix:{
      concour:{
        reference:''
      },
      inscription:{
        cin:'',
        niveau:''
      }
    },
    noteModules:[],
    noteOral:null
  }

  constructor(private route: ActivatedRoute,private choixService:ChoixService,private resultService:ResultService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const concourString = params['concour'];
      const prefix = params['prefix'];
      if (concourString) {
        this.concour = JSON.parse(concourString);
        console.log(this.concour);
      }
      if (prefix) {
        this.prefix = prefix;
      }
    });
    this.retrieveInscription();
  }

  retrieveInscription(): void {

    if(this.prefix=='admis'){
    this.choixService.getAllAdmisInscriptionByConcour(this.concour.reference).subscribe(
      (response: InscriptionResult[]) => {
        this.inscriptions = response;
      },
      error => {
        console.log(error);
      }
    );
    }

    if(this.prefix=='all'){
    this.choixService.getAllInscriptionByConcour(this.concour.reference).subscribe(
      (response: InscriptionResult[]) => {
        this.inscriptions = response;
      },
      error => {
        console.log(error);
      }
    );
    }

    if(this.prefix=='preselection'){
    this.choixService.getAllPreselectionInscriptionByConcour(this.concour.reference).subscribe(
      (response: InscriptionResult[]) => {
        this.inscriptions = response;
      },
      error => {
        console.log(error);
      }
    );
    }

    if(this.prefix=='writing'){

    this.choixService.getAllWritingInscriptionByConcour(this.concour.reference).subscribe(
      (response: InscriptionResult[]) => {
        this.inscriptions = response;
      },
      error => {
        console.log(error);
      }
    );
    }
  }

addToModules(moduleReference: string, event:any): void {
  const note = parseFloat((event.target as HTMLInputElement).value);
  const existingModuleIndex = this.modules.findIndex(module => module.refModuleConcours === moduleReference);

  if (existingModuleIndex !== -1) {
    this.modules[existingModuleIndex].note = note;
  } else {
    const newModule: NoteModule = { refModuleConcours: moduleReference, note: note };
    this.modules.push(newModule);
  }
}

openModal(): void {
  this.resultModal.nativeElement.classList.add('show');
  this.resultModal.nativeElement.style.display = 'block';
  }

closeModal(): void {
  this.resultModal.nativeElement.classList.add('hide');
  this.resultModal.nativeElement.style.display = 'none';
  this.result.noteModules=this.modules;

}

writingResult(inscription: InscriptionResult): void {
    this.result.choix.inscription.cin=inscription.cin;
    this.result.choix.inscription.niveau=inscription.niveau;
    this.result.choix.concour.reference=this.concour.reference
    this.result.noteModules=this.modules;
    this.openModal();
}

submitForm(): void {
  console.log(this.result);
  this.resultService.addModulesNotes(this.result).subscribe(
    (response) => {
      console.log('Module data sent successfully:', response);
        Swal.fire('Success', 'Subjects Score are successfully registered!', 'success');
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
  this.closeModal();
  this.modules=[];
  this.result={
    choix:{
      concour:{
        reference:''
      },
      inscription:{
        cin:'',
        niveau:''
      }
    },
    noteModules:[],
    noteOral:null
  }
}

}
