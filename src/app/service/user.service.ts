import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../domain/user-model';
import { Token } from '../domain/token.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  
  private url_user = 'http://localhost:8080/api/v1/auth/'; 

  constructor(private _http: HttpClient) { }

  public RegisterUser(user: User): Observable<Token>{

    return this._http.post<Token>(this.url_user+'register',user);
  }

  public loginUser(user: User): Observable<Token>{

    return this._http.post<Token>(this.url_user+'authenticate',user);
  } 
}
