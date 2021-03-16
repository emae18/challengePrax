import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudTemplateComponent } from './components/crud-template/crud-template.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './utils/auth.guard';

const routes: Routes = [
/*   {path:'**',redirectTo: 'home'},
 */  { path: '', component: HomeComponent },
  {
    path: 'home', component: HomeComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },

    ]
  },
  {
    path: 'layout', component: LayoutComponent, children: [
      { path: 'profile', component: ProfileComponent,outlet:'left' },
      { path: 'crud', component: CrudTemplateComponent, outlet: 'right' },
      { path: 'docs', component: DocumentsComponent, outlet: 'right' }
    ]
  , canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }