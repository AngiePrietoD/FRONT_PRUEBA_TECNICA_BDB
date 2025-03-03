import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { PersonalInformationComponent } from './views/personal-information/personal-information.component';
import { ListEventComponent } from './views/list-event/list-event.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'personal_Information',
    component: PersonalInformationComponent,
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
