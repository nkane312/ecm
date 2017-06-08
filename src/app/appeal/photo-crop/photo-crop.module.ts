import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CKEditorModule } from 'ng2-ckeditor';

import { PhotoCropComponent } from './photo-crop.component';
import { FileUploadComponent } from '../../file-upload/file-upload.component';
import { ModalModule } from 'ng2-bootstrap';
import { ComponentLoaderFactory } from 'ng2-bootstrap/component-loader';
import { PositioningService } from 'ng2-bootstrap/positioning/positioning.service';

@NgModule({
  imports : [
    CommonModule,
    FormsModule,
    HttpModule,
    ModalModule,
    CKEditorModule,
  ],
  declarations: [
    PhotoCropComponent,
    FileUploadComponent
  ],
  exports: [
    PhotoCropComponent,
  ],
  providers: [
    ComponentLoaderFactory,
    PositioningService
  ]
})
export class PhotoCropModule {}