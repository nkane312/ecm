import { Routes, RouterModule } from '@angular/router';

import {NewAppealComponent} from './new-appeal/new-appeal.component';
import {AppealDetailComponent} from './appeal-detail/appeal-detail.component';
import {appealDetailRoutes} from './appeal-detail/appeal-detail.routes';

const routes: Routes = [
  { path: 'new-appeal', component: NewAppealComponent },
  { path: 'appeal/:appealId', component: AppealDetailComponent,
    children: appealDetailRoutes
  }
];

export const appealRouting = RouterModule.forChild(routes);
