import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { environment } from 'environments/environment';

import { Router } from '@angular/router';
import { User } from '../models/user';
declare var swal: any;

@Injectable()
export class PagesService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private baseUrl = `http://localhost:3000/`;
  private loginUrl = `${this.baseUrl}api/login`;
  private logoutUrl = `${this.baseUrl}api/logout`;
  constructor(private http: Http, private router: Router) { }

  getLogin(email: string, password: string) {
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headerOptions });
    return this.http
      .get(environment.url_static_api + '/api/members/login|' + email + '|' + password, requestOptions).map(x => x.json());
  }

  login(username: string, password: string) {
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({method: RequestMethod.Get, headers: headerOptions});
    const user = { 'Email': username, 'Password': password };
    const body = {
    };
    return this.http
      .post(this.loginUrl, JSON.stringify(user), requestOptions)
      .map(res => res.json());
  }

  logout(): Observable<any> {
    return this.http.get(this.logoutUrl);
  }


  getAssetArray(email: string, password: string) {
    const body = {};
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({method: RequestMethod.Get, headers: headerOptions});
    return this.http
      .get(environment.url_static_api + '/api/members/', requestOptions)
      .map(res => res.json());
  }

}
