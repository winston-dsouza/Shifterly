import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';


import { Router } from '@angular/router';
import * as $ from 'jquery';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  loggedIn:boolean=false;
  user:any

  constructor() { 
    this.user=firebase.auth().currentUser;
    if(this.user){
      this.loggedIn=true;
    }else{
      this.loggedIn=false;
    }

    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.loggedIn=true;
      }else{
        this.loggedIn=false;
      }
    })
  }

  ngOnInit() {
   
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
  if (window.scrollY>10) {
    document.getElementById('navi').style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; 
    
    document.getElementById('navi').classList.add("navbar-dark");
 
  } 
  if(window.scrollY<10) {
    document.getElementById('navi').style.backgroundColor = 'transparent'; 
    document.getElementById('navi').classList.remove("navbar-dark");
  }
  }

  logout(){
    firebase.auth().signOut();
    
  }

  

}
