import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inscription, InscriptionResult } from 'src/app/model/inscription.model';

@Injectable({
  providedIn: 'root'
})
export class ChoixService {
  private apiUrl = 'http://localhost:8090/FilRouge/api/choix/';

  constructor(private http: HttpClient) { }


  getAllInscriptionByConcourPdf(reference:string): Observable<Inscription[]> {
    return this.http.get<Inscription[]>(`${this.apiUrl}${reference}`);
  }

  getAllPreselectionInscriptionByConcourPdf(reference:string): Observable<Inscription[]> {
    return this.http.get<Inscription[]>(`${this.apiUrl}pdf/preselection/${reference}`);
  }

  getAllWritingInscriptionByConcourPdf(reference:string): Observable<InscriptionResult[]> {
    return this.http.get<InscriptionResult[]>(`${this.apiUrl}pdf/writing/${reference}`);
  }

  getAllAdmisInscriptionByConcourPdf(reference:string): Observable<InscriptionResult[]> {
    return this.http.get<InscriptionResult[]>(`${this.apiUrl}pdf/admis/${reference}`);
  }
  getAllInscriptionByConcour(reference:string): Observable<InscriptionResult[]> {
    return this.http.get<InscriptionResult[]>(`${this.apiUrl}${reference}`);
  }

  getAllPreselectionInscriptionByConcour(reference:string): Observable<InscriptionResult[]> {
    return this.http.get<InscriptionResult[]>(`${this.apiUrl}preselection/${reference}`);
  }

  getAllWritingInscriptionByConcour(reference:string): Observable<InscriptionResult[]> {
    return this.http.get<InscriptionResult[]>(`${this.apiUrl}writing/${reference}`);
  }

  getAllAdmisInscriptionByConcour(reference:string): Observable<InscriptionResult[]> {
    return this.http.get<InscriptionResult[]>(`${this.apiUrl}admis/${reference}`);
  }

}
