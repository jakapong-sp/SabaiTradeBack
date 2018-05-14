import { Injectable } from '@angular/core';
import {
  Http,
  Response,
  Headers,
  RequestOptions,
  RequestMethod
} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { environment } from 'environments/environment';

import { Asset } from './models/asset.model';
@Injectable()
export class ServerService {
   private headers = new Headers({ 'Content-Type': 'application/json' });
   private baseUrl = `http://localhost:3000/`;  // don't use local in case of cross domain or ip address
//   private baseUrl = environment.node_static_url;
//   private loginUrl = `${this.baseUrl}/api/login`;
//   private logoutUrl = `${this.baseUrl}/api/logout`;
//   private productUrl = `${this.baseUrl}/api/product`;
//   private transactionUrl = `${this.baseUrl}/api/transaction`;
//   private reportUrl = `${this.baseUrl}/api/report`;

private assetUrl = `${this.baseUrl}api/asset`;

  employeeList: Asset[];

  constructor(private http: Http) { }


//   getAssetList() {
//     const url = `${this.productUrl}/`;
//     this.http.get(url)
//     .map((data: Response) => {
//       return data.json() as Asset[];
//     }).toPromise().then(x => {
//       this.employeeList = x;
//       console.log(this.employeeList);
//     })
//   }

  getAssetList() {
    const body = {};
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({method: RequestMethod.Get, headers: headerOptions});
    return this.http
      .get(environment.url_static_api + '/api/assets', requestOptions)
      .map(res => res.json());
  }

  getAssetArray(): Observable < Asset[] > {
    const body = {};
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({method: RequestMethod.Get, headers: headerOptions});
    return this.http
      .get(environment.url_static_api + '/api/assets', requestOptions)
      .map(res => res.json());
  }


  getDeposits(): Observable < Asset[] > {
    const body = {};
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({method: RequestMethod.Get, headers: headerOptions});
    return this.http
    .get(this.assetUrl, requestOptions)
    .map(res => res.json());
  }


  approveDeposits(asset: Asset): Observable<void> {
    const body = {
      AssetRef: asset.AssetRef,
      Status: 'Approve1',
      Approve1By: asset.CreateBy,
      Approve1Date: new Date()
    };
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({method: RequestMethod.Put, headers: headerOptions});
    return this.http
      .put(this.assetUrl, body, requestOptions)
      .map(res => res.json());
  }


}