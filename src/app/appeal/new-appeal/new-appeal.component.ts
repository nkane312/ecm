import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { Appeal, AppealInfo } from '../../models/appeal';
import { Campaign } from '../../models/campaign';
import { CampaignService } from '../../campaign.service';
import { AppealService } from '../../appeal.service';

import { PreviewService, Template } from '../../preview.service';


@Component({
  selector: 'app-new-appeal',
  templateUrl: './new-appeal.component.html',
  styleUrls: ['./new-appeal.component.css'],
})
export class NewAppealComponent implements OnInit {
  private campaigns: Observable<Campaign[]>;
  private appeal: Appeal = new Appeal();
  private info: AppealInfo = new AppealInfo();
  private sendTime: Date = new Date();
  private appeals: Appeal[];
  private templates: Array<Template>;
  private appealSub;
  private currentAppeal;
  private currentAppealSub: Subscription;
  
  constructor(private campaignService: CampaignService, private appealService: AppealService, private previewService: PreviewService, private router: Router) {
    this.templates = previewService.templates;
  }
  
  appealSubmit(){
    var mins = this.sendTime.getMinutes();
    var hours = this.sendTime.getHours();
    if (this.info.hasOwnProperty('sendDate')){
      this.info.sendDate.setMinutes(mins);
      this.info.sendDate.setHours(hours);
    }
    this.appeal.info = this.info;
    this.appealService.addAppeal(this.appeal);
  }
  ngOnInit() {
    this.sendTime.setHours(7);
    this.sendTime.setMinutes(0);
    this.campaigns = this.campaignService.getCampaigns();
    if (!this.appealSub){
      this.appealSub = this.appealService.getAppeals().subscribe(
        data => {
          this.appeals = data;
        }
      );
    }
    if (!this.currentAppealSub){
      this.currentAppealSub = this.appealService.getCurrentAppeal().subscribe(
        data => {
          if (!this.currentAppeal){
            this.currentAppeal = 'setup';
          }
          else {
            console.log('else');
            console.log(data);
            this.currentAppeal = data;
            this.router.navigate(['/appeal', this.currentAppeal._id, this.currentAppeal.info.template]);
          }
        }
      );
    }
  }
  ngOnDestroy(){
    if(this.appealSub){
      this.appealSub.unsubscribe();
    }
    if(this.currentAppealSub){
      this.currentAppealSub.unsubscribe();
    }
  }
}
