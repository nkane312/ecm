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
var initialAppeals = [];
var AppealService = (function () {
    function AppealService(http) {
        this.http = http;
        this._appealUrl = 'http://192.168.18.82:3001/api/v1/appeal/';
        this._populateCampaign = 'populate=info.campaign';
        this._appeals$ = new Rx_1.BehaviorSubject([]);
        this.loadAppeals();
    }
    AppealService.prototype.loadAppeals = function () {
        var _this = this;
        this.http.get(this._appealUrl + '?' + this._populateCampaign).map(this.extractData).subscribe(function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].info && data[i].info.sendDate) {
                    data[i].info.sendDate = new Date(data[i].info.sendDate);
                }
            }
            _this._appeals$.next(data);
        }, function (error) {
            console.log(error);
        });
    };
    AppealService.prototype.addAppeal = function (appeal) {
        var _this = this;
        var body = JSON.stringify(appeal);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({
            headers: headers
        });
        this.http.post(this._appealUrl, body, options).subscribe(function (success) { _this.loadAppeals(); }, function (error) { console.log(error); });
    };
    AppealService.prototype.updateAppeal = function (appeal) {
        var body = JSON.stringify(appeal);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({
            headers: headers
        });
        this.http.patch(this._appealUrl + appeal._id, body, options).subscribe(function (data) { return console.log(data); }, function (error) { return console.log(error); });
    };
    AppealService.prototype.removeAppeal = function (id) {
        return this.http.delete(this._appealUrl + id);
    };
    AppealService.prototype.makeGetRequest = function (url) {
        var _this = this;
        this.http.get(url).map(this.extractData).subscribe(function (data) {
            if (data instanceof Array) {
                _this._appeals$.next(data);
            }
            else {
                _this._appeals$.next([data]);
            }
        }, function (error) {
            console.log(error);
        });
    };
    AppealService.prototype.filterAppeals = function (filters) {
        if (filters.campaign) {
            var url = this._appealUrl + '?' + this._populateCampaign + '&query={"info.campaign":"' + filters.campaign._id + '"}';
            this.makeGetRequest(url);
        }
        if (filters.appealId) {
            var url = this._appealUrl + filters.appealId + '?' + this._populateCampaign;
            this.makeGetRequest(url);
        }
    };
    AppealService.prototype.getAppeals = function () {
        return this._appeals$.asObservable();
    };
    AppealService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    AppealService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Rx_1.Observable.throw(errMsg);
    };
    AppealService = __decorate([
        core_1.Injectable(),
        __metadata('design:paramtypes', [http_1.Http])
    ], AppealService);
    return AppealService;
}());
exports.AppealService = AppealService;
