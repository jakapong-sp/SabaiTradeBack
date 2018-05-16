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
  selector: 'app-checker-approves',
  templateUrl: './checker-approves.component.html'
})
export class CheckerApprovesComponent implements OnInit {
  public dataTable: DataTable;
  public assetList: Asset[];
  public assetArray: Observable<Asset[]>;
  public assetApprove: Asset[];
  public assetAppSelect: DataTable[];

  constructor(private server: ServerService, private http: Http) { }

  ngOnInit() {
    this.dataTable = {
      headerRow: ['Ref', 'FirstName', 'DateTime', 'Type', 'CreateBy', 'Amount', 'Status'],
      footerRow: ['Ref', 'FirstName', 'DateTime', 'Type', 'CreateBy', 'Amount', 'Status'],
      dataRows: []
    };
    this.loadAsset();
  }

  loadAsset() {
    this.assetArray = this.server.getAssetChecker();
}

  onApprove(asset: Asset) {
    const userid = JSON.parse(localStorage.getItem('profileBackend')).userid;
    this.server.approveDeposits(asset, userid).subscribe((result) => {
      console.log('Approved: ' + JSON.stringify(result));
      this.loadAsset();
    });
    return false;
  }

  onApprove2(asset: DataTable) {
    const userid = JSON.parse(localStorage.getItem('profileBackend')).userid;
    this.server.approveDepositsMaker(asset[0], userid).subscribe(() => {
      this.loadAsset();
    });
  }

  addAsset() {
    this.assetArray = this.server.getAssetArray();
    this.server.getAssetList().subscribe(asset => {
      this.assetArray = asset;
    });
  }
}

