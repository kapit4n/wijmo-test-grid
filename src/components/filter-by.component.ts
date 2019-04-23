import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-by',
  templateUrl: './src/components/filter-by.component.html'
})
export class FilterByComponent implements OnInit {
  closeResult: string;
  filterType = 'values';
  @Input() searchItems: any[];
  selectedIds: any[] = [];
  @Input() idx: string;
  @Output() onLoadData: EventEmitter<any> = new EventEmitter();
  @Output() switchSort: EventEmitter<any> = new EventEmitter();
  selectAll: boolean = true;
  searchText = "";
  byValue = true;
  ascBackground: string = '';
  descBackground: string = '';
  @Input() view: any;

  constructor() { }

  ngOnInit() {
    let sortAux = this.view.fieldSort[this.idx];
    
    if (sortAux == 'asc') {
      this.ascBackground = 'red';
      this.descBackground = '';
    } else if (sortAux == 'desc') {
      this.ascBackground = ''; 
      this.descBackground = 'red'; 
    } else {
      this.ascBackground = ''; 
      this.descBackground = '';
    }
  }

  filterByValue() {
    this.byValue = true;
  }
  
  filterByCondition() {
    this.byValue = false;
  }


  load() {
    if (this.selectAll) {
      this.onLoadData.emit({id: this.idx, vals: 'all'})
    } else {
      this.onLoadData.emit({ id: this.idx, vals: this.selectedIds });
    }
  }

  cancel() {
    //this.onLoadData.emit({ id: this.idx, vals: this.selectedIds });
  }

  clear() {
    this.selectedIds = [];
    this.onLoadData.emit({ id: this.idx, vals: this.selectedIds })
  }

  sortAction(cod) {
    console.log("SwitchSort1: "  + cod);
    if (cod == 'asc') {
      this.ascBackground = 'red';
      this.descBackground = '';
    } else if (cod == 'desc') {
      this.ascBackground = ''; 
      this.descBackground = 'red'; 
    }
    this.switchSort.emit({column: this.idx, value: cod})
  }

  selectAllValues() {
    if (this.selectAll) {
      this.selectedIds = this.searchItems.map(x => x.value);
      this.searchItems.forEach(x => {
        x.selected = true;
      });
    } else {
      this.searchItems = this.searchItems.map(x => {
        return {selected: false, value: x.value};
      });
      this.selectedIds = [];
    }
  }

  changeVal(e: any, val: any) {
    this.selectedIds = this.searchItems.filter(x => x.selected).map(x => x.value);
    if (this.selectedIds.length === this.searchItems.length) {
      this.selectAll = true;
    } else {
      this.selectAll = false;
    }
  }

  
}
