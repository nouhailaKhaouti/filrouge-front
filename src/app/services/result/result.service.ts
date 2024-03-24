import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  preselection(results:Result[]): Observable<Result> {
    return this.http.put<Result>(`${this.apiUrl}preselection`, results);
  }

  writing(result:Result[]): Observable<Result> {
    return this.http.put<Result>(`${this.apiUrl}writing`, result);
  }

  admis(result:Result[]): Observable<Result> {
    return this.http.put<Result>(`${this.apiUrl}admis`, result);
  }

  updateOralNote(result:Result): Observable<Result> {
    return this.http.put<Result>(`${this.apiUrl}oral`, result);
  }
}
