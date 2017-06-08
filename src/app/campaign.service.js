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
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
var initialCampaigns = [];
var CampaignService = (function () {
    function CampaignService(http) {
        this.http = http;
        this._campaignUrl = 'http://192.168.18.82:3001/api/v1/campaign/';
        this._campaigns$ = new Rx_1.BehaviorSubject([]);
        this.loadCampaigns();
    }
    CampaignService.prototype.loadCampaigns = function () {
        var _this = this;
        this.http.get(this._campaignUrl).map(this.extractData).subscribe(function (data) {
            _this._campaigns$.next(data);
        }, function (error) {
            console.log(error);
        });
    };
    CampaignService.prototype.addCampaign = function (campaign) {
        var _this = this;
        var ebody = JSON.stringify(campaign || null);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({
            headers: headers
        });
        this.http.post(this._campaignUrl, ebody, options).subscribe(function (success) { _this.loadCampaigns(); }, function (error) { console.log(error); });
    };
    CampaignService.prototype.removeCampaign = function (id) {
        return this.http.delete(this._campaignUrl + id);
    };
    CampaignService.prototype.getCampaigns = function () {
        return this._campaigns$.asObservable();
    };
    CampaignService.prototype.getCampaign = function (id) {
        return this.http.get(this._campaignUrl + id);
    };
    CampaignService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    CampaignService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Rx_1.Observable.throw(errMsg);
    };
    CampaignService = __decorate([
        core_1.Injectable(),
        __metadata('design:paramtypes', [http_1.Http])
    ], CampaignService);
    return CampaignService;
}());
exports.CampaignService = CampaignService;
