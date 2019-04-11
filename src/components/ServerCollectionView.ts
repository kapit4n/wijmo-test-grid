'use strict';
import {
    CollectionView, asString, copy, asBoolean, Event, EventArgs, RequestErrorEventArgs,
    asInt, clamp, PageChangingEventArgs, httpRequest, isString, changeType, DataType,
    isDate
} from 'wijmo/wijmo';

// optional module import of wijmo.grid.filter
import * as wjcFilter from 'wijmo/wijmo.grid.filter';

    function tryGetModuleWijmoGridFilter(): typeof wjcFilter {
    let m1, m2;
    return (m1 = window['wijmo']) && (m2 = m1['grid']) && m2['filter'];
}

// https://demos.wijmo.com/5/angular2/celltemplateintro/celltemplateintro/
// https://demos.wijmo.com/5/Angular/WijmoHelp/WijmoHelp/topic/wijmo.angular.WjFlexGridCellTemplate.Class.html
// https://demos.wijmo.com/5/Angular/WijmoHelp/WijmoHelp/topic/wijmo-wijmo.angular2.grid.WjFlexGridCellTemplate.Class.html

export class ServerCollectionViewBase extends CollectionView {
    _url: string;
    _count = 0;
    _toGetData: number;
    _loading: boolean;
    _filterDef: string;
    _requestHeaders: any;
    _sortOnServer = true;
    _pageOnServer = true;
    _filterOnServer = true;
    _showDatesAsGmt = false;
    _changeCount = 0;

    _keyValueFilters = {};


    constructor(url: string, options?: any) {
        super();
        this._url = asString(url, false);
        if (options) {
            copy(this, options);
        }

        // when sortDescriptions change, sort on server
        this.sortDescriptions.collectionChanged.addHandler(() => {
            if (this.sortOnServer) {
                this._getData();
            }
        });

        // go get the data
        this._getData();
    }

    get sortOnServer(): boolean {
        return this._sortOnServer;
    }

    public pullData() {
        this._getData();
    }

    set sortOnServer(value: boolean) {
        if (value != this._sortOnServer) {
            this._sortOnServer = asBoolean(value);
            this._getData();
        }
    }

    get pageOnServer(): boolean {
        return this._pageOnServer;
    }
    set pageOnServer(value: boolean) {
        if (value != this._pageOnServer) {
            this._pageOnServer = asBoolean(value);
            if (this.pageSize) {
                this._getData();
            }
        }
    }

    get filterOnServer(): boolean {
        return this._filterOnServer;
    }
    set filterOnServer(value: boolean) {
        if (value != this._filterOnServer) {
            this._filterOnServer = asBoolean(value);
            this._getData();
        }
    }

    get filterDefinition(): string {
        return this._filterDef;
    }
    set filterDefinition(value: string) {
        if (value != this._filterDef) {
            this._filterDef = asString(value);
            this._getData();
        }
    }

    updateFilterDefinition(filterProvider: any) {
        if (this.filterOnServer && tryGetModuleWijmoGridFilter() && filterProvider instanceof tryGetModuleWijmoGridFilter().FlexGridFilter) {
            this.filterDefinition = this._getFilterDefinition(filterProvider);
        }
    }

    get showDatesAsGmt() {
        return this._showDatesAsGmt;
    }
    set showDatesAsGmt(value: boolean) {
        if (value != this.showDatesAsGmt) {
            this._showDatesAsGmt = asBoolean(value);
            this._getData();
        }
    }

    get requestHeaders(): any {
        return this._requestHeaders;
    }
    set requestHeaders(value: any) {
        this._requestHeaders = value;
    }

    get isLoading(): boolean {
        return this._loading;
    }

    loading = new Event();

    onLoading(e?: EventArgs) {
        this.loading.raise(this, e);
    }

    loaded = new Event();

    onLoaded(e?: EventArgs) {
        this.loaded.raise(this, e);
    }

    loadWith(colId: string, values: any) {
        console.log(colId);
        console.log(values);
        this._keyValueFilters[colId] = values.map(x => "'" + x.value + "'");
        this._getData();
    }

    error = new Event();

    onError(e: RequestErrorEventArgs): boolean {
        this.error.raise(this, e);
        return !e.cancel;
    }

    get totalItemCount(): number {
        return this.pageOnServer
            ? this._count
            : this._view.length;
    }

    get pageCount(): number {
        return this.pageSize ? Math.ceil(this.totalItemCount / this.pageSize) : 1;
    }

    get pageSize(): number {
        return this._pgSz;
    }
    set pageSize(value: number) {
        if (value != this._pgSz) {
            this._pgSz = asInt(value);
            if (this.pageOnServer) {
                this._pgIdx = clamp(this._pgIdx, 0, this.pageCount - 1);
                this._getData();
            } else {
                this.refresh();
            }
        }
    }

    onPageChanging(e: PageChangingEventArgs): boolean {
        super.onPageChanging(e);
        if (this.pageOnServer && !e.cancel) {
            this._getData();
        }
        return !e.cancel;
    }

    commitNew() {

        // to get new item back as JSON
        var requestHeaders = {
            'Accept': 'application/json'
        };
        if (this.requestHeaders) {
            for (var k in this.requestHeaders) {
                requestHeaders[k] = this.requestHeaders[k];
            }
        }

        // commit to database
        var item = this.currentAddItem;
        if (item) {
            var url = this._getWriteUrl();
            if (url) {
                httpRequest(url, {
                    method: 'POST',
                    requestHeaders: requestHeaders,
                    data: this._convertToDbFormat(item),
                    success: (xhr) => {
                        this._changeCount++;
                        if (xhr.response) { // update new item from server
                            var newItem = this._parseJSON(xhr.response);
                            for (var key in newItem) {
                                item[key] = newItem[key];
                            }
                            this._notifyItemChanged(item);
                        }
                    },
                    error: this._error.bind(this)
                });
            }
        }

        // allow base class
        super.commitNew();
    }

    commitEdit() {

        // get the edited item back as JSON
        var requestHeaders = {
            'Accept': 'application/json'
        };
        if (this.requestHeaders) {
            for (var k in this.requestHeaders) {
                requestHeaders[k] = this.requestHeaders[k];
            }
        }

        // commit to database
        var item = this.currentEditItem;
        if (item && !this.currentAddItem && !this._sameContent(item, this._edtClone)) {
            if (this.items.indexOf(item) > -1) { // make sure we have this item...
                var url = this._getWriteUrl(this._edtClone);
                if (url) {
                    httpRequest(url, {
                        method: 'PUT',
                        requestHeaders: this.requestHeaders,
                        data: this._convertToDbFormat(item),
                        success: (xhr) => {
                            this._changeCount++;
                            if (xhr.response) { // update edited item from server (in case some edits were refused)
                                var edtItem = this._parseJSON(xhr.response);
                                for (var key in edtItem) {
                                    item[key] = edtItem[key];
                                }
                                this._notifyItemChanged(item);
                            }
                        },
                        error: this._error.bind(this)
                    });
                }
            }
        }

        // allow base class
        super.commitEdit();
    }

    remove(item: any) {

        // remove from database
        if (item && item != this.currentAddItem) {
            if (this.items.indexOf(item) > -1) {
                var url = this._getWriteUrl(item);
                if (url) {
                    httpRequest(url, {
                        method: 'DELETE',
                        requestHeaders: this.requestHeaders,
                        success: (xhr) => {
                            this._changeCount++;
                            this._getData();
                        },
                        error: this._error.bind(this),
                    });
                }
            }
        }

        // allow base class
        super.remove(item);
    }

    _getPageView() {
        return this.pageOnServer
            ? this._view
            : super._getPageView();
    }

    _performRefresh() {

        // save settings
        var canFilter = this._canFilter,
            canSort = this._canSort;

        // perform refresh
        this._canFilter = !this._filterOnServer;
        this._canSort = !this._sortOnServer;
        super._performRefresh();

        // restore settings
        this._canFilter = canFilter;
        this._canSort = canSort;
        this.sourceCollection
    }

    // ** implementation

    // get the data
    private _getData() {

        // get the data on a timeout to avoid doing it too often
        if (this._toGetData) {
            clearTimeout(this._toGetData);
        }
        this._toGetData = setTimeout(() => {
            // start loading
            this._toGetData = null;
            this._loading = true;
            this.onLoading();

            // get parameters
            var params = this._getReadParameters();

            //params['$filter'] = "([code] IN ('Code1')";

            for (let key in this._keyValueFilters) {
                let value = this._keyValueFilters[key];
                let vals = value.join(",");
                let queryBuild = `[${key}] IN (${vals})`;
                params['$filter'] = queryBuild;
            }

            console.log(params);

            for (var k in params) {
                params[k] = this._encodeUrl(params[k]);
            }

            // go get the data
            var url = this._getReadUrl();
            httpRequest(url, {
                data: params,
                success: (xhr) => {

                    // save cursor position
                    var position = this.currentPosition;

                    // parse response
                    var response = this._parseJSON(xhr.response);

                    // check if the item count decreased and we were reading past the end
                    var readPastEnd = response.count < this._count &&
                        this.pageSize > 0 && response.value.length < this.pageSize;

                    // store results
                    this._count = response.count;
                    this.sourceCollection = response.value;

                    
                    this.refresh();

                    // restore cursor position
                    if (position > -1) {
                        this.moveCurrentToPosition(position);
                    }

                    // done
                    this._loading = false;
                    this.onLoaded();

                    // if we read past the end of the collection, read again (TFS 244749)
                    if (readPastEnd) {
                        this._getData();
                    }
                },
                error: (xhr) => {
                    this._loading = false;
                    this.onLoaded();
                    if (this.onError(new RequestErrorEventArgs(xhr))) {
                        throw 'HttpRequest Error: ' + xhr.status + ' ' + xhr.statusText;
                    }
                }
            });
        }, 100);
    }

    // handle errors...
    private _error(xhr: XMLHttpRequest) {
        if (this.onError(new RequestErrorEventArgs(xhr))) {
            this._getData();
            throw 'HttpRequest Error: ' + xhr.status + ' ' + xhr.statusText;
        }
    }

    // parse JSON including dates
    _parseJSON(text: string): any {
        return JSON.parse(text, (key, value) => {
            if (typeof value == 'string') {
                var date = null;
                if (value.match(/^\/Date\(\d+\)\/$/)) { // old style serialization
                    date = new Date(parseInt(value.substr(6)));
                } else if (value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)) {
                    date = changeType(value, 4, null); // ISO 8601
                }
                if (isDate(date)) {
                    if (this._showDatesAsGmt) { // convert GMT to local
                        date = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
                    }
                    return date;
                }
            }
            return value;
        });
    }

    // convert objects before posting to OData services
    private _convertToDbFormat(item: any): any {
        let obj = {};
        for (let key in item) {
            let val = item[key];
            if (isDate(val) && this._showDatesAsGmt) {
                val = new Date(val.getTime() - val.getTimezoneOffset() * 60000);
            }
            obj[key] = val;
        }
        return obj;
    }

    // encode url parameters
    _encodeUrl(value: any): any {
        return isString(value) ? encodeURIComponent(value) : value;
    }

    // ** virtual/overridables

    // get url for read requests
    // note: read uses GET
    protected _getReadUrl(): string {
        var url = this._url;
        if (url[url.length - 1] != '/') {
            url += '/';
        }
        return url;
    }


    protected _getWriteUrl(item?: any): string {
        var url = this._getReadUrl();
        if (item) { // add ID of item being edited or removed
            url += '(' + item.ID + ')';
        }
        return url;
    }

    protected _getReadParameters(): any {
        return {};
    }


    protected _getFilterDefinition(filterProvider): string {
        return null;
    }
}

/**
 * Extends @see: wijmo.collections.ServerCollectionViewBase to retrieve sorted
 * and paginated data from a very simple data service.
 */
export class ServerCollectionView extends ServerCollectionViewBase {

    constructor(url: string, options?: any) {
        super(url);
        if (options) {
            copy(this, options);
        }
    }

    // *** overrides ***

    // get url for read request
    protected _getReadUrl(): string {
        return super._getReadUrl();
    }

    // get parameters for read request
    protected _getReadParameters(): any {
        var settings = {};

        // to refresh cache after changes
        settings['$ticks'] = this._changeCount;


        if (this.sortOnServer && this.sortDescriptions.length) {
            var sort = '';
            for (var i = 0; i < this.sortDescriptions.length; i++) {
                var sd = this.sortDescriptions[i];
                if (sort) sort += ',';
                sort += sd.property;
                if (!sd.ascending) sort += ' desc';
            }
            settings['$orderby'] = sort;
        }

        // server paging
        if (this.pageOnServer && this.pageSize > 0) {
            settings['$skip'] = this.pageIndex * this.pageSize;
            settings['$top'] = this.pageSize;
        }


        if (this.filterDefinition) {
            settings['$filter'] = this.filterDefinition;
        }

        // done
        return settings;
    }

    protected _getFilterDefinition(filter): string {
        if (filter instanceof tryGetModuleWijmoGridFilter().FlexGridFilter) {
            var def = '';
            for (var c = 0; c < filter.grid.columns.length; c++) {
                var col = filter.grid.columns[c],
                    cf = filter.getColumnFilter(col, false);
                if (cf && cf.isActive) {
                    if (def) {
                        def += ' AND ';
                    }
                    if (cf.conditionFilter && cf.conditionFilter.isActive) {
                        def += this._getConditionFilterDefinition(cf.conditionFilter);
                    } else if (cf.valueFilter && cf.valueFilter.isActive) {
                        def += this._getValueFilterDefinition(cf.valueFilter);
                    }
                }
            }
            console.log("DEF FILTER:::");
            console.log(def);
            return def;
        }
        return null;
    }
    private _getValueFilterDefinition(vf: wjcFilter.ValueFilter): string {
        var col = vf.column,
            name = '[' + col.binding + ']',
            vals = [];

        // build IN clause
        for (var key in vf.showValues) {
            var value = changeType(key, col.dataType, col.format);
            vals.push(this._encodeFilterValue(value, col.dataType));
        }
        var def = name + ' IN (' + vals.join(', ') + ')';

        // if empty strings are OK, so are null values
        if (vals.indexOf('\'\'') > -1) {
            def = '((' + def + ') OR (' + name + ' IS NULL))';
        }

        // done

        console.log("FILTER DEF2::::");
        console.log(def);
        return def;
    }
    private _getConditionFilterDefinition(cf: wjcFilter.ConditionFilter): string {
        var val = this._getConditionDefinition(cf, cf.condition1);
        if (cf.condition2.operator != null) {
            val += (cf.and ? ' AND ' : ' OR ') + this._getConditionDefinition(cf, cf.condition2);
        }
        return '(' + val + ')';
    }
    private _getConditionDefinition(cf: wjcFilter.ConditionFilter, cond: wjcFilter.FilterCondition): string {
        var expr = '',
            name = '[' + cf.column.binding + ']',
            val = this._encodeFilterValue(cond.value, cf.column.dataType),
            unquoted = isString(cond.value) ? cond.value.replace(/'/g, '\'\'') : '';
        switch (cond.operator) {
            case 0: // EQ = 0, 
                expr = '= ' + val;
                break;
            case 1: // NE = 1,
                expr = '<> ' + val;
                break;
            case 2: // GT = 2, 
                expr = '> ' + val;
                break;
            case 3: // GE = 3, 
                expr = '>= ' + val;
                break;
            case 4: // LT = 4, 
                expr = '< ' + val;
                break;
            case 5: // LE = 5, 
                expr = '<= ' + val;
                break;
            case 6: // BW = 6, 
                expr = 'LIKE \'' + unquoted + '*\'';
                break;
            case 7: // EW = 7, 
                expr = 'LIKE \'*' + unquoted + '\'';
                break;
            case 8: // CT = 8, 
                expr = 'LIKE \'*' + unquoted + '*\'';
                break;
            case 9: // NC = 9 
                expr = 'NOT LIKE \'*' + unquoted + '*\'';
                break;
        }

        // build expression
        expr = name + ' ' + expr;

        if (cond.operator == 0) {
            if (val == '\'\'' || val == null) {
                expr = '((' + expr + ') OR (' + name + ' IS NULL))';
            }
        }

        // done
        return expr;
    }
    private _encodeFilterValue(val: any, dataType: DataType): string {
        if (isString(val)) {
            return "'" + val.replace(/'/g, '\'\'') + "'";
        } else if (isDate(val)) {
            return '#' + (val.getMonth() + 1) + '/' + val.getDate() + '/' + val.getFullYear() + '#';
        } else if (val != null) {
            return val.toString();
        }
        return dataType == DataType.String ? "''" : null;
    }
}