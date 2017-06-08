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
var appeal_service_1 = require('../appeal.service');
var campaign_service_1 = require('../campaign.service');
require('rxjs/Rx');
var router_1 = require('@angular/router');
var AppealListComponent = (function () {
    function AppealListComponent(appealService, campaignService, route) {
        this.appealService = appealService;
        this.campaignService = campaignService;
        this.route = route;
        appealService.loadAppeals();
    }
    AppealListComponent.prototype.getAppeals = function () {
        var _this = this;
        this.appealService.getAppeals().subscribe(function (data) { _this.appeals = data; }, function (error) { console.log(error); });
    };
    AppealListComponent.prototype.deleteAppeal = function (id) {
        var _this = this;
        this.appealService.removeAppeal(id).subscribe(function (success) {
            console.log(success);
            _this.appealService.loadAppeals();
        }, function (error) { console.log(error); });
    };
    AppealListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getAppeals();
        if (this.filters) {
            this.filters.subscribe(function (data) { _this.appealService.filterAppeals(data); }, function (error) { console.log(error); }, function () { console.log('filters complete'); });
        }
    };
    AppealListComponent = __decorate([
        core_1.Component({
            selector: 'appeal-list-component',
            templateUrl: 'appeal-list.component.html',
            styleUrls: ['appeal-list.component.css'],
            inputs: ['filters']
        }), 
        __metadata('design:paramtypes', [appeal_service_1.AppealService, campaign_service_1.CampaignService, router_1.ActivatedRoute])
    ], AppealListComponent);
    return AppealListComponent;
}());
exports.AppealListComponent = AppealListComponent;
