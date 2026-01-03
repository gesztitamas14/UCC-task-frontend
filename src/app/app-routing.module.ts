import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { EventformComponent } from './events/event-form/event-form.component';
import { AuthGuard } from './auth/auth.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SetNewPasswordComponent } from './auth/set-new-password/set-new-password.component';
import { EventListResolver } from './resolvers/event-list-resolver';
import { HelpdeskPageComponent } from './helpdesk-page/helpdesk-page.component';
import { HelpdeskGuard } from './helpdesk-page/helpdesk.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'events',
    component: EventListComponent,
    resolve: {
      table: EventListResolver
    }
  },
  { path: 'events/new', component: EventformComponent, canActivate: [AuthGuard] },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'set-new-password', component: SetNewPasswordComponent },
  { path: 'helpdesk', component: HelpdeskPageComponent, canActivate: [HelpdeskGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

