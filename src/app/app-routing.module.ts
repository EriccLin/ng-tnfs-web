import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CaseCreateComponent } from './components/case-create/case-create.component';
import { LoginComponent } from './components/login/login.component';
import { PlatformComponent } from './components/platform/platform.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'platform', component: PlatformComponent, children: [
      { path: 'case-create', component: CaseCreateComponent }
    ]
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)//, { enableTracing: true }
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouteModule { }
