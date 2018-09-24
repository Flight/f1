import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeasonsComponent } from './seasons/seasons.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  {
    path: 'seasons',
    component: SeasonsComponent
  },
  {
    path: 'results/:year',
    component: ResultsComponent
  },
  {
    path: '**',
    redirectTo: 'seasons'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
