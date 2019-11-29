import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {

  user:any;
  bookingsArr :any[]=[];

  constructor() { 
    this.user =firebase.auth().currentUser;
  }

  ngOnInit() {
    this.getBookings();
    
  }

  getBookings(){
    firebase.firestore().collection("bookings")
    .where("owner","==",this.user.uid)
    .orderBy("booktime","desc")
    .get().then((data)=>{
      data.docs.forEach((bookRef)=>{
        this.bookingsArr.push(bookRef.data())
        
      })
    })
  }

}
