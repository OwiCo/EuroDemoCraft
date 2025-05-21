import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from 'src/app/Components/app/app.component';
import { LoginCustomerComponent } from './Components/login-customer/login-customer.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { CountUpDirective } from './shared/directives/count-up.directive';
import { GlassForgeComponent } from './glass-forge/glass-forge.component'; // ✅ Add this
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginCustomerComponent,
    HomeComponent,
    CountUpDirective
  ],
  imports: [
    NgChartsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
