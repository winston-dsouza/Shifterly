/// <reference types="@types/googlemaps" />
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';

declare let google: any;



@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})

export class BookComponent implements OnInit ,AfterViewInit{

  @ViewChild('search',{static:false}) searchElementRef: ElementRef;
  @ViewChild('destsearch',{static:false}) destSearchElement:ElementRef;
 
  zoom:number;
  latitude:number;
  longitude:number;
  latlongs:any=[];
  latlong:any={};
  latlongsDest:any=[];
  latlongDest:any={}
  public searchControl:FormControl;
  public searchControlDest:FormControl;

  constructor(private mapsApiLoader:MapsAPILoader,private ngZone:NgZone) {
    
   }

  ngOnInit() {
    this.zoom=5;
    this.latitude=12.9141;
    this.longitude=74.8560;
    this.searchControl =new FormControl();
    this.searchControlDest=new FormControl();
   
    this.mapsApiLoader.load().then(()=>{
      //auto1
     const autocomplete =new google.maps.places.Autocomplete(this.searchElementRef.nativeElement,{
        types:[],
        componentRestrictions:{ 'country':'IN'}
      });
      //auto2
      const autocompleteDest=new google.maps.places.Autocomplete(this.destSearchElement.nativeElement,{
        types:[],
        componentRestrictions:{ 'country':'IN'}
      })
      //listner1
      autocomplete.addListener('place_changed',()=>{
        this.ngZone.run(()=>{
          const place:google.maps.places.PlaceResult=autocomplete.getPlace();
          //alert(autocomplete.getPlace().name)
          if(place.geometry === undefined || place.geometry ===null){
            return ;
          }
          this.latlongs.pop()
          const latlong={
            latitude:place.geometry.location.lat(),
            longitude:place.geometry.location.lng()
          };
          this.latlongs.push(latlong);
          console.log(this.latlongs[0])
          this.searchControl.reset();
        });
        
      });

      
      //listner2
      autocompleteDest.addListener('place_changed',()=>{
        this.ngZone.run(()=>{
          const destplace:google.maps.places.PlaceResult=autocompleteDest.getPlace();
          //alert(autocompleteDest.getPlace().description)
          console.log(autocompleteDest.getPlace().name)
        
          if(destplace.geometry === undefined || destplace.geometry ===null){
            return ;
          }
          this.latlongsDest.pop()
          const latlongDest={
            latitude:destplace.geometry.location.lat(),
            longitude:destplace.geometry.location.lng()
          };

          this.latlongsDest.push(latlongDest);
          console.log(this.latlongsDest[0])
          this.searchControlDest.reset();
        });
        
      });



    });
    
  }
  /** 
  private setCurrentPosition(){
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition((position)=>{
        this.latitude =position.coords.latitude;
        this.longitude=position.coords.longitude;
        this.zoom=80;
      })

    
    }

  }
  */
  ngAfterViewInit(){
    
    
  }
  

}
