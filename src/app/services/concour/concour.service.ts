import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Concour } from 'src/app/model/councour.model';

@Injectable({
  providedIn: 'root'
})
export class ConcourService {
  private apiUrl = 'http://localhost:8090/FilRouge/api/concour/';

  constructor(private http: HttpClient) { }

  addConcour(Concour: Concour): Observable<Concour> {
    return this.http.post<Concour>(`${this.apiUrl}`, Concour);
  }

  getAllConcoursData(): Observable<Concour[]> {
    return this.http.get<Concour[]>(`${this.apiUrl}`);
  }

  getAllConcoursDataByFiliere(filiere: string,niveau:string): Observable<Concour[]> {
    return this.http.get<Concour[]>(`${this.apiUrl}Filiere/${filiere}/${niveau}`);
  }

  getConcoursData(reference:string): Observable<Concour> {
    return this.http.get<Concour>(`${this.apiUrl}${reference}`);
  }

}
