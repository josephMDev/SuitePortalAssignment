import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HeadersInterceptor } from './auth/headers.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routing.module';
import { SharedModule } from './shared.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth/auth.service';  
import { AdminComponent } from './admin/admin.component';
import { ConfirmDialogComponent } from './admin/confirm-dialog.component';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    SharedModule,
    HomeModule,
    LoginModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    AdminComponent,
    ConfirmDialogComponent,
  ],
  providers: [AuthService,
            {
              provide: HTTP_INTERCEPTORS,
              useClass: HeadersInterceptor,
              multi: true,
            },
  ],
  
  bootstrap: [AppComponent],
})
export class AppModule {}
