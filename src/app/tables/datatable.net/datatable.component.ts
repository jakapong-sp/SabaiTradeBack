// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import { Component, OnInit, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';

import 'rxjs/add/observable/empty'
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { ServerService } from '../../server.service';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-data-table-cmp',
  templateUrl: 'datatable.component.html'
})

export class DataTableComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  public dataTable: DataTable;
  private isLoading = false;
  constructor(private server: ServerService, private http: Http) {

  }
  ngOnInit() {
    // this.dataTable = {
    //   headerRow: ['Name', 'Position', 'Office', 'Age', 'Date', 'Actions'],
    //   footerRow: ['Name', 'Position', 'Office', 'Age', 'Start Date', 'Actions'],

    //   dataRows: [
    //     ['Airi Satou', 'Andrew Mike', 'Develop', '2013', '99,225', ''],
    //     ['Angelica Ramos', 'John Doe', 'Design', '2012', '89,241', 'btn-round'],
    //     ['Ashton Cox', 'Alex Mike', 'Design', '2010', '92,144', 'btn-simple'],
    //     ['Bradley Greer', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
    //     ['Yuri Berry', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round']
    //   ]
    // };
    this.dataTable = {
      headerRow: ['Name', 'Position', 'Office', 'Age', 'Date', 'Actions'],
      footerRow: ['Name', 'Position', 'Office', 'Age', 'Start Date', 'Actions'],
      dataRows: []
    };
    this.loadData();

    // this.server.getDepositChecker().subscribe(res => {
    //   this.setDatatable();
    // }, () => {
    // });
  }

  loadData() {
    this.isLoading = true;
    this.server.getDepositMaker()
    .subscribe(
      res => {
        res.forEach(dep => {
          this.dataTable.dataRows.push([dep.AssetRef, dep.AssetType, dep.Status, dep.Amount, dep.AmountRequest, '']);
        });
        console.log('Observer got a next value: ' + res)
      },
      err => console.error('Observer got an error: ' + err),
      () => {
        // console.log(this.dataTable.dataRows.length);
        if (this.dataTable.dataRows.length > 0) {
          setTimeout(() => {
            this.setDatatable();
          }, 0)
        }
        this.isLoading = false;
      }
    );
  }

  setDatatable() {
    const x = this.dataTable.dataRows.length
    $('#datatables').DataTable({
      'pagingType': 'full_numbers',
      'lengthMenu': [
        [10, 25, 50, -1],
        [10, 25, 50, 'All']
      ],
      responsive: true,
      language: {
        search: '_INPUT_',
        searchPlaceholder: 'Search records',
      }
    });
    const table = $('#datatables').DataTable();
    // Edit record
    table.on('click', '.edit', function () {
      const $tr = $(this).closest('tr');
      const data = table.row($tr).data();
      alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
    });
    // Delete a record
    table.on('click', '.remove', function (e) {
      const $tr = $(this).closest('tr');
      table.row($tr).remove().draw();
      e.preventDefault();
    });
    // Like record
    table.on('click', '.like', function () {
      alert('You clicked on Like button');
    });
    $('.card .material-datatables label').addClass('form-group');
  }

  ngAfterViewInit() {
    // debugger;
  }

  ngAfterViewChecked() {
    // debugger;
  }

  ngOnDestroy() {
    // debugger;
  }
}
