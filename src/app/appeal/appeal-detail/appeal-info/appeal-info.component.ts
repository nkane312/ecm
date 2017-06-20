import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { Observable, BehaviorSubject, Subscription } from 'rxjs/Rx';
import * as _ from 'lodash';

import { Campaign } from '../../../models/campaign';
import { CampaignService } from '../../../campaign.service';
import { AppealService } from '../../../appeal.service';
import { AppealInfo } from '../../../models/appeal';

import { PreviewService, Template } from '../../../preview.service';
import { RestoreService } from '../../../restore.service';

@Component({
  selector: 'app-appeal-info',
  templateUrl: './appeal-info.component.html',
  styleUrls: ['./appeal-info.component.css'],
  providers: [RestoreService]
})
export class AppealInfoComponent implements OnInit {
  @Output() saved = new EventEmitter<AppealInfo>();
  @Output() canceled = new EventEmitter<AppealInfo>();
  private campaigns: Observable<Campaign[]>;
  private _campaigns: Campaign[];
  private sendTime: Date;
  
  private templates: Array<Template>;

  private changed = false;

  constructor(private restoreService: RestoreService<AppealInfo>, private campaignService: CampaignService, private appealService: AppealService, private previewService: PreviewService) {
    this.campaigns = this.campaignService.getCampaigns();
    this.campaigns.subscribe(data => {
      this._campaigns = data;
    });
  }

  checkChanged(){
    this.info.sendDate.setMinutes(this.sendTime.getMinutes());
    this.info.sendDate.setHours(this.sendTime.getHours());
    this.changed = this.restoreService.isChanged();
  }
  
  setCampaign(val){
    for (var i = 0; i < this._campaigns.length; i++){
      if (val === this._campaigns[i]._id){
        this.info.campaign = Object.assign({}, this._campaigns[i]);
        this.templates = this.info.campaign.templates;
      }
    }
  }
  
  @Input()
  set info(data: AppealInfo) {
    data.sendDate = new Date(data.sendDate);
    this.sendTime = data.sendDate;
    this.templates = data.campaign.templates;
    for (var i = 0; i < this._campaigns.length; i++){
      if (data.campaign._id === this._campaigns[i]._id){
        data.campaign = Object.assign({}, this._campaigns[i]);
        this.templates = data.campaign.templates;
      }
    }
    this.restoreService.setItem(data);
    this.checkChanged();
    $(function () {
      $('[data-toggle="popover"]').popover({trigger: 'hover focus', container: 'app-root', html: true});
    });
  }
  get info(): AppealInfo {
    return this.restoreService.getItem();
  }

  save() {
    this.info.sendDate.setMinutes(this.sendTime.getMinutes());
    this.info.sendDate.setHours(this.sendTime.getHours());
    this.setCampaign(this.info.campaign._id);
    this.restoreService.setItem(this.info);
    this.saved.emit(this.info);
    this.checkChanged();
  }
  cancel() {
    this.info = this.restoreService.restoreItem();
    this.canceled.emit(this.info);
    this.checkChanged();
  }

  ngOnInit() {
    $(function () {
      $('[data-toggle="popover"]').popover({trigger: 'hover focus', container: 'app-root', html: true});
    });
  }
}
