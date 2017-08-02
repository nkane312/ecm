import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { StandardAppealComponent } from './appeal-templates/us-appeals/standard-appeal/standard-appeal.component';
import { FastAppealComponent } from './appeal-templates/us-appeals/fast-appeal/fast-appeal.component';
import { HHDAppealComponent } from './appeal-templates/us-appeals/hhd-appeal/appeal-hhd.component';
import { PassoverLargeAppealComponent } from './appeal-templates/us-appeals/passover-appeal-large-img/appeal-passover-large-img.component';
import { EmergencyResponseComponent } from './appeal-templates/us-appeals/emergency-response/emergency-response.component';
import { LeadGenerationComponent } from './appeal-templates/us-appeals/lead-generation/lead-generation.component';
import { PrayerAlertComponent } from './appeal-templates/us-appeals/prayer-alert/prayer-alert.component';
import { HHDLargeAppealComponent } from './appeal-templates/us-appeals/hhd-appeal-large-img/appeal-hhd-large-img.component';
import { StoreEmailComponent } from './appeal-templates/us-appeals/store-email/store-email.component';
import { MobileFriendlyAppealComponent } from './appeal-templates/us-appeals/mobile-friendly/mobile-friendly.component';
import { CANHHDAppealComponent } from './appeal-templates/can-appeals/can-hhd-appeal/can-appeal-hhd.component';
import { CANHHDLargeAppealComponent } from './appeal-templates/can-appeals/can-hhd-appeal-large-img/can-appeal-hhd-large-img.component';
import { CANPassoverLargeAppealComponent } from './appeal-templates/can-appeals/can-passover-appeal-large-img/can-appeal-passover-large-img.component';
import { CANStandardAppealComponent } from './appeal-templates/can-appeals/can-standard-appeal/can-appeal-standard.component';
import { CANFastAppealComponent } from './appeal-templates/can-appeals/can-fast-appeal/can-appeal-fast.component';

export const appealDetailRoutes: Routes = [
  {
    path: 'undefined',
    component: StandardAppealComponent
  },
  {
    path: 'standardAppeal',
    component: StandardAppealComponent
  },
  {
    path: 'fastAppeal',
    component: FastAppealComponent
  },
  {
    path: 'hhdAppeal',
    component: HHDAppealComponent
  },
  {
    path: 'standardLargeAppeal',
    component: HHDLargeAppealComponent
  },
  {
    path: 'hhdLargeAppeal',
    component: HHDLargeAppealComponent
  },
  {
    path: 'passoverLargeAppeal',
    component: PassoverLargeAppealComponent
  },
  {
    path: 'emergencyResponseAppeal',
    component: EmergencyResponseComponent
  },
  {
    path: 'leadGenerationAppeal',
    component: LeadGenerationComponent
  },
  {
    path: 'prayerAlertAppeal',
    component: PrayerAlertComponent
  },
  {
    path: 'storeEmail',
    component: StoreEmailComponent
  },
  {
    path: 'mobileFriendlyAppeal',
    component: MobileFriendlyAppealComponent
  },
  {
    path: 'canhhdAppeal',
    component: CANHHDAppealComponent
  },
  {
    path: 'canhhdLargeAppeal',
    component: CANHHDLargeAppealComponent
  },
  {
    path: 'canPassoverLargeAppeal',
    component: CANPassoverLargeAppealComponent
  },
  {
    path: 'canStandardAppeal',
    component: CANStandardAppealComponent
  },
  {
    path: 'canFastAppeal',
    component: CANFastAppealComponent
  }
];

export const appealDetailRouting: ModuleWithProviders = RouterModule.forChild(appealDetailRoutes);
