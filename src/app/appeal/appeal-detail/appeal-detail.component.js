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
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var appeal_service_1 = require('../appeal.service');
var appeal_1 = require('../models/appeal');
var appeal_info_component_1 = require('./appeal-info/appeal-info.component');
var appeal_content_component_1 = require('./appeal-content/appeal-content.component');
var appeal_codes_component_1 = require('./appeal-codes/appeal-codes.component');
var appeal_signoffs_component_1 = require('./appeal-signoffs/appeal-signoffs.component');
var AppealDetailComponent = (function () {
    function AppealDetailComponent(appealService, route) {
        var _this = this;
        this.appealService = appealService;
        this.route = route;
        this.appeal = new appeal_1.Appeal();
        this.route.params
            .subscribe(function (data) {
            _this.appealService.filterAppeals(data);
            _this.subscribeToAppeal(data);
        });
    }
    AppealDetailComponent.prototype.subscribeToAppeal = function (appeal) {
        var _this = this;
        this.appealService.getAppeals().subscribe(function (data) {
            if (data.length && (data[0]._id == appeal.appealId)) {
                _this.appeal = data[0];
            }
        }, function (error) { console.log(error); });
    };
    AppealDetailComponent.prototype.onSaved = function (appealInfo) {
        var appeal = this.appeal;
        appeal.info = appealInfo;
        this.appealService.updateAppeal(appeal);
    };
    AppealDetailComponent.prototype.ngOnInit = function () {
    };
    AppealDetailComponent.prototype.saveAppeal = function () {
    };
    AppealDetailComponent = __decorate([
        core_1.Component({
            selector: 'app-appeal-detail',
            templateUrl: 'appeal-detail.component.html',
            styleUrls: ['appeal-detail.component.css'],
            directives: [appeal_info_component_1.AppealInfoComponent, appeal_content_component_1.AppealContentComponent, appeal_codes_component_1.AppealCodesComponent, appeal_signoffs_component_1.AppealSignoffsComponent],
            pipes: [common_1.DatePipe],
            providers: [appeal_1.Appeal]
        }), 
        __metadata('design:paramtypes', [appeal_service_1.AppealService, router_1.ActivatedRoute])
    ], AppealDetailComponent);
    return AppealDetailComponent;
}());
exports.AppealDetailComponent = AppealDetailComponent;
