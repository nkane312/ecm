import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Campaign } from '../../models/campaign';
import { CampaignService } from '../../campaign.service';
import { PreviewService, Template } from '../../preview.service';

@Component({
  selector: 'app-edit-campaign',
  templateUrl: './edit-campaign.component.html',
  styleUrls: ['./edit-campaign.component.css']
})
export class EditCampaignComponent implements OnInit {
  campaign = <Campaign>{};
  countries = ['United States', 'Canada'];
  templates: Array<Template>;
  selectedTemplates: Array<Template> = [];
  private _routeSub: Subscription;

  constructor(private campaignService:CampaignService, private route: ActivatedRoute, private previewService:PreviewService) {
    this.templates = previewService.templates;
  }

  updateCampaign() {
    this.campaign.templates = this.selectedTemplates;
    this.campaignService.updateCampaign(this.campaign);
  }
  
  selectTemplate(template){
    let index = this.findTemplate(template);
    if (index >= 0){
      this.selectedTemplates.splice(index, 1);
    }
    else {
      this.selectedTemplates.push(template);
    }
  }

  findTemplate(template){
    let found = -1;
    
    if (this.selectedTemplates.length > 0){
      for (let i = 0; i < this.selectedTemplates.length; i++){
        if (this.selectedTemplates[i].id === template.id){
          found = i;
        }
      }
    }
    return found;
  }

  setCampaign(qs){
    if(qs.hasOwnProperty('campaignId')){
      console.log(qs);
      this.campaign = this.campaignService.getCampaign(qs.campaignId);
      console.log(this.campaign);
      if(this.campaign){
        if (this.campaign.hasOwnProperty('templates')){
          for (let i = 0; i < this.campaign.templates.length; i++){
            this.selectTemplate(this.campaign.templates[i]);
          }
        }
      }
    }
  }

  ngOnInit() {
    if(!this._routeSub){
      console.warn('A subscription is being made to route.params');
      this._routeSub = this.route.params
      .subscribe(queryString => {
        this.setCampaign(queryString);
      });
    }
  }
  ngOnDestroy(){
    if(this._routeSub){
      this._routeSub.unsubscribe();
    }
  }
}
