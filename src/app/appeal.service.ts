import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs/Rx';

import { Appeal, AppealInfo } from './models/appeal';

import * as io from 'socket.io-client';
import * as _ from 'lodash';

interface IAppealsOperation extends Function {
  (appeals: Appeal[]): Appeal[];
}

@Injectable()
export class AppealService {
  private _appealUrl = 'http://' + window.location.hostname + ':3001/api/v1/appeal/';
  public _appeals$: BehaviorSubject<Appeal[]> = new BehaviorSubject([]);
  private appeals: Appeal[];
  public currentAppeal$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  private _currentAppeal;
  private currentAppealId: string;
  private socket = io.connect('http://' + window.location.hostname + ':5001');
  constructor(private http: Http) {
    this.loadAppeals();
    this.openSocket();
  }

  socketAdd(data) {
    console.log(data);
    this.appeals.push(data);
    this._appeals$.next(this.appeals);
  }
  socketRemove(data) {
    this.softRemoveAppeal(data);
  }
  socketUpdate(data) {
    this.softUpdateAppeal(data);
  }
  openSocket() {
    let self = this;
    this.socket.on('connected', function(data) {
      console.log(data);
    });
    this.socket.on('addAppeal', function(data) {
      self.socketAdd(data);
    });
    this.socket.on('removeAppeal', function(data) {
      self.socketRemove(data);
    });
    this.socket.on('updateAppeal', function(data) {
      self.socketUpdate(data);
    });
  }

  loadAppeals() {
    console.log('Making HTTP request, loading appeals...');
    this.http
      .get(this._appealUrl)
      .map(this.extractData)
      .subscribe(
        data => {
          let temp = new Appeal();
          console.log(data);
          for (let d of data) {
            if (!Array.isArray(d.content.body)) {
              d.content.body = [d.content.headline, d.content.body, d.content.customSignature, d.content.ps];
            }
            if (!d.content.hasOwnProperty('callout')) {
              d.content.callout = temp.content.callout;
            }
            if (d._id === this.currentAppealId) {
              this.currentAppeal$.next(d);
            }
          }
          this.appeals = data;
          this._appeals$.next(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  setCurrentAppeal(appealId) {
    this.currentAppealId = appealId;
    if (this.appeals) {
      for (let i = 0; i < this.appeals.length; i++) {
        if (this.appeals[i]._id === appealId) {
          this._currentAppeal = _.cloneDeep(this.appeals[i]);
          this.currentAppeal$.next(this.appeals[i]);
        }
      }
    }
  }

  updateCurrentAppeal(update) {
    this._currentAppeal = update;
    console.log(update);
    this.currentAppeal$.next(this._currentAppeal);
  }

  getCurrentAppeal() {
    return Observable.from(this.currentAppeal$);
  }

  addAppeal(appeal: Appeal) {
    let newAppeal = new Appeal();
    newAppeal.info = appeal.info;
    newAppeal.codes = appeal.codes;
    newAppeal.content = appeal.content;
    newAppeal.notes = appeal.notes;

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({
      headers: headers
    });

    this.http
      .post(this._appealUrl, newAppeal, options)
      .map(this.extractData)
      .subscribe(data => {
        this.appeals.push(data);
        this.socket.emit('addAppeal', data);
        this._appeals$.next(this.appeals);
        this.setCurrentAppeal(data._id);
      });
  }

  updateAppeal(appeal: Appeal) {
    let body = appeal;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({
      headers: headers
    });
    this.socket.emit('updateAppeal', appeal);
    console.log(body.content.donateColor);
    this.http.patch(this._appealUrl + appeal._id, body, options).subscribe(
      data => {
        console.log(data);
        this.setCurrentAppeal(appeal._id);
      },
      error => console.log(error)
    );
  }

  softUpdateAppeal(data: Appeal) {
    console.log(data);
    let appealData = data;
    for (let i = 0; i < this.appeals.length; i++) {
      if (this.appeals[i]._id === appealData._id) {
        this.appeals[i] = appealData;
        if (this.currentAppealId === appealData._id) {
          this.setCurrentAppeal(appealData._id);
        }
      }
    }
    this._appeals$.next(this.appeals);
  }

  softRemoveAppeal(data: Appeal) {
    let appealData = data;
    for (let i = 0; i < this.appeals.length; i++) {
      if (this.appeals[i]._id == appealData._id) {
        this.appeals.splice(i, 1);
      }
    }
    this._appeals$.next(this.appeals);
  }

  removeAppeal(data: Appeal) {
    function findId(obj) {
      return obj._id === data._id;
    }
    let appealToDelete = this.appeals.find(findId);
    let index = this.appeals.indexOf(appealToDelete);
    if (index > -1) {
      this.appeals.splice(index, 1);
    }
    this._appeals$.next(this.appeals);
    this.socket.emit('removeAppeal', data);
    this.http.delete(this._appealUrl + data._id).subscribe(data => console.log(data), error => console.log(error));
  }

  getAppeals(): Observable<Appeal[]> {
    return Observable.from(this._appeals$);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }
}
