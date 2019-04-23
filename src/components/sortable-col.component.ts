import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sortable-col',
  templateUrl: './src/components/sortable-col.component.html'
})
export class SortableColComponent implements OnInit {
  @Input() view: any = {};
  @Input() colName: any;
  @Output() onSwitchSort: EventEmitter<any> = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  switchSort(name: string) {
    this.onSwitchSort.emit(name)
  }
  
}
