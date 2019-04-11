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
        this.searchValues = [
            { id: 1, value: 'Data1' },
            { id: 2, value: 'Data2' },
            { id: 3, value: 'Data3' },
            { id: 4, value: 'Data4' },
            { id: 5, value: 'Data5' }
        ];
    }
    FilterByComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FilterByComponent.prototype, "modal", void 0);
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