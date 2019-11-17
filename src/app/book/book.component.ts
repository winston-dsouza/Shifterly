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
  srcPlaces:string;
  destPlaces:string;
  finaldistance;
  icon={
    url: '/assets/delivery-truck.svg',
    scaledSize: {
        width: 40,
        height: 60
    }
}
 icondel={
  url: '/assets/placeholder.svg',
  scaledSize: {
      width: 40,
      height: 60
  }
}
  

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
          this.srcPlaces= autocomplete.getPlace().formatted_address
          console.log(this.srcPlaces)
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
          //this.searchControl.reset();
      
        });
        
      });

      
      //listner2
      autocompleteDest.addListener('place_changed',()=>{
        this.ngZone.run(()=>{
          const destplace:google.maps.places.PlaceResult=autocompleteDest.getPlace();
           this.destPlaces= autocompleteDest.getPlace().formatted_address
          console.log(this.destPlaces)
        
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
          this.calculateDistance()
          console.log(this.finaldistance)
          //this.searchControlDest.reset();
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
 calculateDistance(){
   let returnDist:number;
   let origin:string=this.srcPlaces;
   console.log(origin)
   let destPlace:string=this.destPlaces;
   console.log("1")
   let service= new google.maps.DistanceMatrixService()
   console.log("2")
   service.getDistanceMatrix({
    origins: [origin],
    destinations: [destPlace],
    travelMode: 'DRIVING',
    avoidHighways: false,
    avoidTolls: false,
   },(response,status)=>{
     if(status == 'OK'){
      console.log("3")
       let origins =response.originAddresses[0];
       let destinations =response.destinationAddresses[0];
       if(response.rows[0].elements[0].status === "ZERO_RESULTS"){
         console.log("better get flight")
       }else{
        let distance = response.rows[0].elements[0].distance;
        let duration = response.rows[0].elements[0].duration;
        console.log(distance.value/1000);
        this.finaldistance=distance.value/1000;
        let duration_value=duration.value;
        return distance.value/1000;
       }
     }else{
      console.log("4")
     }

   })
   return 
 }
  

  ngAfterViewInit(){
    
    
  }
  

}
