import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AllComponent } from './all/all.component';
import { CartComponent } from './cart/cart.component';

import { LoginComponent } from './login/login.component';
import { MenComponent } from './men/men.component';
import { AuthGuard } from './shared/auth.guard';
import { RoleGuard } from './shared/role.guard';
import { ViewcartComponent } from './viewcart/viewcart.component';
import { WomenComponent } from './women/women.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'alldata',
    component: AllComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'men',
    component: MenComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'women',
    component: WomenComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'view',
    component: ViewcartComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
