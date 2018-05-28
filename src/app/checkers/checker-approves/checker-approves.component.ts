import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { ServerService } from '../../server.service';
import { environment } from '../../../environments/environment';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Asset } from '../../models/asset.model';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-checker-approves',
  templateUrl: './checker-approves.component.html'
})
export class CheckerApprovesComponent implements OnInit {
  public dataTable: DataTable;
  public assetList: Asset[];
  // public assetApprove: Asset[];
  public assetAppSelect: DataTable[];
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
    this.server.getDepositChecker().subscribe(res => {
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
  onApprove(asset: Asset, approveType: string) {
    asset.Approve2By = JSON.parse(localStorage.getItem('profileBackend')).userid;
    asset.Status = approveType;
    this.server.approveDepositChecker(asset).subscribe((res) => {
      console.log('Approved: ' + JSON.stringify(res));
      this.loadAsset();
    });
    return false;
  }

}

