import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppealCodesComponent } from './appeal-codes.component';
import { RestoreService } from '../../../restore.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule
  ],
  declarations: [
    AppealCodesComponent
  ],
  providers: [
    RestoreService
  ],
  exports: [
    AppealCodesComponent
  ]
})
export class AppealCodesModule {}
