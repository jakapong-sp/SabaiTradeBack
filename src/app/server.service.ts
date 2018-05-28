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
import { environment } from 'environments/environment';
import { Asset } from './models/asset.model';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

@Injectable()
export class ServerService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private baseUrl = environment.node_static_url + '/';  // don't use local in case of cross domain or ip address
  //   private baseUrl = environment.node_static_url;
  //   private loginUrl = `${this.baseUrl}/api/login`;
  //   private logoutUrl = `${this.baseUrl}/api/logout`;
  //   private productUrl = `${this.baseUrl}/api/product`;
  //   private transactionUrl = `${this.baseUrl}/api/transaction`;
  //   private reportUrl = `${this.baseUrl}/api/report`;

  private assetUrl = `${this.baseUrl}api/asset`;

  employeeList: Asset[];

  constructor(private http: Http) { }



  // #region Asset

  // #region Checker
  getDepositChecker(): Observable<Asset[]> {
    const body = {};
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headerOptions });
    return this.http
      .get(this.baseUrl + 'api/assetchecker', requestOptions)
      .map(res => res.json());
  }

  approveDepositChecker(asset: Asset): Observable<void> {
    // debugger;
    const body = {
      AssetRef: asset.AssetRef,
      Status: asset.Status,
      Approve2By: asset.Approve2By,
      Approve2Date: new Date()
    };

    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http
      .put(this.baseUrl + 'api/assetchecker', body, requestOptions)
      .map(res => res.json());
  }
  // #endregion


  // #region Maker
  getDepositMaker(): Observable<Asset[]> {
    const body = {};
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headerOptions });
    return this.http
      .get(this.baseUrl + 'api/assetmaker', requestOptions)
      .map(res => res.json());
  }

  approveDepositMaker(asset: Asset): Observable<void> {
    // debugger;
    const body = {
      AssetRef: asset.AssetRef,
      Amount: asset.Note.toString().replace(/[, ]+/g, '').trim(),
      Status: 'Approve1',
      Approve1By: asset.Approve1By,
      Approve1Date: new Date()
    };
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http
      .put(this.baseUrl + 'api/assetmaker', body, requestOptions)
      .map(res => res.json());
  }
  // #endregion

  // #endregion


  getAssetList() {
    const body = {};
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headerOptions });
    return this.http
      .get(environment.node_static_url + '/api/assets', requestOptions)
      .map(res => res.json());
  }

  getAssetArray(): Observable<Asset[]> {
    const body = {};
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headerOptions });
    return this.http
      .get(environment.node_static_url + '/api/assets', requestOptions)
      .map(res => res.json());
  }

  getDeposits(): Observable<Asset[]> {
    const body = {};
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headerOptions });
    return this.http
      .get(this.assetUrl, requestOptions)
      .map(res => res.json());
  }



  postDeposit(asset: Asset) {
    const memberref = JSON.parse(localStorage.getItem('profileBackend')).username;
    const body = {
      MemberRef: memberref,
      AssetType: 'Deposit',
      AmountRequest: asset.AmountRequest.toString().replace(/[, ]+/g, '').trim(),
      CreateBy: memberref
    };
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({
      method: RequestMethod.Post, headers: headerOptions
    });
    return this.http
      .post(this.assetUrl, body, requestOptions)
      .map(res => res.json());
  }

}
