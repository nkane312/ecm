import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatepickerModule, TimepickerModule, DatepickerConfig, TimepickerConfig } from 'ng2-bootstrap';
import { AppealListModule } from './appeal-list/appeal-list.module';
import { NewAppealComponent } from './new-appeal/new-appeal.component';
import { appealRouting } from './appeal.routes';
import { appealDetailRouting } from './appeal-detail/appeal-detail.routes';
import { PreviewService } from './../preview.service';

@NgModule({
  imports: [
    appealRouting,
    appealDetailRouting,
    CommonModule,
    AppealListModule,
    FormsModule,
    DatepickerModule,
    TimepickerModule
  ],
  declarations: [
    NewAppealComponent,
  ],
  exports: [
    NewAppealComponent,
  ],
  providers: [
    PreviewService,
    DatepickerConfig,
    TimepickerConfig
  ],

})
export class AppealModule {}
