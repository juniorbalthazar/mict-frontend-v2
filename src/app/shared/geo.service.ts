import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(public http: HttpClient) { }

  departements() {
    const headers = new HttpHeaders();
    return this.http.get<any>(`${environment.apiUrl}` + '/auth/departments/', {headers});

  }

  communes(deptId) {
    const headers = new HttpHeaders();
    return this.http.get<any>(`${environment.apiUrl}` + '/auth/commune/' + deptId, { headers });
  }

}
