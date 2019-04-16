import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcGridFilter from 'wijmo/wijmo.grid.filter';

// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjGridFilterModule } from 'wijmo/wijmo.angular2.grid.filter';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { DataSvc } from './services/DataSvc';
import { ServerCollectionView } from './components/ServerCollectionView';

import { FilterByComponent } from './components/filter-by.component'
import { ColTemplateComponent } from './components/col-template.component'

'use strict';


interface BentoToolbarItem {
    label: string,
    icon: string,
    action: () => void,
    disabled: boolean,
  };

// The application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})

export class AppCmp {
    data: wjcCore.CollectionView;
    view: ServerCollectionView;
    public toolbarData: BentoToolbarItem[];

    columnFilters: any = {};

    protected dataSvc: DataSvc;
    protected http: HttpClient;

    @ViewChild('filter') filter: wjcGridFilter.FlexGridFilter;

    constructor(@Inject(DataSvc) dataSvc: DataSvc, http: HttpClient) {
        this.dataSvc = dataSvc;
        this.http = http;
        this.data = new wjcCore.CollectionView(this.dataSvc.getData());

        this.view = new ServerCollectionView('http://localhost:3001/data', {
            pageSize: 12,
            columnFilters: this.columnFilters
        });


        this.toolbarData = [{
            label: "Add",
            icon: "bento-icon-add",
            action: () => this.addNewItem(),
            disabled: false
          },
          {
            label: "Save",
            icon: "bento-icon-save-outlined",
            action: () => this.saveEntryCd(),
            disabled: false
          },
          {
            label: "Delete",
            icon: "bento-icon-close-circle",
            action: () => this.delete(),
            disabled: false
          }];

    }

    saveEntryCd() {
        this.pulllData();
    }

    delete() {

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

    gridSort(grid: wjcGrid.FlexGrid, event: wjcGrid.CellRangeEventArgs) {
        event.cancel = true;
    };
}

@NgModule({
    imports: [WjInputModule, WjGridModule,
        WjGridFilterModule, BrowserModule,
        FormsModule, HttpClientModule],
    declarations: [AppCmp, FilterByComponent, ColTemplateComponent],
    providers: [DataSvc, FilterByComponent, ColTemplateComponent],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);
