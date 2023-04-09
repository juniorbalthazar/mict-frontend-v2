import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  loginStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {

    const headers = new  HttpHeaders();
    headers.append('Access-Control-Allow-Origin: *', 'application/json');
    const params = new HttpParams().set('username', username).set('password', password);
    return this.http.post<any>(`${environment.apiUrl}` + '/auth/signin', {}, {headers, params})
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.accessToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }



  register(user): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('currentUser'))['accessToken']);
    headers.append('Access-Control-Allow-Origin: *', 'application/json');
    const body = JSON.stringify(user);
    console.log(body);
    return this.http.post<any>(`${environment.apiUrl}` + '/signup', user, { headers });
  }

  public getUserDetail() {
    if (this.currentUserValue) {
      return this.currentUserValue;
    } else {
      return null;
    }
  }

  users(pageNumber: number, pageSize: number, query?: string): Observable<any>{
    const currentPage = pageNumber - 1;

    const headers = new  HttpHeaders();
    headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('currentUser'))['accessToken']);
    headers.append('Access-Control-Allow-Origin: *', 'application/json');

    let params = new HttpParams();
    params = params.append('pageSize', pageSize.toString());
    params = params.append('pageNumber', currentPage.toString());

    let request;

    if (!query){
      request = this.http.post<any>(`${environment.apiUrl}` + '/accountList', {}, {headers, params});
    }else {
      params = params.append('query', query);
      request = this.http.post<any>(`${environment.apiUrl}` + '/accountList', {}, {headers, params});
    }

    return request;
  }


}
