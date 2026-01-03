import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventListComponent } from './events/event-list/event-list.component';
import { EventformComponent } from './events/event-form/event-form.component';
import { HeaderComponent } from './shared/header/header.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SetNewPasswordComponent } from './auth/set-new-password/set-new-password.component';
import { DataTableComponent } from './shared/data-table/data-table.component';
import { ChatComponent } from './chat/chat.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HelpdeskPageComponent } from './helpdesk-page/helpdesk-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EventListComponent,
    EventformComponent,
    DataTableComponent,
    HeaderComponent,
    ResetPasswordComponent,
    SetNewPasswordComponent,
    ChatComponent,
    HelpdeskPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
