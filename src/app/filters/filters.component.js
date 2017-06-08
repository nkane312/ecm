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
var appeal_list_component_1 = require('../appeal-list/appeal-list.component');
var Rx_1 = require('rxjs/Rx');
var FiltersComponent = (function () {
    function FiltersComponent(campaignService) {
        this.campaignService = campaignService;
        this.filters = {};
        this.filterList = new Rx_1.BehaviorSubject({});
        this.campaigns = campaignService.getCampaigns();
    }
    FiltersComponent.prototype.onSubmit = function (filters) {
        this.filterList.next(filters);
    };
    FiltersComponent.prototype.ngOnInit = function () {
    };
    FiltersComponent = __decorate([
        core_1.Component({
            selector: 'app-filters',
            templateUrl: 'filters.component.html',
            styleUrls: ['filters.component.css'],
            directives: [appeal_list_component_1.AppealListComponent]
        }), 
        __metadata('design:paramtypes', [campaign_service_1.CampaignService])
    ], FiltersComponent);
    return FiltersComponent;
}());
exports.FiltersComponent = FiltersComponent;
