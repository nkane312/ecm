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
require('../rxjs-operators');
var ng2_bootstrap_1 = require('ng2-bootstrap-rc5/ng2-bootstrap');
var common_1 = require('@angular/common');
var campaign_list_component_1 = require('../campaign-list/campaign-list.component');
var campaign_1 = require('../models/campaign');
var campaign_service_1 = require('../campaign.service');
var NewCampaignComponent = (function () {
    function NewCampaignComponent(campaignService) {
        this.campaignService = campaignService;
        this.campaign = new campaign_1.Campaign();
    }
    NewCampaignComponent.prototype.createCampaign = function () {
        this.campaignService.addCampaign(this.campaign);
    };
    NewCampaignComponent.prototype.ngOnInit = function () {
    };
    NewCampaignComponent = __decorate([
        core_1.Component({
            selector: 'app-new-campaign',
            templateUrl: 'new-campaign.component.html',
            styleUrls: ['new-campaign.component.css'],
            directives: [ng2_bootstrap_1.TimepickerComponent, ng2_bootstrap_1.DATEPICKER_DIRECTIVES, campaign_list_component_1.CampaignListComponent],
            pipes: [common_1.DatePipe],
            providers: [campaign_1.Campaign]
        }), 
        __metadata('design:paramtypes', [campaign_service_1.CampaignService])
    ], NewCampaignComponent);
    return NewCampaignComponent;
}());
exports.NewCampaignComponent = NewCampaignComponent;
