import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { LoginComponent } from './login/login.component';
import { CapitalizePipe } from './capitalize.pipe';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { BookComponent } from './book/book.component';
import { AgmCoreModule } from "@agm/core";
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { AboutusComponent } from './aboutus/aboutus.component';


var firebaseConfig = {
  apiKey: "AIzaSyDhVmNYg-qoi4pjt2Eh4sjK-lUPs1J5LYM",
  authDomain: "shifterly-7cb53.firebaseapp.com",
  databaseURL: "https://shifterly-7cb53.firebaseio.com",
  projectId: "shifterly-7cb53",
  storageBucket: "shifterly-7cb53.appspot.com",
  messagingSenderId: "760805513840",
  appId: "1:760805513840:web:b59c50a98872a3788772b5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    CapitalizePipe,
    HomeComponent,
    MenuComponent,
    BookComponent,
    MyBookingsComponent,
    AboutusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey:"AIzaSyDy29zNWUH7WZKauXjNwbFAFLopsuWhsJo",
      libraries: ['places']
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
