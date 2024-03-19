import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filiere } from 'src/app/model/councour.model';

@Injectable({
  providedIn: 'root'
})
export class FiliereService {
  private apiUrl = 'http://localhost:8090/FilRouge/api/filiere/';

  constructor(private http: HttpClient) { }

  addFiliere(Filiere:Filiere): Observable<Filiere> {
    return this.http.post<Filiere>(`${this.apiUrl}`, Filiere);
  }
  getFilieresData(): Observable<Filiere[]> {
    return this.http.get<Filiere[]>(`${this.apiUrl}`);
  }

  deleteFiliere(reference: string,departement:string): Observable<Filiere> {
    return this.http.delete<Filiere>(`${this.apiUrl}${reference}/${departement}`);
  }
}
