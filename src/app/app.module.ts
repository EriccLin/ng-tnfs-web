import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CaseCreateComponent } from './components/case-create/case-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRouteModule } from './app-routing.module';
import { ConfigService } from './services/config.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PlatformComponent } from './components/platform/platform.component';
import { NgbDateStruct, NgbTimeStruct, NgbDatepickerModule, NgbTimepickerModule, NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastContainerComponent } from './widgets/toast/toast.component';
import '@angular/localize/init';
import * as $ from "jquery";
import { StartupService } from './services/startup.service';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { JsonPipe } from '@angular/common';

export function startupServiceFactory(startupService: StartupService): Function {
  return () => startupService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    CaseCreateComponent,
    LoginComponent,
    SidebarComponent,
    ToastContainerComponent,
    PlatformComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRouteModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        allowedDomains: ['127.0.0.1:4200']
      }
    }),
    NgbModule,
    NgbToastModule,
    FontAwesomeModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    JsonPipe
  ],
  providers: [
    ConfigService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    StartupService,
    {
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [StartupService, Injector],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
