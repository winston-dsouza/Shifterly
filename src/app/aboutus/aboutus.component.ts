import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  mode=1;
  mode1=0;
  mode2= "Terms and Conditions";

  change(){
    this.mode++;
    this.mode = this.mode%2;

    if(this.mode==1){
      this.mode2="Terms and Conditions";
    }
    if(this.mode==0){
      this.mode2="About us";
    }
  }

  change1(num){
    this.mode1=num;
  }

}
