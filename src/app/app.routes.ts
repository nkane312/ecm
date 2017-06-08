import { Routes, RouterModule } from '@angular/router';
import { LocationStrategy, PathLocationStrategy} from '@angular/common';

import { AppComponent } from './app.component';

import { FiltersComponent } from './filters/filters.component';
/*
function loadDetailModule(): any {
  return require('es6-promise!./appeal/appeal-detail/appeal-detail.module')("AppealDetailModule");
}
*/

const routes: Routes = [
  { path: '', redirectTo: 'filters', pathMatch: 'full' },
  { path: 'filters', component: FiltersComponent },
];

export const appRoutingProviders: any[] = [
  { provide: LocationStrategy, useClass: PathLocationStrategy }
];

export const routing = RouterModule.forRoot(routes);
