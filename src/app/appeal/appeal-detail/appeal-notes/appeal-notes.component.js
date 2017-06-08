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
var core_1 = require('@angular/core');
var appeal_1 = require('../../models/appeal');
var restore_service_1 = require('../../restore.service');
var AppealSignoffsComponent = (function () {
    function AppealSignoffsComponent(restoreService) {
        this.restoreService = restoreService;
        this.onSaved = new core_1.EventEmitter();
        this.onCanceled = new core_1.EventEmitter();
    }
    AppealSignoffsComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', appeal_1.AppealSignoff)
    ], AppealSignoffsComponent.prototype, "signoffs", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AppealSignoffsComponent.prototype, "onSaved", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AppealSignoffsComponent.prototype, "onCanceled", void 0);
    AppealSignoffsComponent = __decorate([
        core_1.Component({
            selector: 'app-appeal-signoffs',
            templateUrl: 'appeal-signoffs.component.html',
            styleUrls: ['appeal-signoffs.component.css'],
            providers: [appeal_1.AppealSignoff, restore_service_1.RestoreService]
        }), 
        __metadata('design:paramtypes', [restore_service_1.RestoreService])
    ], AppealSignoffsComponent);
    return AppealSignoffsComponent;
}());
exports.AppealSignoffsComponent = AppealSignoffsComponent;
