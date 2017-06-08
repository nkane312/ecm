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
var AppealContentComponent = (function () {
    function AppealContentComponent(restoreService) {
        this.restoreService = restoreService;
        this.onSaved = new core_1.EventEmitter();
        this.onCanceled = new core_1.EventEmitter();
    }
    AppealContentComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', appeal_1.AppealContent)
    ], AppealContentComponent.prototype, "emailContent", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AppealContentComponent.prototype, "onSaved", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AppealContentComponent.prototype, "onCanceled", void 0);
    AppealContentComponent = __decorate([
        core_1.Component({
            selector: 'app-appeal-content',
            templateUrl: 'appeal-content.component.html',
            styleUrls: ['appeal-content.component.css'],
            providers: [appeal_1.AppealContent, restore_service_1.RestoreService]
        }), 
        __metadata('design:paramtypes', [restore_service_1.RestoreService])
    ], AppealContentComponent);
    return AppealContentComponent;
}());
exports.AppealContentComponent = AppealContentComponent;
