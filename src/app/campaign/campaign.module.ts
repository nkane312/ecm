import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NewCampaignComponent } from './new-campaign/new-campaign.component';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { routing } from './campaign.routes';
import { TimepickerModule, DatepickerModule } from 'ng2-bootstrap';
import { EditCampaignComponent } from './edit-campaign/edit-campaign.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    TimepickerModule,
    DatepickerModule
  ],
  declarations: [
    CampaignListComponent,
    NewCampaignComponent,
    EditCampaignComponent
  ],
})
export class CampaignModule {}
