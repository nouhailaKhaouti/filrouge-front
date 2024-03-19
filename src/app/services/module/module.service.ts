import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConcoursModule,Module } from 'src/app/model/module.model';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  private apiUrl = 'http://localhost:8090/FilRouge/api/module/';

  constructor(private http: HttpClient) { }

  addModule(module:ConcoursModule): Observable<Module> {
    return this.http.post<Module>(`${this.apiUrl}`, module);
  }

  deleteModule(reference: string): Observable<Module> {
    return this.http.delete<Module>(`${this.apiUrl}${reference}`);
  }
}
