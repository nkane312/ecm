import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppealInfoComponent } from './appeal-info.component';
import { RestoreService } from '../../../restore.service';
import { TimepickerModule, DatepickerModule } from 'ng2-bootstrap';

@NgModule({
  imports: [
    FormsModule,
    DatepickerModule,
    TimepickerModule,
    CommonModule
  ],
  declarations: [
    AppealInfoComponent
  ],
  providers: [
    RestoreService
  ],
  exports: [
    AppealInfoComponent
  ]
})
export class AppealInfoModule {}
