import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { RegisterUserComponent } from './register-user/register-user.component';
import { ViewerComponent } from './viewer/viewer.component';
import { OrthoComponent } from './ortho/ortho.component';
import { ContourComponent } from './contour/contour.component';
import { DsmComponent } from './dsm/dsm.component';

import { AgmCoreModule } from '@agm/core';

import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from './shared/shared.module';

import { NavbarComponent } from './navbar/navbar.component';
import { PotreeComponent } from './potree/potree.component';
import { MapComponent } from './map/map.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RouterModule, Routes } from '@angular/router';
import { MaptilerComponent } from './maptiler/maptiler.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { AuthComponent } from './auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
@NgModule({
  declarations: [
    AppComponent,
    // RegisterUserComponent
    NavbarComponent,
    RegisterUserComponent,
    MapComponent,
    MaptilerComponent,
    PopUpComponent,
    PotreeComponent,
    ViewerComponent,
    OrthoComponent,
    ContourComponent,
    DsmComponent,
    HeaderComponent,
    LayoutComponent,
    AuthComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    // BrowserAnimationsModule
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAjuWEEcP38PbWwuwt3SK3OMr4HBfPd5jI'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
