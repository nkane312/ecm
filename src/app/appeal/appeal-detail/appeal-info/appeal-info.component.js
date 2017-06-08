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
var ng2_bootstrap_1 = require('ng2-bootstrap-rc5/ng2-bootstrap');
var appeal_1 = require('../../models/appeal');
var restore_service_1 = require('../../restore.service');
var campaign_service_1 = require('../../campaign.service');
var AppealInfoComponent = (function () {
    function AppealInfoComponent(restoreService, campaignService) {
        var _this = this;
        this.restoreService = restoreService;
        this.campaignService = campaignService;
        this.saved = new core_1.EventEmitter();
        this.canceled = new core_1.EventEmitter();
        this.campaigns = new core_1.EventEmitter();
        this.currentCampaign = new core_1.EventEmitter();
        this.campaignService.getCampaigns().subscribe(function (data) { _this.campaigns.next(data); }, function (error) { console.log(error); });
    }
    Object.defineProperty(AppealInfoComponent.prototype, "appealInfo", {
        get: function () {
            return this.restoreService.getItem();
        },
        set: function (appealInfo) {
            this.restoreService.setItem(appealInfo);
            this.currentCampaign.next(this.appealInfo.campaign);
        },
        enumerable: true,
        configurable: true
    });
    AppealInfoComponent.prototype.save = function () {
        this.saved.emit(this.restoreService.getItem());
    };
    AppealInfoComponent.prototype.cancel = function () {
        this.appealInfo = this.restoreService.restoreItem();
        this.canceled.next(this.appealInfo);
    };
    AppealInfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentCampaign.combineLatest(this.campaigns, function (current, campaigns) {
            return current;
        }).first().subscribe(function (data) {
            _this.appealInfo.campaign = data._id;
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AppealInfoComponent.prototype, "saved", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AppealInfoComponent.prototype, "canceled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', appeal_1.AppealInfo), 
        __metadata('design:paramtypes', [appeal_1.AppealInfo])
    ], AppealInfoComponent.prototype, "appealInfo", null);
    AppealInfoComponent = __decorate([
        core_1.Component({
            selector: 'app-appeal-info',
            templateUrl: 'appeal-info.component.html',
            styleUrls: ['appeal-info.component.css'],
            directives: [ng2_bootstrap_1.TimepickerComponent, ng2_bootstrap_1.DATEPICKER_DIRECTIVES],
            providers: [appeal_1.AppealInfo, restore_service_1.RestoreService, campaign_service_1.CampaignService]
        }), 
        __metadata('design:paramtypes', [restore_service_1.RestoreService, campaign_service_1.CampaignService])
    ], AppealInfoComponent);
    return AppealInfoComponent;
}());
exports.AppealInfoComponent = AppealInfoComponent;
