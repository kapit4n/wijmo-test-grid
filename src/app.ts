import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcGridFilter from 'wijmo/wijmo.grid.filter';

// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjGridFilterModule } from 'wijmo/wijmo.angular2.grid.filter';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { DataSvc } from './services/DataSvc';
import { ServerCollectionView } from './components/ServerCollectionView';

import { FilterByComponent } from './components/filter-by.component'
import { viewClassName } from '@angular/compiler';

'use strict';

// The application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})

export class AppCmp {
    data: wjcCore.CollectionView;
    countryMap: wjcGrid.DataMap;
    view: ServerCollectionView;

    idSort = "wj-glyph-up";
    nameItems = [{ id: 1, value: 'Data1' },
    { id: 2, value: 'Item Value 2' },
    { id: 3, value: 'Item Value 3' },
    { id: 4, value: 'Item Value 4' },
    { id: 5, value: 'Item Value 5' }];

    idItems = [];

    
    codeItems = [{ id: 1, value: 'Data1' },
    { id: 2, value: 'Code 2' },
    { id: 3, value: 'Code 3' },
    { id: 4, value: 'Code 4' },
    { id: 5, value: 'Code 5' }];

    addressItems = [{ id: 1, value: 'Data1' },
    { id: 2, value: 'Address 2' },
    { id: 3, value: 'Address 3' },
    { id: 4, value: 'Address 4' },
    { id: 5, value: 'Address 5' }];



    protected dataSvc: DataSvc;
    protected http: HttpClient;
    private _downloadsColumnFilterType = wjcGridFilter.FilterType.Condition;
    private _culture = 'en';

    @ViewChild('filter') filter: wjcGridFilter.FlexGridFilter;

    constructor(@Inject(DataSvc) dataSvc: DataSvc, http: HttpClient) {
        this.dataSvc = dataSvc;
        this.http = http;
        this.data = new wjcCore.CollectionView(this.dataSvc.getData());
        this.countryMap = new wjcGrid.DataMap(new wjcCore.CollectionView(this.dataSvc.getCountryMap()), 'key', 'name');

        this.view = new ServerCollectionView('http://localhost:3001/data', {
            pageSize: 12,
        });
    }

    switchSort(name: string) {
        if (this.idSort === 'wj-glyph-up') {
            this.idSort = 'wj-glyph-down';
        } else {
            this.idSort = 'wj-glyph-up';
        }
    }

    pulllData() {
        this.view.pullData();
    }

    load(data: any) {
        this.view.loadWith(data.id, data.vals);
        console.log(data);
    }

    get downloadsColumnFilterType(): wjcGridFilter.FilterType {
        return this._downloadsColumnFilterType;
    }
    set downloadsColumnFilterType(value: wjcGridFilter.FilterType) {
        if (this._downloadsColumnFilterType != value) {
            this._downloadsColumnFilterType = value;
            var f = this.filter;
            if (f) {
                var col = f.grid.columns.getColumn('downloads'),
                    cf = f.getColumnFilter(col, true);
                cf.filterType = this._downloadsColumnFilterType;
            }
        }
    }

    get culture(): string {
        return this._culture;
    }
    set culture(value: string) {
        if (this._culture != value) {
            this._culture = value;
            this.http.get('scripts/vendor/wijmo.culture.' + this._culture + '.js',
                {
                    responseType: 'text'
                }
            ).subscribe((code) => {
                eval(code);
                wjcCore.Control.invalidateAll();
            });
        }
    }

    saveFilter() {
        localStorage['filter'] = this.filter.filterDefinition;
    }

    restoreFilter() {
        this.filter.filterDefinition = localStorage['filter'];
        this.updateFilterType();
    }

    clearFilter() {
        this.filter.clear();
        this.updateFilterType();
    }

    updateFilterType() {
        var f = this.filter,
            col = f.grid.columns.getColumn('downloads'),
            cf = f.getColumnFilter(col, true);
        this.downloadsColumnFilterType = cf.filterType;
    }

    // create the filter and expose it to scope for customization
    initialized(s: wjcGrid.FlexGrid, e: any) {
        this.filter.filterChanging.addHandler(function () {
            console.log('filter changing');
        });
        this.filter.filterChanged.addHandler(function () {
            console.log('filter changed');
        });
        this.filter.filterApplied.addHandler(function () {
            console.log('filter applied');
        });
    }
}

@NgModule({
    imports: [WjInputModule, WjGridModule,
        WjGridFilterModule, BrowserModule,
        FormsModule, HttpClientModule],
    declarations: [AppCmp, FilterByComponent],
    providers: [DataSvc, FilterByComponent],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);
