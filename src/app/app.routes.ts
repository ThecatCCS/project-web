import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SigupComponent } from './sigup/sigup.component';
import { MainComponent } from './main/main.component';
import { Top10Component } from './top10/top10.component';
import { ProfileComponent } from './profile/profile.component';
import { LineChartComponent } from './line-chart/linechart.component';
import { ProfileuserComponent } from './profileuser/profileuser.component';
import { AddminComponent } from './addmin/addmin.component';
export const routes: Routes = [

    {path: 'login', component: LoginComponent},
    {path: 'sigup', component: SigupComponent},
    {path: '', component: MainComponent},
    {path: 'top10', component: Top10Component},
    {path: 'main/id', component: MainComponent},
    {path: 'main', component: MainComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'login/id', component: LoginComponent},
    {path: 'chart', component: LineChartComponent},
    { path: 'linechart/:pt_id', component: LineChartComponent },
    { path: 'profileuser/:userId', component: ProfileuserComponent },
    { path: 'addmin', component: AddminComponent },

];