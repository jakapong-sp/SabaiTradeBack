import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { ServerService } from '../../server.service';
import { environment } from '../../../environments/environment';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Asset } from '../../models/asset.model';
import { Observable } from 'rxjs/Observable';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;
declare var swal: any;

@Component({
  selector: 'app-depwith',
  templateUrl: './depwith.component.html'
})
export class DepwithComponent implements OnInit {
  public dataTable: DataTable;
  public assetList: Asset[];
  public assetArray: Observable<Asset[]>;
  public assetApprove: Asset[];
  public assetAppSelect: DataTable[];

  constructor(private server: ServerService, private http: Http) { }


  ngOnInit() {
    // assetArray = [['Airi Satou', 'Andrew Mike', 'Develop', '2013', '99,225', '']];
    // this.loadAsset();

    this.dataTable = {
      headerRow: ['Ref', 'FirstName', 'DateTime', 'Type', 'CreateBy', 'Amount', 'Status'],
      footerRow: ['Ref', 'FirstName', 'DateTime', 'Type', 'CreateBy', 'Amount', 'Status'],
      dataRows: []
    };
    // this.assetArray = this.server.getDeposits();
    // this.dataTable.dataRows.push(
    //   ['c', 'Andrew Mike', 'Develop', '2013', '99,225', ''],
    //   ['t', 'John Doe', 'Design', '2012', '89,241', '']
    // );
    this.loadAsset();
  }

  loadAsset() {
    this.assetArray = this.server.getDeposits();
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

  onApprove(asset: Asset) {
    const userid = JSON.parse(localStorage.getItem('profileBackend')).userid;
    this.server.approveDeposits(asset, userid).subscribe((result) => {
      console.log('Approved: ' + JSON.stringify(result));
      this.loadAsset();
    });
    // this.assetArray = this.server.getDeposits();
    return false;
  }

  onApprove2(asset: DataTable) {
    const userid = JSON.parse(localStorage.getItem('profileBackend')).userid;
    this.server.approveDepositsMaker(asset[0], userid).subscribe(() => {
      // console.log('Approved: ' + JSON.stringify(result));
      this.loadAsset();
    });
    // this.assetArray = this.server.getDeposits();
    // return false;
  }




  addAsset() {
    this.assetArray = this.server.getAssetArray();
    this.server.getAssetList().subscribe(asset => {
      this.assetArray = asset;
    });
  }
}
