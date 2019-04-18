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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FilterByComponent = /** @class */ (function () {
    function FilterByComponent() {
        this.filterType = 'values';
        this.selectedIds = [];
        this.onLoadData = new core_1.EventEmitter();
        this.switchSort = new core_1.EventEmitter();
        this.selectAll = true;
    }
    FilterByComponent.prototype.ngOnInit = function () {
    };
    FilterByComponent.prototype.load = function () {
        if (this.selectAll) {
            this.onLoadData.emit({ id: this.idx, vals: 'all' });
        }
        else {
            this.onLoadData.emit({ id: this.idx, vals: this.selectedIds });
        }
    };
    FilterByComponent.prototype.cancel = function () {
        //this.onLoadData.emit({ id: this.idx, vals: this.selectedIds });
    };
    FilterByComponent.prototype.clear = function () {
        this.selectedIds = [];
        this.onLoadData.emit({ id: this.idx, vals: this.selectedIds });
    };
    FilterByComponent.prototype.switchSort1 = function (cod) {
        console.log("SwitchSort1: " + cod);
        this.switchSort.emit({ column: this.idx, value: cod });
    };
    FilterByComponent.prototype.selectAllValues = function () {
        if (this.selectAll) {
            this.selectedIds = this.searchItems.map(function (x) { return x.value; });
            this.searchItems.forEach(function (x) {
                x.selected = true;
            });
        }
        else {
            this.searchItems = this.searchItems.map(function (x) {
                return { selected: false, value: x.value };
            });
            this.selectedIds = [];
        }
    };
    FilterByComponent.prototype.changeVal = function (e, val) {
        this.selectedIds = this.searchItems.filter(function (x) { return x.selected; }).map(function (x) { return x.value; });
        if (this.selectedIds.length === this.searchItems.length) {
            this.selectAll = true;
        }
        else {
            this.selectAll = false;
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], FilterByComponent.prototype, "searchItems", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FilterByComponent.prototype, "idx", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], FilterByComponent.prototype, "onLoadData", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], FilterByComponent.prototype, "switchSort", void 0);
    FilterByComponent = __decorate([
        core_1.Component({
            selector: 'app-filter-by',
            templateUrl: './src/components/filter-by.component.html'
        }),
        __metadata("design:paramtypes", [])
    ], FilterByComponent);
    return FilterByComponent;
}());
exports.FilterByComponent = FilterByComponent;
//# sourceMappingURL=filter-by.component.js.map