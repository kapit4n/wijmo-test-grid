'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var wijmo_1 = require("wijmo/wijmo");
function tryGetModuleWijmoGridFilter() {
    var m1, m2;
    return (m1 = window['wijmo']) && (m2 = m1['grid']) && m2['filter'];
}
// https://demos.wijmo.com/5/angular2/celltemplateintro/celltemplateintro/
// https://demos.wijmo.com/5/Angular/WijmoHelp/WijmoHelp/topic/wijmo.angular.WjFlexGridCellTemplate.Class.html
// https://demos.wijmo.com/5/Angular/WijmoHelp/WijmoHelp/topic/wijmo-wijmo.angular2.grid.WjFlexGridCellTemplate.Class.html
var ServerCollectionViewBase = /** @class */ (function (_super) {
    __extends(ServerCollectionViewBase, _super);
    function ServerCollectionViewBase(url, options) {
        var _this = _super.call(this) || this;
        _this._count = 0;
        _this._sortOnServer = true;
        _this._pageOnServer = true;
        _this._filterOnServer = true;
        _this._showDatesAsGmt = false;
        _this._changeCount = 0;
        _this.loading = new wijmo_1.Event();
        _this.loaded = new wijmo_1.Event();
        _this.error = new wijmo_1.Event();
        _this._url = wijmo_1.asString(url, false);
        if (options) {
            wijmo_1.copy(_this, options);
        }
        // when sortDescriptions change, sort on server
        _this.sortDescriptions.collectionChanged.addHandler(function () {
            if (_this.sortOnServer) {
                _this._getData();
            }
        });
        // go get the data
        _this._getData();
        return _this;
    }
    Object.defineProperty(ServerCollectionViewBase.prototype, "sortOnServer", {
        get: function () {
            return this._sortOnServer;
        },
        set: function (value) {
            if (value != this._sortOnServer) {
                this._sortOnServer = wijmo_1.asBoolean(value);
                this._getData();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerCollectionViewBase.prototype, "pageOnServer", {
        get: function () {
            return this._pageOnServer;
        },
        set: function (value) {
            if (value != this._pageOnServer) {
                this._pageOnServer = wijmo_1.asBoolean(value);
                if (this.pageSize) {
                    this._getData();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerCollectionViewBase.prototype, "filterOnServer", {
        get: function () {
            return this._filterOnServer;
        },
        set: function (value) {
            if (value != this._filterOnServer) {
                this._filterOnServer = wijmo_1.asBoolean(value);
                this._getData();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerCollectionViewBase.prototype, "filterDefinition", {
        get: function () {
            return this._filterDef;
        },
        set: function (value) {
            if (value != this._filterDef) {
                this._filterDef = wijmo_1.asString(value);
                this._getData();
            }
        },
        enumerable: true,
        configurable: true
    });
    ServerCollectionViewBase.prototype.updateFilterDefinition = function (filterProvider) {
        if (this.filterOnServer && tryGetModuleWijmoGridFilter() && filterProvider instanceof tryGetModuleWijmoGridFilter().FlexGridFilter) {
            this.filterDefinition = this._getFilterDefinition(filterProvider);
        }
    };
    Object.defineProperty(ServerCollectionViewBase.prototype, "showDatesAsGmt", {
        get: function () {
            return this._showDatesAsGmt;
        },
        set: function (value) {
            if (value != this.showDatesAsGmt) {
                this._showDatesAsGmt = wijmo_1.asBoolean(value);
                this._getData();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerCollectionViewBase.prototype, "requestHeaders", {
        get: function () {
            return this._requestHeaders;
        },
        set: function (value) {
            this._requestHeaders = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerCollectionViewBase.prototype, "isLoading", {
        get: function () {
            return this._loading;
        },
        enumerable: true,
        configurable: true
    });
    ServerCollectionViewBase.prototype.onLoading = function (e) {
        this.loading.raise(this, e);
    };
    ServerCollectionViewBase.prototype.onLoaded = function (e) {
        this.loaded.raise(this, e);
    };
    ServerCollectionViewBase.prototype.load = function () {
        this._getData();
    };
    ServerCollectionViewBase.prototype.onError = function (e) {
        this.error.raise(this, e);
        return !e.cancel;
    };
    Object.defineProperty(ServerCollectionViewBase.prototype, "totalItemCount", {
        get: function () {
            return this.pageOnServer
                ? this._count
                : this._view.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerCollectionViewBase.prototype, "pageCount", {
        get: function () {
            return this.pageSize ? Math.ceil(this.totalItemCount / this.pageSize) : 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerCollectionViewBase.prototype, "pageSize", {
        get: function () {
            return this._pgSz;
        },
        set: function (value) {
            if (value != this._pgSz) {
                this._pgSz = wijmo_1.asInt(value);
                if (this.pageOnServer) {
                    this._pgIdx = wijmo_1.clamp(this._pgIdx, 0, this.pageCount - 1);
                    this._getData();
                }
                else {
                    this.refresh();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    ServerCollectionViewBase.prototype.onPageChanging = function (e) {
        _super.prototype.onPageChanging.call(this, e);
        if (this.pageOnServer && !e.cancel) {
            this._getData();
        }
        return !e.cancel;
    };
    ServerCollectionViewBase.prototype.commitNew = function () {
        var _this = this;
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
                wijmo_1.httpRequest(url, {
                    method: 'POST',
                    requestHeaders: requestHeaders,
                    data: this._convertToDbFormat(item),
                    success: function (xhr) {
                        _this._changeCount++;
                        if (xhr.response) {
                            var newItem = _this._parseJSON(xhr.response);
                            for (var key in newItem) {
                                item[key] = newItem[key];
                            }
                            _this._notifyItemChanged(item);
                        }
                    },
                    error: this._error.bind(this)
                });
            }
        }
        // allow base class
        _super.prototype.commitNew.call(this);
    };
    ServerCollectionViewBase.prototype.commitEdit = function () {
        var _this = this;
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
            if (this.items.indexOf(item) > -1) {
                var url = this._getWriteUrl(this._edtClone);
                if (url) {
                    wijmo_1.httpRequest(url, {
                        method: 'PUT',
                        requestHeaders: this.requestHeaders,
                        data: this._convertToDbFormat(item),
                        success: function (xhr) {
                            _this._changeCount++;
                            if (xhr.response) {
                                var edtItem = _this._parseJSON(xhr.response);
                                for (var key in edtItem) {
                                    item[key] = edtItem[key];
                                }
                                _this._notifyItemChanged(item);
                            }
                        },
                        error: this._error.bind(this)
                    });
                }
            }
        }
        // allow base class
        _super.prototype.commitEdit.call(this);
    };
    ServerCollectionViewBase.prototype.remove = function (item) {
        var _this = this;
        // remove from database
        if (item && item != this.currentAddItem) {
            if (this.items.indexOf(item) > -1) {
                var url = this._getWriteUrl(item);
                if (url) {
                    wijmo_1.httpRequest(url, {
                        method: 'DELETE',
                        requestHeaders: this.requestHeaders,
                        success: function (xhr) {
                            _this._changeCount++;
                            _this._getData();
                        },
                        error: this._error.bind(this),
                    });
                }
            }
        }
        // allow base class
        _super.prototype.remove.call(this, item);
    };
    ServerCollectionViewBase.prototype._getPageView = function () {
        return this.pageOnServer
            ? this._view
            : _super.prototype._getPageView.call(this);
    };
    ServerCollectionViewBase.prototype._performRefresh = function () {
        // save settings
        var canFilter = this._canFilter, canSort = this._canSort;
        // perform refresh
        this._canFilter = !this._filterOnServer;
        this._canSort = !this._sortOnServer;
        _super.prototype._performRefresh.call(this);
        // restore settings
        this._canFilter = canFilter;
        this._canSort = canSort;
    };
    // ** implementation
    // get the data
    ServerCollectionViewBase.prototype._getData = function () {
        var _this = this;
        // get the data on a timeout to avoid doing it too often
        if (this._toGetData) {
            clearTimeout(this._toGetData);
        }
        this._toGetData = setTimeout(function () {
            // start loading
            _this._toGetData = null;
            _this._loading = true;
            _this.onLoading();
            // get parameters
            var params = _this._getReadParameters();
            for (var k in params) {
                params[k] = _this._encodeUrl(params[k]);
            }
            // go get the data
            var url = _this._getReadUrl();
            wijmo_1.httpRequest(url, {
                data: params,
                success: function (xhr) {
                    // save cursor position
                    var position = _this.currentPosition;
                    // parse response
                    var response = _this._parseJSON(xhr.response);
                    // check if the item count decreased and we were reading past the end
                    var readPastEnd = response.count < _this._count &&
                        _this.pageSize > 0 && response.value.length < _this.pageSize;
                    // store results
                    _this._count = response.count;
                    _this.sourceCollection = response.value;
                    _this.refresh();
                    // restore cursor position
                    if (position > -1) {
                        _this.moveCurrentToPosition(position);
                    }
                    // done
                    _this._loading = false;
                    _this.onLoaded();
                    // if we read past the end of the collection, read again (TFS 244749)
                    if (readPastEnd) {
                        _this._getData();
                    }
                },
                error: function (xhr) {
                    _this._loading = false;
                    _this.onLoaded();
                    if (_this.onError(new wijmo_1.RequestErrorEventArgs(xhr))) {
                        throw 'HttpRequest Error: ' + xhr.status + ' ' + xhr.statusText;
                    }
                }
            });
        }, 100);
    };
    // handle errors...
    ServerCollectionViewBase.prototype._error = function (xhr) {
        if (this.onError(new wijmo_1.RequestErrorEventArgs(xhr))) {
            this._getData();
            throw 'HttpRequest Error: ' + xhr.status + ' ' + xhr.statusText;
        }
    };
    // parse JSON including dates
    ServerCollectionViewBase.prototype._parseJSON = function (text) {
        var _this = this;
        return JSON.parse(text, function (key, value) {
            if (typeof value == 'string') {
                var date = null;
                if (value.match(/^\/Date\(\d+\)\/$/)) {
                    date = new Date(parseInt(value.substr(6)));
                }
                else if (value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)) {
                    date = wijmo_1.changeType(value, 4, null); // ISO 8601
                }
                if (wijmo_1.isDate(date)) {
                    if (_this._showDatesAsGmt) {
                        date = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
                    }
                    return date;
                }
            }
            return value;
        });
    };
    // convert objects before posting to OData services
    ServerCollectionViewBase.prototype._convertToDbFormat = function (item) {
        var obj = {};
        for (var key in item) {
            var val = item[key];
            if (wijmo_1.isDate(val) && this._showDatesAsGmt) {
                val = new Date(val.getTime() - val.getTimezoneOffset() * 60000);
            }
            obj[key] = val;
        }
        return obj;
    };
    // encode url parameters
    ServerCollectionViewBase.prototype._encodeUrl = function (value) {
        return wijmo_1.isString(value) ? encodeURIComponent(value) : value;
    };
    // ** virtual/overridables
    // get url for read requests
    // note: read uses GET
    ServerCollectionViewBase.prototype._getReadUrl = function () {
        var url = this._url;
        if (url[url.length - 1] != '/') {
            url += '/';
        }
        return url;
    };
    ServerCollectionViewBase.prototype._getWriteUrl = function (item) {
        var url = this._getReadUrl();
        if (item) {
            url += '(' + item.ID + ')';
        }
        return url;
    };
    ServerCollectionViewBase.prototype._getReadParameters = function () {
        return {};
    };
    ServerCollectionViewBase.prototype._getFilterDefinition = function (filterProvider) {
        return null;
    };
    return ServerCollectionViewBase;
}(wijmo_1.CollectionView));
exports.ServerCollectionViewBase = ServerCollectionViewBase;
/**
 * Extends @see: wijmo.collections.ServerCollectionViewBase to retrieve sorted
 * and paginated data from a very simple data service.
 */
var ServerCollectionView = /** @class */ (function (_super) {
    __extends(ServerCollectionView, _super);
    function ServerCollectionView(url, options) {
        var _this = _super.call(this, url) || this;
        if (options) {
            wijmo_1.copy(_this, options);
        }
        return _this;
    }
    // *** overrides ***
    // get url for read request
    ServerCollectionView.prototype._getReadUrl = function () {
        return _super.prototype._getReadUrl.call(this);
    };
    // get parameters for read request
    ServerCollectionView.prototype._getReadParameters = function () {
        var settings = {};
        // to refresh cache after changes
        settings['$ticks'] = this._changeCount;
        if (this.sortOnServer && this.sortDescriptions.length) {
            var sort = '';
            for (var i = 0; i < this.sortDescriptions.length; i++) {
                var sd = this.sortDescriptions[i];
                if (sort)
                    sort += ',';
                sort += sd.property;
                if (!sd.ascending)
                    sort += ' desc';
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
    };
    ServerCollectionView.prototype._getFilterDefinition = function (filter) {
        if (filter instanceof tryGetModuleWijmoGridFilter().FlexGridFilter) {
            var def = '';
            for (var c = 0; c < filter.grid.columns.length; c++) {
                var col = filter.grid.columns[c], cf = filter.getColumnFilter(col, false);
                if (cf && cf.isActive) {
                    if (def) {
                        def += ' AND ';
                    }
                    if (cf.conditionFilter && cf.conditionFilter.isActive) {
                        def += this._getConditionFilterDefinition(cf.conditionFilter);
                    }
                    else if (cf.valueFilter && cf.valueFilter.isActive) {
                        def += this._getValueFilterDefinition(cf.valueFilter);
                    }
                }
            }
            console.log("DEF FILTER:::");
            console.log(def);
            return def;
        }
        return null;
    };
    ServerCollectionView.prototype._getValueFilterDefinition = function (vf) {
        var col = vf.column, name = '[' + col.binding + ']', vals = [];
        // build IN clause
        for (var key in vf.showValues) {
            var value = wijmo_1.changeType(key, col.dataType, col.format);
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
    };
    ServerCollectionView.prototype._getConditionFilterDefinition = function (cf) {
        var val = this._getConditionDefinition(cf, cf.condition1);
        if (cf.condition2.operator != null) {
            val += (cf.and ? ' AND ' : ' OR ') + this._getConditionDefinition(cf, cf.condition2);
        }
        return '(' + val + ')';
    };
    ServerCollectionView.prototype._getConditionDefinition = function (cf, cond) {
        var expr = '', name = '[' + cf.column.binding + ']', val = this._encodeFilterValue(cond.value, cf.column.dataType), unquoted = wijmo_1.isString(cond.value) ? cond.value.replace(/'/g, '\'\'') : '';
        switch (cond.operator) {
            case 0:// EQ = 0, 
                expr = '= ' + val;
                break;
            case 1:// NE = 1,
                expr = '<> ' + val;
                break;
            case 2:// GT = 2, 
                expr = '> ' + val;
                break;
            case 3:// GE = 3, 
                expr = '>= ' + val;
                break;
            case 4:// LT = 4, 
                expr = '< ' + val;
                break;
            case 5:// LE = 5, 
                expr = '<= ' + val;
                break;
            case 6:// BW = 6, 
                expr = 'LIKE \'' + unquoted + '*\'';
                break;
            case 7:// EW = 7, 
                expr = 'LIKE \'*' + unquoted + '\'';
                break;
            case 8:// CT = 8, 
                expr = 'LIKE \'*' + unquoted + '*\'';
                break;
            case 9:// NC = 9 
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
    };
    ServerCollectionView.prototype._encodeFilterValue = function (val, dataType) {
        if (wijmo_1.isString(val)) {
            return "'" + val.replace(/'/g, '\'\'') + "'";
        }
        else if (wijmo_1.isDate(val)) {
            return '#' + (val.getMonth() + 1) + '/' + val.getDate() + '/' + val.getFullYear() + '#';
        }
        else if (val != null) {
            return val.toString();
        }
        return dataType == wijmo_1.DataType.String ? "''" : null;
    };
    return ServerCollectionView;
}(ServerCollectionViewBase));
exports.ServerCollectionView = ServerCollectionView;
//# sourceMappingURL=ServerCollectionView.js.map