import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppealListComponent } from './appeal-list.component';
import { appealRouting } from '../appeal.routes';

@NgModule({
    imports: [
        CommonModule,
        appealRouting
    ],
    declarations: [
        AppealListComponent
    ],
    exports: [
        AppealListComponent
    ]
})
export class AppealListModule {}