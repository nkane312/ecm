import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppealSignoffsComponent } from './appeal-signoffs.component';
import { RestoreService } from '../../../restore.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    AppealSignoffsComponent
  ],
  providers: [
    RestoreService
  ],
  exports: [
    AppealSignoffsComponent
  ]
})
export class AppealSignoffsModule {}
