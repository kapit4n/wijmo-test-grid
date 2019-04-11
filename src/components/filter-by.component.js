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
    }
    FilterByComponent.prototype.ngOnInit = function () {
    };
    FilterByComponent.prototype.load = function () {
        this.onLoadData.emit({ id: this.idx, vals: this.selectedIds });
    };
    FilterByComponent.prototype.changeVal = function (e, val) {
        if (e.target.checked) {
            this.selectedIds.push(val);
        }
        else {
            this.selectedIds = this.selectedIds.filter(function (x) { return x.id != val.id; });
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