import { Routes, RouterModule } from '@angular/router';

import { NewCampaignComponent } from './new-campaign/new-campaign.component';
import { EditCampaignComponent } from './edit-campaign/edit-campaign.component';
import { CampaignListComponent } from './campaign-list/campaign-list.component';

const routes: Routes = [
  { path: 'new-campaign', component: NewCampaignComponent },
  { path: 'campaign/:campaignId', component: EditCampaignComponent },
];

export const routing = RouterModule.forChild(routes);
