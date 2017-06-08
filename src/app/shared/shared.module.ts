import { NgModule , ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CampaignService } from '../campaign.service';
import { AppealService } from '../appeal.service';

@NgModule({
  imports: [ CommonModule ],
  exports: [ CommonModule, FormsModule ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ CampaignService, AppealService ]
    }
  }
}

@NgModule({
  exports: [ SharedModule ],
  providers: [ CampaignService, AppealService ]
})
export class SharedRootModule {}
