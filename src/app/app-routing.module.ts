import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { ActiveGuard } from './services/active.guard';

const routes: Routes = [
  {
    path: 'main',
    canActivate: [ActiveGuard],
    component: MainComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
