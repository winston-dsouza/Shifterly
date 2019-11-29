import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BookComponent } from './book/book.component';
import { AuthGuard } from './auth.guard';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { AboutusComponent } from './aboutus/aboutus.component';


const routes: Routes = [{
  path: '',redirectTo:'home',pathMatch:'full'
},{
  path:'home',component:HomeComponent
},{
  path:'login',component:LoginComponent
},{
  path: 'signup',component:SignupComponent
},{
  path: 'book',component:BookComponent,canActivate:[AuthGuard]
},{
  path:'mybookings',component:MyBookingsComponent,canActivate:[AuthGuard]
},{
  path:'about',component:AboutusComponent
},{
  path: '**',redirectTo:'home'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
