import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inscription } from 'src/app/model/inscription.model';


@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  private apiUrl = 'http://localhost:8090/FilRouge/api/inscription/';

  constructor(private http: HttpClient) { }

  addInscription(inscription: Inscription): Observable<Inscription> {
    return this.http.post<Inscription>(`${this.apiUrl}`, inscription);
  }
}
