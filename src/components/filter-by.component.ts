import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-filter-by',
  templateUrl: './src/components/filter-by.component.html'
})
export class FilterByComponent implements OnInit {
  closeResult: string;
  filterType = 'values';
  @Input() searchItems: any[];
  @Input() idx: string;
  searchValues = [
    { id: 1, value: 'Data1' },
    { id: 2, value: 'Data2' },
    { id: 3, value: 'Data3' },
    { id: 4, value: 'Data4' },
    { id: 5, value: 'Data5' }
  ];

  constructor() { }

  ngOnInit() {
  }
}
