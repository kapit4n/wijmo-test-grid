import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { t } from '@angular/core/src/render3';

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

  constructor() { }

  ngOnInit() {
  }

  load() {
    this.onLoadData.emit({ id: this.idx, vals: this.selectedIds });
  }

  changeVal(e: any, val: any) {
    if (e.target.checked) {
      this.selectedIds.push(val);
    } else {
      this.selectedIds = this.selectedIds.filter(x => x != val);
    }
  }
}
