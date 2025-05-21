import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginCustomerComponent } from './Components/login-customer/login-customer.component';
import { HomeComponent } from './home/home.component';
import { GlassForgeComponent } from './glass-forge/glass-forge.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { ConfiguratorComponent } from './pages/configurator/configurator.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { SalesOrdersComponent } from './pages/sales-orders/sales-orders.component';
import { ProductionDashboardComponent } from './pages/production-dashboard/production-dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginCustomerComponent },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'glassforge', component: GlassForgeComponent }, // ✅ Add this
      { path: 'configurator', component: ConfiguratorComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'sales-orders', component: SalesOrdersComponent },
      { path: 'production-dashboard', component: ProductionDashboardComponent }
    //  { path: 'glassforge', loadComponent: () => import('./glass-forge/glass-forge.component').then(m => m.GlassForgeComponent) }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
