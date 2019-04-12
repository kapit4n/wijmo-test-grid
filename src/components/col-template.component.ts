import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as wjcGridFilter from 'wijmo/wijmo.grid.filter';

@Component({
  selector: 'app-col-template',
  templateUrl: './src/components/col-template.component.html'
})
export class ColTemplateComponent implements OnInit {
  closeResult: string;
  @Input() colType = 'values';
  @Input() colName: any;
  @Input() view: any;
  @Input() columnFilters: any = {};
  @Input() filter: wjcGridFilter.FlexGridFilter;

  constructor() { }

  ngOnInit() {
  }


  pulllData() {
    this.view.pullData();
  }

  load(data: any) {
    this.view.loadWith(data.id, data.vals);
  }

  addNewItem() {
    this.view.addNew();
  }



  switchSort(name: string) {
    if (this.view.fieldSort[name] && this.view.fieldSort[name] == 'desc') {
      this.view.fieldSort[name] = 'asc';
    } else {
      this.view.fieldSort[name] = 'desc';
    }
    this.view.pullData();
  }


}
