import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, AlertController } from 'ionic-angular';
import {Geolocation} from "@ionic-native/geolocation";
import * as firebase from "firebase";

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  LatLng
} from '@ionic-native/google-maps';
import {NativeGeocoder, NativeGeocoderForwardResult, NativeGeocoderReverseResult} from "@ionic-native/native-geocoder";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {AngularFireAuth} from "angularfire2/auth";
import {root} from "rxjs/util/root";
import {HomePage} from "../home/home";

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  map: GoogleMap;
  fromGeo: any;
  geoCoder: any;
  address: string;
  number: string;
  currentUser: string;

  usersRef: AngularFireList<any>;
  users: Observable<any>;

  constructor(
    private navCtrl: NavController,
    private googleMaps: GoogleMaps,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public database: AngularFireDatabase,
    private fire:AngularFireAuth,
    private alertCtrl: AlertController
  ) {
    this.currentUser = firebase.auth().currentUser.email;
    this.usersRef = this.database.list('trayectos');
    this.users = this.usersRef.snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val()}));
      });
  }

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
    //this.doGeocode();

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        // Now you can use all methods safely.
        let markerOptions: MarkerOptions = {
          position: crrLoc,
          title: "Tu posición"
        };

        this.map.addMarker(markerOptions);
        //this.getPosition();
      })
      .catch(error =>{
        console.log(error);
      });

    this.nativeGeocoder.reverseGeocode(this.fromGeo.latitude, this.fromGeo.longitude)
      .then((result: NativeGeocoderReverseResult) => {
        this.address = result[0].thoroughfare;
        this.number = result[0].subThoroughfare;
      })
      .catch((error: any) => console.log(error));

  }

  private fetCords() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.fromGeo = resp.coords;
      this.loadMap(this.fromGeo.latitude, this.fromGeo.longitude)
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

  taxiUbicacion(){

    this.usersRef.push({
      user: this.currentUser,
      address: this.address + " " + this.number
    })


  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Ubicación',
      message: "Por favor, introduzca la dirección donde desea pedir su taxi",
      inputs: [
        {
          name: 'address',
          placeholder: 'Calle'
        },
        {
          name: 'number',
          placeholder: 'Número'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.address = data.address;
            this.number = data.number;
            this.moveCamera(this.address, this.number);
            console.log('Saved clicked' + this.address);
          }
        }
      ]
    });
    prompt.present();
  }

  moveCamera(address: string, number: string){



    this.nativeGeocoder.forwardGeocode(address)
      .then((result: NativeGeocoderForwardResult) => {
        this.map.animateCamera({
          target: new LatLng(result[0].latitude, result[0].longitude)
        });
        let markerOptions: MarkerOptions = {
          position: new LatLng(result[0].latitude, result[0].longitude),
          title: "Tu posición",
          tilt: 60,
          zoom: 18,
          bearing: 140,
          duration: 5000
        };
        this.map.addMarker(markerOptions)
      })
      .catch((error: any) => console.log('No ha podido ser la redireccion'))

  }

  logOut(){
    this.fire.auth.signOut();
    console.log(this.fire.auth.currentUser);
    this.navCtrl.setRoot( HomePage );
  }

}
