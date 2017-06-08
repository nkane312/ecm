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
var campaign_service_1 = require('../campaign.service');
require('rxjs/Rx');
var CampaignListComponent = (function () {
    function CampaignListComponent(campaignService) {
        this.campaignService = campaignService;
    }
    CampaignListComponent.prototype.getCampaigns = function () {
        var _this = this;
        this.campaignService.getCampaigns().subscribe(function (data) { _this.campaigns = data; }, function (error) { console.log(error); });
    };
    CampaignListComponent.prototype.deleteCampaign = function (id) {
        var _this = this;
        this.campaignService.removeCampaign(id).subscribe(function (success) {
            console.log(success);
            _this.campaignService.loadCampaigns();
        }, function (error) {
            console.log(error);
        });
    };
    CampaignListComponent.prototype.ngOnInit = function () {
        this.getCampaigns();
    };
    CampaignListComponent = __decorate([
        core_1.Component({
            selector: 'campaign-list-component',
            templateUrl: 'campaign-list.component.html',
            styleUrls: ['campaign-list.component.css'],
        }), 
        __metadata('design:paramtypes', [campaign_service_1.CampaignService])
    ], CampaignListComponent);
    return CampaignListComponent;
}());
exports.CampaignListComponent = CampaignListComponent;
