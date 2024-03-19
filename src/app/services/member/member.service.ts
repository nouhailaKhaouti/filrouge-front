import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/model/member.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private apiUrl = 'http://localhost:8090/FilRouge/api/member/';

  constructor(private http: HttpClient) { }


  getMembersData(params: any): Observable<any> {
    let httpParams = new HttpParams()
      .set('page', params['page'])
      .set('size', params['size']);
  
    if (params['search'] !== undefined) {
      httpParams = httpParams.set('search', params['search']);
    }
  
    return this.http.post<any>(`${this.apiUrl}Members`, null, {
      reportProgress: true,
      params: httpParams
    });
  }

  addMemberData(Member: Member): Observable<Member> {
    return this.http.post<Member>(`${this.apiUrl}`, Member);
  }

  accountApproved(params: any): Observable<any> {
    let httpParams = new HttpParams()
    .set('member', params['member']);
   return this.http.put<any>(`${this.apiUrl}approve`, null, {
      reportProgress: true,
      params: httpParams
    });  
  }

  deleteMember(Member: Member): Observable<Member> {
    return this.http.delete<Member>(`${this.apiUrl}${Member.num}`);
  }

  changeRole(role: string, num: Number): Observable<Member> {
    return this.http.put<Member>(`${this.apiUrl}${role}/${num}`, null);
  }
}
