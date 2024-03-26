import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChoixInscription } from 'src/app/model/inscription.model';
import { Result } from 'src/app/model/result.model';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private apiUrl = 'http://localhost:8090/FilRouge/api/result/';

  constructor(private http: HttpClient) { }

  addModulesNotes(result:Result): Observable<Result> {
    return this.http.put<Result>(`${this.apiUrl}`, result);
  }

  updateStatus(results:ChoixInscription[],prefix:string): Observable<Result> {
    return this.http.put<Result>(`${this.apiUrl}${prefix}`, results);
  }

  updateOralNote(result:Result): Observable<Result> {
    return this.http.put<Result>(`${this.apiUrl}oral`, result);
  }
}
