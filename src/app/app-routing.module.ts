import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEventComponent } from './views/list-event/list-event.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/list_event',
    pathMatch: 'full'
  },
  {
    path: 'list_event',
    component: ListEventComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
