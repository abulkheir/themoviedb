import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { MavieDetailComponent } from './components/mavie-detail/mavie-detail.component';
import { MavieListComponent } from './components/mavie-list/mavie-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all-movies',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutComponent,
    children:[
      {
        path: 'all-movies',
        component: MavieListComponent
      },
      {
        path: 'movie-details/:id',
        component: MavieDetailComponent
      }
    ]
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
