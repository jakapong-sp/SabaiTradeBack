import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../server.service';
import { environment } from '../../../environments/environment';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Asset } from '../../models/asset.model';
import { Observable } from 'rxjs/Observable';
import { isNumeric } from 'rxjs/util/isNumeric';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user';

declare interface DataTable {
  headerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-withdrawals',
  templateUrl: './withdrawals.component.html'
})
export class WithdrawalsComponent implements OnInit {
  public dataTable: DataTable;
  public assetList: Array<Asset>;
  private totalNum: number;
  public total: number;
  isLoading = false;
  errorMsg = '';
  constructor(private server: ServerService, private http: Http) { }

  ngOnInit() {
    this.dataTable = {
      headerRow: ['Ref', 'FirstName', 'DateTime', 'Amount'],
      dataRows: []
    };
    this.loadAsset();
  }

  loadAsset() {
    this.isLoading = true;
    this.totalNum = 0;
    this.server.getWithdrawAccount().subscribe(res => {
      res.forEach(dep => {
        if (dep.Amount != null) {
          this.totalNum += parseFloat(dep.Amount);
        }
      });
      this.assetList = res;
    }, error => {
      this.errorMsg = error;
      this.isLoading = false;
    }, () => {
      this.total = this.totalNum;
      this.isLoading = false;
    });
  }

  onSearch(search: string) {
    if (search === '') {
      if (!this.isLoading) { // protect search many
        this.loadAsset();
      }
    } else {
      this.total = 0;
      this.assetList = this.assetList.filter(item => item.MemberLookup[0].FirstName.toString().includes(search));
      this.total = this.assetList.filter(item => item.Amount)
        .map(item => parseFloat(item.Amount))
        .reduce((sum, current) => sum + current, 0);
    }
  }



}


