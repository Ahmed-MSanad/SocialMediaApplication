import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
    {path: '', component: BlankComponent, children: [
        {path: 'home', component: HomeComponent}
    ]},
    {path: '', component: AuthComponent, children: [
        {path: 'register', component: RegisterComponent},
        {path: 'login', component: LoginComponent},
    ]},
    {path: "**", component: NotFoundComponent}
];
