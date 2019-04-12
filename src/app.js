"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var wjcCore = require("wijmo/wijmo");
var wjcGridFilter = require("wijmo/wijmo.grid.filter");
// Angular
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var platform_browser_1 = require("@angular/platform-browser");
var wijmo_angular2_grid_1 = require("wijmo/wijmo.angular2.grid");
var wijmo_angular2_grid_filter_1 = require("wijmo/wijmo.angular2.grid.filter");
var wijmo_angular2_input_1 = require("wijmo/wijmo.angular2.input");
var DataSvc_1 = require("./services/DataSvc");
var ServerCollectionView_1 = require("./components/ServerCollectionView");
var filter_by_component_1 = require("./components/filter-by.component");
var col_template_component_1 = require("./components/col-template.component");
'use strict';
// The application root component.
var AppCmp = /** @class */ (function () {
    function AppCmp(dataSvc, http) {
        this.columnFilters = {};
        this.dataSvc = dataSvc;
        this.http = http;
        this.data = new wjcCore.CollectionView(this.dataSvc.getData());
        this.view = new ServerCollectionView_1.ServerCollectionView('http://localhost:3001/data', {
            pageSize: 12,
            columnFilters: this.columnFilters
        });
    }
    AppCmp.prototype.pulllData = function () {
        this.view.pullData();
    };
    AppCmp.prototype.load = function (data) {
        this.view.loadWith(data.id, data.vals);
    };
    AppCmp.prototype.addNewItem = function () {
        this.view.addNew();
    };
    AppCmp.prototype.gridSort = function (grid, event) {
        event.cancel = true;
    };
    ;
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", wjcGridFilter.FlexGridFilter)
    ], AppCmp.prototype, "filter", void 0);
    AppCmp = __decorate([
        core_1.Component({
            selector: 'app-cmp',
            templateUrl: 'src/app.html'
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc)),
        __metadata("design:paramtypes", [DataSvc_1.DataSvc, http_1.HttpClient])
    ], AppCmp);
    return AppCmp;
}());
exports.AppCmp = AppCmp;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_input_1.WjInputModule, wijmo_angular2_grid_1.WjGridModule,
                wijmo_angular2_grid_filter_1.WjGridFilterModule, platform_browser_1.BrowserModule,
                forms_1.FormsModule, http_1.HttpClientModule],
            declarations: [AppCmp, filter_by_component_1.FilterByComponent, col_template_component_1.ColTemplateComponent],
            providers: [DataSvc_1.DataSvc, filter_by_component_1.FilterByComponent, col_template_component_1.ColTemplateComponent],
            bootstrap: [AppCmp]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
core_1.enableProdMode();
// Bootstrap application with hash style navigation and global services.
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule);
//# sourceMappingURL=app.js.map