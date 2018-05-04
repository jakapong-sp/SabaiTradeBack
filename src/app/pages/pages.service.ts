import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { environment } from 'environments/environment';

import { Router } from '@angular/router';
// import { Member } from '../models/member';
declare var swal: any;

@Injectable()
export class PagesService {

  constructor(private http: Http, private router: Router) { }

  getLogin(email: string, password: string) {
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({method: RequestMethod.Get, headers: headerOptions });
    return this.http
    .get(environment.url_static_api + '/api/members/login|' + email + '|' + password, requestOptions).map(x => x.json());
}

}
