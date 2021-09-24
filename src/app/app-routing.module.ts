import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { MapComponent } from './map/map.component';
import { PotreeComponent } from './potree/potree.component';
import { AuthComponent } from './auth/auth.component';
import { ViewerComponent } from './viewer/viewer.component';
import { ContourComponent } from './contour/contour.component';
import { DsmComponent } from './dsm/dsm.component';

const routes: Routes = [
  // Layout componet and other pages
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/auth', pathMatch: 'full' },
      { path: 'map', component: MapComponent },
      { path: 'potree', component: PotreeComponent },
      { path: 'viewer/:id', component: ViewerComponent, pathMatch: 'prefix' },
      { path: 'contour', component: ContourComponent },
      { path: 'dsm', component: DsmComponent }
    ]
  },
  { path: 'auth', component: AuthComponent },
  {
    path: '**',
    redirectTo: '/auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
