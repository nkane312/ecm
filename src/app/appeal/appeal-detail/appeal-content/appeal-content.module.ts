import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppealContentComponent } from './appeal-content.component';
import { RestoreService } from '../../../restore.service';
import { CKEditorModule } from 'ng2-ckeditor';
import { PhotoCropModule } from '../../photo-crop/photo-crop.module';


@NgModule({
  imports : [
    CommonModule,
    CKEditorModule,
    FormsModule,
    PhotoCropModule
  ],
  declarations: [
    AppealContentComponent,
  ],
  providers: [
    RestoreService
  ],
  exports: [
    AppealContentComponent,
  ]
})
export class AppealContentModule {}
