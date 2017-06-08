import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandardAppealComponent } from './us-appeals/standard-appeal/standard-appeal.component';
import { HHDAppealComponent } from './us-appeals/hhd-appeal/appeal-hhd.component';
import { HHDLargeAppealComponent } from './us-appeals/hhd-appeal-large-img/appeal-hhd-large-img.component';
import { PassoverLargeAppealComponent } from './us-appeals/passover-appeal-large-img/appeal-passover-large-img.component';
import { EmergencyResponseComponent } from './us-appeals/emergency-response/emergency-response.component';
import { PrayerAlertComponent } from './us-appeals/prayer-alert/prayer-alert.component';
import { MobileFriendlyAppealComponent } from './us-appeals/mobile-friendly/mobile-friendly.component';
import { CANHHDAppealComponent } from './can-appeals/can-hhd-appeal/can-appeal-hhd.component';
import { CANHHDLargeAppealComponent } from './can-appeals/can-hhd-appeal-large-img/can-appeal-hhd-large-img.component';
import { CANPassoverLargeAppealComponent } from './can-appeals/can-passover-appeal-large-img/can-appeal-passover-large-img.component';
import { CANStandardAppealComponent } from './can-appeals/can-standard-appeal/can-appeal-standard.component';
import { CANFastAppealComponent } from './can-appeals/can-fast-appeal/can-appeal-fast.component';
import { FastAppealComponent } from './us-appeals/fast-appeal/fast-appeal.component';
import { StoreEmailComponent } from './us-appeals/store-email/store-email.component';

import { SafePipe } from '../../../safe.pipe';
import { PlainTextPipe } from '../../../plain-text.pipe';
import { RemoveHtmlPipe } from '../../../remove-html.pipe';

import { CopyControlsComponent } from './copy-controls/copy-controls.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    StandardAppealComponent,
    FastAppealComponent,
    HHDAppealComponent,
    HHDLargeAppealComponent,
    PassoverLargeAppealComponent,
    EmergencyResponseComponent,
    PrayerAlertComponent,
    MobileFriendlyAppealComponent,
    StoreEmailComponent,
    CANHHDAppealComponent,
    CANHHDLargeAppealComponent,
    CANPassoverLargeAppealComponent,
    CANStandardAppealComponent,
    CANFastAppealComponent,
    SafePipe,
    PlainTextPipe,
    RemoveHtmlPipe,
    CopyControlsComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppealTemplateModule {}
