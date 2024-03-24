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

  getAllAdmisSeatsInscriptionByConcour(reference:string): Observable<InscriptionResult[]> {
    return this.http.get<InscriptionResult[]>(`${this.apiUrl}admisSeat/${reference}`);
  }

  getAllPreselectionSeatsInscriptionByConcour(reference:string): Observable<InscriptionResult[]> {
    return this.http.get<InscriptionResult[]>(`${this.apiUrl}preselectionSeat/${reference}`);
  }

  getAllOralSeatsInscriptionByConcour(reference:string): Observable<InscriptionResult[]> {
    return this.http.get<InscriptionResult[]>(`${this.apiUrl}oralSeat/${reference}`);
  }

}
