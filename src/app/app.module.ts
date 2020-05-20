import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { AlertsModule } from 'angular-alert-module';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { CanActivateRouteGuard } from './can-activate-routes.guard';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { DonateComponent } from './components/donate/donate.component';
import { BlogComponent } from './components/blog/blog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ShopComponent,
    RestaurantComponent,
    CheckoutComponent,
    DonateComponent,
    BlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
    // AlertsModule.forRoot(),
  ],
  providers: [CanActivateRouteGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
