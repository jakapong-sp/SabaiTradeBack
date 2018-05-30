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
  selector: 'app-order-profit',
  templateUrl: './order-profit.component.html'
})
export class OrderProfitComponent implements OnInit {
  public dataTable: DataTable;
  public orderList: Array<Order>;

  private totalProfitNum: number;
  public totalProfit: number;
  isLoading = false;
  errorMsg = '';
  constructor(private server: ServerService, private http: Http) { }

  ngOnInit() {
    this.dataTable = {
      headerRow: ['Order', 'Member', 'Time', 'Type', 'Size', 'Price', 'Profit'],
      dataRows: []
    };
    this.loadInit();
  }

  loadInit() {
    this.isLoading = true;
    this.totalProfitNum = 0;
    this.server.getOrderList().subscribe(result => {
      result.forEach(res => {
          this.totalProfitNum += parseFloat(res.Profit.toString());
      });
      this.orderList = result;
    }, error => {
      this.errorMsg = error;
      this.isLoading = false;
    }, () => {
      this.totalProfit = this.totalProfitNum;
      this.isLoading = false;
    });
  }

  onSearch(search: string) {
    if (search === '') {
      if (!this.isLoading) { // protect search many
        this.loadInit();
      }
    } else {
      this.totalProfit = 0;
      this.orderList = this.orderList.filter(item => item.MemberLookup[0].FirstName.toString().includes(search));
      this.totalProfit = this.orderList.filter(item => item.Profit)
      .map(item => parseFloat(item.Profit.toString()))
      .reduce((sum, current) => sum + current, 0);
    }
  }

}


