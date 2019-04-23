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
  @Input() isSortable: boolean = false;

  constructor() { }

  ngOnInit() {
  }


  pulllData() {
    this.view.pullData();
  }

  load(data: any) {
    console.log("Load from col template");
    this.view.loadWith(data.id, data.vals);
  }

  addNewItem() {
    this.view.addNew();
  }

  switchSortFromModal(item: any) {
    for (let key in this.view.fieldSort) {
        delete this.view.fieldSort[key];
    }
    this.view.fieldSort[item.column] = item.value;
    this.view.pullData();
  }
    
  switchSort(name: string) {

    let sortAux = this.view.fieldSort[name];
    
    for (let key in this.view.fieldSort) {
      if (key != name) {
        delete this.view.fieldSort[key];
      }
    }
    if (sortAux && sortAux == 'desc') {
      delete this.view.fieldSort[name];
      this.view.pullData();
      return;
    }

    if (sortAux && sortAux == 'asc') {
      this.view.fieldSort[name] = 'desc';
    } else {
      this.view.fieldSort[name] = 'asc';
    }
    this.view.pullData();
  }


}
