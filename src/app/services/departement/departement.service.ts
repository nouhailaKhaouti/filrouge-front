import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departement } from 'src/app/model/departement.model';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {


  private apiUrl = 'http://localhost:8090/FilRouge/api/departement/';

  constructor(private http: HttpClient) { }

  addDepartement(departement:Departement): Observable<Departement> {
    return this.http.post<Departement>(`${this.apiUrl}`, departement);
  }
  getDepartementsData(): Observable<Departement[]> {
    return this.http.get<Departement[]>(`${this.apiUrl}`);
  }

  deleteDepartement(reference: string): Observable<Departement> {
    return this.http.delete<Departement>(`${this.apiUrl}${reference}`);
  }
}
