import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddComponent} from './add/add.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ListComponent} from './list/list.component';
import {AuthGuard} from '../auth.guard';
import {Role} from '../models/role';
import {DetailsComponent} from './details/details.component';
import { UpdateAddressComponent } from './update-address/update-address.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  { path: 'add', component: AddComponent },
  { path: 'address-update', component: UpdateAddressComponent },
  {
    path: 'list',
    component: ListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TravellersRoutingModule {
}
