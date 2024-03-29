import { Component } from '@angular/core';

//Declarations
declare var require: any;
const data: any = require('../../shared/data/company.json');

@Component({
  selector: 'app-dt-selection',
  templateUrl: './dt-selection.component.html',
  styleUrls: ['./dt-selection.component.scss']
})

export class DTSelectionComponent {

  rows: any[] = [];
  selected: any[] = [];
  columns: any[] = [
    { prop: 'name' },
    { name: 'Company' },
    { name: 'Gender' }
  ];

  constructor() {
    this.rows = data;
  }

  //  On select of dataTable's data row
  onSelect(event) {
   console.log("onSelect");
  }

  //  On Activation of dataTable's data row
  onActivate(event) {
    console.log("onActivate");
  }

}