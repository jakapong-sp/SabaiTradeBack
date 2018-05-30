import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../server.service';
import { environment } from '../../../environments/environment';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Asset } from '../../models/asset.model';
import { Observable } from 'rxjs/Observable';
import { isNumeric } from 'rxjs/util/isNumeric';
import { NgForm } from '@angular/forms';
import { Order } from '../../models/order.model';

declare interface DataTable {
  headerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-swap-comm',
  templateUrl: './swap-comm.component.html'
})
export class SwapCommComponent implements OnInit {
  public dataTable: DataTable;
  public orderList: Array<Order>;

  public totalSwapNum: number;
  public totalCommNum: number;
  public totalSwap: number;
  public totalComm: number;
  isLoading = false;
  errorMsg = '';
  constructor(private server: ServerService, private http: Http) { }

  ngOnInit() {
    this.dataTable = {
      headerRow: ['Order', 'Member', 'Time', 'Type', 'Size', 'Price', 'Swap', 'Comm', 'Status'],
      dataRows: []
    };
    this.loadInit();
  }

  loadInit() {
    this.isLoading = true;
    this.totalSwapNum = 0;
    this.totalCommNum = 0;
    this.server.getOrderList().subscribe(result => {
      result.forEach(res => {
          this.totalSwapNum += parseFloat(res.Swap.toString());
          this.totalCommNum += parseFloat(res.Commission.toString());
      });
      this.orderList = result;
    }, error => {
      this.errorMsg = error;
      this.isLoading = false;
    }, () => {
      this.totalSwap = this.totalSwapNum;
      this.totalComm = this.totalCommNum;
      this.isLoading = false;
    });
  }

  onSearch(search: string) {
    if (search === '') {
      if (!this.isLoading) { // protect search many
        this.loadInit();
      }
    } else {
      this.totalSwap = 0;
      this.orderList = this.orderList.filter(item => item.MemberLookup[0].FirstName.toString().includes(search));
      this.totalSwap = this.orderList.filter(item => item.Swap)
      .map(item => parseFloat(item.Swap.toString()))
      .reduce((sum, current) => sum + current, 0);
      this.totalComm = this.orderList.filter(item => item.Swap)
      .map(item => parseFloat(item.Commission.toString()))
      .reduce((sum, current) => sum + current, 0);
    }
  }

}