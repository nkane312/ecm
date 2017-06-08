import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject, Observable } from 'rxjs/Rx';

import { Campaign } from '../models/campaign';
import { CampaignService } from '../campaign.service';
import { AppealService } from '../appeal.service';

import { Appeal } from '../models/appeal';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  private campaigns$: Observable<Campaign[]>;
  private appeals: Appeal[] = [];
  private filteredAppeals: Appeal[];
  private filters: Object = { scheduled: 'no' };
  private appeals$: Observable<Appeal[]>;
  private filterSub;
  constructor(private campaignService: CampaignService, private appealService: AppealService) {
    this.campaigns$ = campaignService.getCampaigns();
  }

  filter(filters) {
    var filterArray = [];
    this.appeals.map(
      data => {
        let match = true;
        if (filters.campaign){
          if (data.info.campaign.utm !== filters.campaign.utm){
            match = false;
          }
        }
        if (filters.scheduled){
          if (filters.scheduled === 'yes'){
            if(data.info.scheduled !== true){
              match = false;
            }
          }
          else if (filters.scheduled === 'no'){
            if(data.info.scheduled !== false){
              match = false;
            }
          }
        }
        let sendDate = new Date(data.info.sendDate);
        if (filters.startDate && filters.endDate){
          filters.endDate.setHours(23, 59, 59, 999);
          if(sendDate.getTime() < filters.startDate.getTime() || sendDate.getTime() > filters.endDate.getTime()){
            match = false;
          }
        }
        else if (filters.startDate && !filters.endDate){
          if(sendDate.getTime() < filters.startDate.getTime()){
            match = false;
          }
        }
        else if (!filters.startDate && filters.endDate){
          filters.endDate.setHours(23, 59, 59, 999);
          if (sendDate.getTime() > filters.endDate.getTime()){
            match = false;
          }
        }
        if (match){
          filterArray.push(data);
        }
      }
    );
    console.log(filterArray);
    filterArray.sort(function (a, b) {
      if (a.info.sendDate < b.info.sendDate) {
        return -1;
      } else {
        return 1;
      }
    })
    this.filteredAppeals = filterArray;
  };

  ngOnInit() {
    if (!this.appeals$){
      this.appeals$ = this.appealService.getAppeals();
      this.appeals$.subscribe(data => {
        this.appeals = data;
        
        this.filter(this.filters);
      });
    }
  }

  ngOnDestroy(){
    if (this.filterSub){
      this.filterSub.unsubscribe();
    }
  }

}
