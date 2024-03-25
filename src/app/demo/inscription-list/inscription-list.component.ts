import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  @ViewChild('seats') listModal: any;
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
  name:string
  prefix:string
  nbrPlaces:number;
  modules:NoteModule[]=[]
  checkedInscriptions: Set<string> = new Set();
  inscriptions:InscriptionResult[]=[]
  inscriptionsSeats:InscriptionResult[]=[]
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
  results:Result[]=[];

  checkedMap: { [key: string]: boolean } = {};


  constructor(private http: HttpClient,private route: ActivatedRoute,private choixService:ChoixService,private resultService:ResultService) { }

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
          console.log(response);

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
          console.log(response);

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
          console.log(response);

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
          console.log(response);

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

  isBeforeEcritDate(): boolean {
    const currentDate = new Date();
    return currentDate < new Date(this.concour.dateConcoursEcrit);
  }

  isBetweenEcritAndOralDate(): boolean {
    const currentDate = new Date();
    const ecritDate = new Date(this.concour.dateConcoursEcrit);
    const oralDate = new Date(this.concour.dateConcoursOral);
    return currentDate >= ecritDate && currentDate < oralDate;
  }

  isAfterOralDate(): boolean {
    const currentDate = new Date();
    const oralDate = new Date(this.concour.dateConcoursOral);
    return currentDate >= oralDate;
  }

  PdfGenerate(): void {
    console.log("here");
      const token = localStorage.getItem('token');
  
      if (token) {
        const url = `http://localhost:8090/FilRouge/api/choix/pdf/all/${this.concour.reference}`;
  
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
  
        this.http.get(url, { headers: headers, responseType: 'blob' }).subscribe(response => {
          const file = new Blob([response], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL, '_blank');
        }, error => {
          console.error('Error fetching PDF:', error);
        });
      } else {
        console.error("Token not found in local storage");
      }
  }

  isCheckboxDisabled(index: string): boolean {
    return this.checkedInscriptions.size >= this.nbrPlaces && !this.checkedInscriptions.has(index);
  }

  isChecked(inscription: InscriptionResult): boolean {
    return this.checkedInscriptions.has(inscription.cin);
  }

  toggleCheck(inscription: InscriptionResult): void {
    if (this.checkedInscriptions.has(inscription.cin)) {
      this.checkedInscriptions.delete(inscription.cin);
    } else {
      if (this.checkedInscriptions.size < this.nbrPlaces) {
      this.checkedInscriptions.add(inscription.cin);
      }else{
        Swal.fire("info","you can't check more the "+this.nbrPlaces+ " student ","info")
      }
    }
  }

  openListModal(name:string){
     this.name=name;
    if(name=='admis'){
      this.choixService.getAllAdmisSeatsInscriptionByConcour(this.concour.reference).subscribe(
        (response: InscriptionResult[]) => {
          console.log(response);
          this.inscriptionsSeats = response;
          this.compare();
          this.nbrPlaces=this.concour.nbreplace;
        },
        error => {
          console.log(error);
        }
      );
    }
  
    if(name=='preselection'){
      this.choixService.getAllPreselectionSeatsInscriptionByConcour(this.concour.reference).subscribe(
        (response: InscriptionResult[]) => {
          this.inscriptionsSeats = response;
          this.compare();
          this.nbrPlaces=this.concour.nbreplaceConcoursEcrit;
          console.log(this.nbrPlaces);

        },
        error => {
          console.log(error);
        }
      );
    }
  
    if(name=='oral'){
      this.choixService.getAllOralSeatsInscriptionByConcour(this.concour.reference).subscribe(
        (response: InscriptionResult[]) => {
          console.log(response);
          this.inscriptionsSeats = response;
          this.compare();
          this.nbrPlaces=this.concour.nbreplaceConcoursOral;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  compare(){
    this.listModal.nativeElement.classList.add('show');
    this.listModal.nativeElement.style.display = 'block';
    this.inscriptions.forEach(inscription1 => {
      const existsInList2 = this.inscriptionsSeats.some(inscription2 => inscription2.cin === inscription1.cin);
      if(existsInList2){
      this.checkedInscriptions.add(inscription1.cin);
      }
    });
    this.search();
  }

  closeListModal(){
    this.listModal.nativeElement.classList.add('hide');
    this.listModal.nativeElement.style.display = 'none';
    this.checkedMap={};
  }

  searchTerm: string = '';
  visibleRows: boolean[] = []; 

  search(): void {
    for (let i = 0; i < this.inscriptions.length; i++) {
      if (this.inscriptions[i].cin.toLowerCase().includes(this.searchTerm.toLowerCase())) {
        this.visibleRows[i] = true;
      } else {
        this.visibleRows[i] = false;
      }
    }
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.visibleRows.fill(true);
  }

  submitSeatForm(): void {
    const result:Result={
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
    this.checkedInscriptions.forEach(ch=>{
          result.choix.inscription.cin=ch;
          result.choix.inscription.niveau=this.concour.niveau;
          result.choix.concour.reference=this.concour.reference;
          this.results.push(result);
    })
    console.log(this.results);
    this.resultService.updateStatus(this.results,this.name).subscribe(
      (response) => {
        console.log('Module data sent successfully:', response);
          Swal.fire('Success', 'Student status has been updated!', 'success');
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
    this.closeListModal();
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
