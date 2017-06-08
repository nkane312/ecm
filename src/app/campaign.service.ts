import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { List } from 'immutable';
import { Subject, BehaviorSubject, Observable } from 'rxjs/Rx';

import { Campaign } from './models/campaign';

import * as io from "socket.io-client";

let initialCampaigns: Campaign[] = [];

interface ICampaignsOperation extends Function {
  (campaigns: Campaign[]): Campaign[];
}

@Injectable()
export class CampaignService {
  private _campaignUrl = 'http://' + window.location.hostname + ':3001/api/v1/campaign/';
  private _campaigns$: BehaviorSubject<Campaign[]>;
  private campaigns:Campaign[] = [];

  private socket = io.connect('http://' + window.location.hostname + ':5001');

  constructor(private http: Http) {
    this._campaigns$ = <BehaviorSubject<Campaign[]>>new BehaviorSubject([]);
    this.loadCampaigns();
    this.openSocket();
  }

  socketAdd(data){
    console.log(data);
    this.campaigns.push(data);
    this._campaigns$.next(this.campaigns);
  }
  socketRemove(data){
    this.loadCampaigns();
  }
  socketUpdate(data){
    this.loadCampaigns();
  }
  openSocket() {
    let self = this;
    this.socket.on('connected', function(data){
      console.log(data);
    });
    this.socket.on('addCampaign', function(data){
      self.socketAdd(data);
    });
    this.socket.on('removeCampaign', function(data){
      self.socketRemove(data);
    });
    this.socket.on('updateCampaign', function(data){
      self.socketUpdate(data);
    });
  }


  loadCampaigns() {
    this.http.get(this._campaignUrl).map(this.extractData).subscribe(
      data => {
        this.campaigns = data;
        this._campaigns$.next(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  addCampaign(campaign: Campaign) {
    console.log(campaign);
    let ebody = JSON.stringify(campaign || null);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({
      headers: headers
    });
    this.http.post(this._campaignUrl, ebody, options).subscribe(
      success => {this.loadCampaigns();},
      error => {console.log(error);}
    );
  }

  updateCampaign(campaign: Campaign) {
    console.log(campaign);
    let ebody = JSON.stringify(campaign || null);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({
      headers: headers
    });
    this.socket.emit('updateCampaign', campaign);
    this.http.patch(this._campaignUrl + campaign._id, ebody, options).subscribe(
      success => {this.loadCampaigns();},
      error => {console.log(error);}
    );
  }

  removeCampaign(id: String): Observable<Response> {
    return this.http.delete(this._campaignUrl + id);
  }

  getCampaigns(): Observable<Campaign[]> {
    return this._campaigns$.asObservable();
  }
  getCampaign(id): Campaign {
    console.log('getting campaign');
    let index = this.findCampaign(id);
    console.log(index);
    if (index >= 0){
      return this.campaigns[index];
    }
  }
  private findCampaign(id){
    let found = -1;
    if (this.campaigns.length > 0){
      for (let i = 0; i < this.campaigns.length; i++){
        if(this.campaigns[i]._id === id){
          found = i;
        }
      }
    }
    return found;
  }

  private extractData(res: Response){
    let body = res.json();
    return body || {};
  }

  private handleError(error: any){
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
