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
var common_1 = require('@angular/common');
require('../rxjs-operators');
var ng2_bootstrap_1 = require('ng2-bootstrap-rc5/ng2-bootstrap');
var appeal_1 = require('../models/appeal');
var campaign_service_1 = require('../campaign.service');
var appeal_service_1 = require('../appeal.service');
var appeal_list_component_1 = require('../appeal-list/appeal-list.component');
var NewAppealComponent = (function () {
    function NewAppealComponent(campaignService, appealService) {
        this.campaignService = campaignService;
        this.appealService = appealService;
        this.appeal = new appeal_1.Appeal();
        this.campaigns = this.campaignService.getCampaigns();
    }
    NewAppealComponent.prototype.appealSubmit = function () {
        this.appealService.addAppeal(this.appeal);
        this.campaignService.loadCampaigns();
    };
    NewAppealComponent.prototype.ngOnInit = function () {
        console.dir(this.appeal);
    };
    NewAppealComponent = __decorate([
        core_1.Component({
            selector: 'app-new-appeal',
            templateUrl: 'new-appeal.component.html',
            styleUrls: ['new-appeal.component.css'],
            directives: [ng2_bootstrap_1.TimepickerComponent, ng2_bootstrap_1.DATEPICKER_DIRECTIVES, appeal_list_component_1.AppealListComponent],
            pipes: [common_1.DatePipe],
            providers: [appeal_1.Appeal]
        }), 
        __metadata('design:paramtypes', [campaign_service_1.CampaignService, appeal_service_1.AppealService])
    ], NewAppealComponent);
    return NewAppealComponent;
}());
exports.NewAppealComponent = NewAppealComponent;
