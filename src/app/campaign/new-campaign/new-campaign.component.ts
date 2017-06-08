import { Component, OnInit } from '@angular/core';

import { Campaign } from '../../models/campaign';
import { CampaignService } from '../../campaign.service';
import { PreviewService, Template } from '../../preview.service';

@Component({
  selector: 'app-new-campaign',
  templateUrl: './new-campaign.component.html',
  styleUrls: ['./new-campaign.component.css']
})
export class NewCampaignComponent implements OnInit {
  campaign = <Campaign>{};
  countries = ['United States', 'Canada'];
  templates: Array<Template>;
  selectedTemplates: Array<Template> = [];

  constructor(private campaignService:CampaignService, private previewService:PreviewService) {
    this.templates = previewService.templates;
  }

  createCampaign() {
    this.campaign.templates = this.selectedTemplates;
    this.campaignService.addCampaign(this.campaign);
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

  ngOnInit() {

  }
}
