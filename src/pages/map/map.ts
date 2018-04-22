import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import {Geolocation} from "@ionic-native/geolocation";

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker, LatLng
} from '@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  map: GoogleMap;
  private fromGeo;

  constructor(
    private navCtrl: NavController,
    private googleMaps: GoogleMaps,
    private geolocation: Geolocation
  ) {}

  ionViewDidLoad(){
    this.fetCords();
  }

  loadMap(lat: number, lon:number){

    let crrLoc: LatLng = new LatLng(lat,lon)

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: crrLoc,
        zoom: 18,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        // Now you can use all methods safely.
        this.getPosition();
      })
      .catch(error =>{
        console.log(error);
      });

  }

  private fetCords() {
    // maps api key : AIzaSyCZhTJB1kFAP70RuwDtt6uso9e3DCLdRWs
    // ionic plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="AIzaSyCZhTJB1kFAP70RuwDtt6uso9e3DCLdRWs"
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      // console.log(resp);
      this.fromGeo = resp.coords;
      this.loadMap(this.fromGeo.latitude, this.fromGeo.longitude)
      // Get the products at this location
      // Trip in progress?
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  getPosition(): void{
    this.map.getMyLocation()
      .then(response => {
        this.map.moveCamera({
          target: response.latLng
        });
        this.map.addMarker({
          title: 'My Position',
          icon: 'blue',
          animation: 'DROP',
          position: response.latLng
        });
      })
      .catch(error =>{
        console.log(error);
      });
  }

}
