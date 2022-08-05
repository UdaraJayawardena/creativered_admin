import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardContentComponent} from './basic-content/main-content/dashboard-content/dashboard-content.component';
import {ProductContentComponent} from './basic-content/main-content/product-content/product-content.component';
import {ReportsContentComponent} from './basic-content/main-content/reports-content/reports-content.component';
import {SystemContentComponent} from './basic-content/main-content/system-content/system-content.component';
import {AddproductContentComponent} from './basic-content/main-content/addproduct-content/addproduct-content.component';
import {CustomerContentComponent} from './basic-content/main-content/customer-content/customer-content.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {BasicContentComponent} from './basic-content/basic-content.component';
import {MainContentComponent} from './basic-content/main-content/main-content.component';
import {AuthGuard} from './auth.guard';
import {DirectForgetComponent} from './basic-content/main-content/direct-forget/direct-forget.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent},
  {path: 'directForget', component: DirectForgetComponent},
  {
    path: 'basic', component: BasicContentComponent, children: [
      {path: '', redirectTo: 'main', pathMatch: 'full'},
      {
        path: 'main', component: MainContentComponent, children: [
          {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
          {path: 'dashboard', component: DashboardContentComponent},
          {path: 'customer', component: CustomerContentComponent},
          {path: 'product', component: ProductContentComponent},
          {path: 'reports', component: ReportsContentComponent},
          {path: 'system', component: SystemContentComponent},
          {path: 'addProduct', component: AddproductContentComponent}
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routingComponents = [LoginPageComponent, BasicContentComponent, MainContentComponent,
  DashboardContentComponent, CustomerContentComponent, ProductContentComponent,
  ReportsContentComponent, SystemContentComponent, AddproductContentComponent];
