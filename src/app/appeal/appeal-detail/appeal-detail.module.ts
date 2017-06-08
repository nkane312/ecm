import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppealDetailComponent } from './appeal-detail.component';
import { DuplicateAppealComponent } from '../duplicate-appeal/duplicate-appeal.component';

import { AppealContentModule } from './appeal-content/appeal-content.module';
import { AppealCodesModule } from './appeal-codes/appeal-codes.module';
import { AppealInfoModule } from './appeal-info/appeal-info.module';
import { AppealSignoffsModule } from './appeal-signoffs/appeal-signoffs.module';
import { AppealNotesModule } from './appeal-notes/appeal-notes.module';
import { AppealTemplateModule } from './appeal-templates/appeal-template.module';
import { AppealListModule } from '../appeal-list/appeal-list.module';
import { PhotoCropModule } from '../photo-crop/photo-crop.module';

import { appealDetailRouting } from './appeal-detail.routes';

@NgModule({
  imports: [
    CommonModule,
    appealDetailRouting,
    AppealContentModule,
    AppealCodesModule,
    AppealInfoModule,
    AppealSignoffsModule,
    AppealNotesModule,
    AppealTemplateModule,
    AppealListModule,
    PhotoCropModule
  ],
  declarations: [
    AppealDetailComponent,
    DuplicateAppealComponent
  ],
})
export class AppealDetailModule {}
