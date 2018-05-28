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
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-maker-approves',
  templateUrl: './maker-approves.component.html'
})
export class MakerApprovesComponent implements OnInit {
  public dataTable: DataTable;
  public assetList: Array<Asset>;
  public assetApprove: Asset[];
  public asset: Asset;
  private userList: Array<User>;
  private totalDepNum: number;
  private totalWithNum: number;
  public totalDep: number;
  public totalWith: number;
  isLoading = false;
  errorMsg = '';
  constructor(private server: ServerService, private http: Http) { }

  ngOnInit() {
    this.dataTable = {
      headerRow: ['Ref', 'FirstName', 'DateTime', 'Type', 'CreateBy', 'Request', 'Amount', 'Status'],
      footerRow: ['Ref', 'FirstName', 'DateTime', 'Type', 'CreateBy', 'Request', 'Amount', 'Status'],
      dataRows: []
    };
    this.loadAsset();
  }

  loadAsset() {
    this.isLoading = true;
    this.totalDepNum = 0; this.totalWithNum = 0;
    this.server.getDepositMaker().subscribe(res => {
      res.forEach(dep => {
        // dep.CreateBy = 'golf';
        if (dep.AssetType === 'Deposit' && dep.Amount != null) {
          this.totalDepNum += parseFloat(dep.Amount);
        }
        if (dep.AssetType === 'Withdraw' && dep.Amount != null) {
          this.totalWithNum += parseFloat(dep.Amount);
        }
      });
      this.assetList = res;
      this.totalDep = this.totalDepNum;
      this.totalWith = this.totalWithNum;
      this.isLoading = false;
    }, error => {
      this.errorMsg = error;
      this.isLoading = false;
    });
    // this.dataTable.dataRows = [];
    // this.server.getDeposits().subscribe(asset => {
    //   this.assetList = asset;
    //   this.assetList.forEach(item => {
    //     this.dataTable.dataRows.push([
    //       item.AssetRef, item.mem[0].FirstName, item.CreateDate, item.AssetType, item.CreateBy,
    //       'Wait', item.AmountRequest.toString(), ''
    //     ]);
    //   });
    // });
  }

  onSearch(search: string) {
    if (search === '') {
      this.loadAsset();
    } else {
      this.totalDep = 0; this.totalWith = 0;
      this.assetList = this.assetList.filter(item => item.MemberLookup[0].FirstName.toString().includes(search));
      this.totalDep = this.assetList.filter(data => data.AssetType === 'Deposit').filter(item => item.Amount)
      .map(item => parseFloat(item.Amount))
      .reduce((sum, current) => sum + current);

      this.totalWith = this.assetList.filter(data => data.AssetType === 'Withdraw').filter(item => item.Amount)
      .map(item => parseFloat(item.Amount))
      .reduce((sum, current) => sum + current);

    }

  }
  // onSearch() {
  //     this.loadAsset();
  // }
  onApprove(asset: Asset) {
    asset.Approve1By = JSON.parse(localStorage.getItem('profileBackend')).userid;

    if (asset.AssetType === 'Withdraw') {
      asset.Note = asset.AmountRequest;
      // asset.Amount = asset.AmountRequest;
    }
    console.log(asset);
    this.server.approveDepositMaker(asset).subscribe((res) => {
      console.log('Approved: ' + JSON.stringify(res));
      this.loadAsset();
    });
    return false;
  }

  setFormatCurrency(event) {
    const amount = event.target.value;
    let amt = event.target.value.replace(/[^\d\.\-\ ]/g, '');
    if (isNumeric(amt) === false) { return ''; };
    if (amt.length > 3) {
      const numVal = parseInt(amt, 10);
      amt = numVal.toString().split('').reverse().reduce(function (acc, amt, i, orig) {
        return amt + (i && !(i % 3) ? ',' : '') + acc;
      }, '');
    }
    event.target.value = amt;
    return amount;
  }


}
