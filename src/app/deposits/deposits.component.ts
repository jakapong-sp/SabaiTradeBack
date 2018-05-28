import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { ServerService } from '../server.service';
import { environment } from '../../environments/environment';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Asset } from '../models/asset.model';
import { Observable } from 'rxjs/Observable';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;
declare var swal: any;

@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.component.html',
  styleUrls: ['./deposits.component.scss']
})
export class DepositsComponent implements OnInit, AfterViewInit {
  public dataTable: DataTable;
  public assetList: Asset[];
  public assetArray: Observable<Asset[]>;
  public assetApprove: Asset[];

  constructor(private server: ServerService, private http: Http, private _ngZone: NgZone) { }


  ngOnInit() {
    // assetArray = [['Airi Satou', 'Andrew Mike', 'Develop', '2013', '99,225', '']];
    // this.loadAsset();

    this.dataTable = {
      headerRow: ['Ref', 'FirstName', 'DateTime', 'Type', 'CreateBy', 'Status', 'Amount', 'Action'],
      footerRow: ['Ref', 'FirstName', 'DateTime', 'Type', 'CreateBy', 'Status', 'Amount', 'Action'],
      dataRows: []
    };
    this.assetArray = this.server.getDeposits();
    // this.dataTable.dataRows.push(
    //   ['c', 'Andrew Mike', 'Develop', '2013', '99,225', ''],
    //   ['t', 'John Doe', 'Design', '2012', '89,241', '']
    // );
    // this.loadAsset();
  }

  addAsset() {
    // this.assetArray = this.server.getAssetArray();
    // this.server.getAssetList().subscribe(asset => {
    //   this.assetArray = asset;
    // });
  }
  onApprove(asset: Asset) {
    // this.server.approveDeposits(asset, '').subscribe((result) => {
    //   console.log('Approved: ' + JSON.stringify(result));
    // });
    this.assetArray = this.server.getDeposits();
    return false;
  }

  loadAsset() {
    this.server.getDeposits().subscribe(asset => {
      this.assetList = asset;
      this.assetList.forEach(item => {
        this.dataTable.dataRows.push([
          item.AssetRef, 'Jakapong.sp', item.CreateDate.toString(), item.AssetType, 'U0001',
          'Wait', item.AmountRequest.toString(), ''
        ]);
      });
    });
  }

  ngAfterViewInit() {
    //  this.initDataTable();
    // $('#datatables').DataTable({
    //   'pagingType': 'full_numbers',
    //   'lengthMenu': [
    //     [10, 25, 50, -1],
    //     [10, 25, 50, 'All']
    //   ],
    //   responsive: true,
    //   language: {
    //     search: '_INPUT_',
    //     searchPlaceholder: 'Search records',
    //   }
    // });

    // const table = $('#datatables').DataTable();

    // Edit record
    // table.on('click', '.edit', function () {
    //   const $tr = $(this).closest('tr');

    //   const data = table.row($tr).data();
    //   // alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');

    // });

    // // Delete a record
    // table.on('click', '.remove', function (e) {
    //   const $tr = $(this).closest('tr');
    //   table.row($tr).remove().draw();
    //   e.preventDefault();
    // });

    // // Like record
    // table.on('click', '.like', function () {
    //   alert('You clicked on Like button');
    //   return false;
    // });

    // $('.card .material-datatables label').addClass('form-group');

  }
}
