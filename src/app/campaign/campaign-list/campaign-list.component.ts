import { Component, OnInit, Pipe } from '@angular/core';

import 'rxjs/Rx';
import * as moment from 'moment';

import { Campaign } from '../../models/campaign';
import { CampaignService } from '../../campaign.service';

@Component({
  selector: 'campaign-list-component',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css'],
})
export class CampaignListComponent implements OnInit {
  campaigns: Campaign[];
  constructor(private campaignService: CampaignService) {

  }

  getCampaigns(){  
    this.campaignService.getCampaigns().subscribe(
      data => { this.campaigns = data },
      error => { console.log(error) }
    );
  }

  deleteCampaign(id) {
    this.campaignService.removeCampaign(id).subscribe(
      success => {
        this.campaignService.loadCampaigns();
      },
      error => {
        console.log(error);
      }
    );
  }
  ngOnInit() {
    this.getCampaigns();
  }
}
