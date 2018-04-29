import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { LoggedinPage } from '../pages/loggedin/loggedin';
import { RegisterPage } from '../pages/register/register';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule} from "angularfire2/database";
import { GoogleMaps} from "@ionic-native/google-maps";
import {MapPage} from "../pages/map/map";
import {Geolocation} from "@ionic-native/geolocation";
import {Diagnostic} from "@ionic-native/diagnostic";
import {NativeGeocoder} from "@ionic-native/native-geocoder";
import { AngularFireDatabase } from 'angularfire2/database';

import {HistoryPage} from "../pages/history/history";


const firebaseAuth = {
  apiKey: "AIzaSyBkxxp48ViiHPkz0XDiTqc5lsTMqdIsBQw",
  authDomain: "tappxy-6c995.firebaseapp.com",
  databaseURL: "https://tappxy-6c995.firebaseio.com",
  projectId: "tappxy-6c995",
  storageBucket: "",
  messagingSenderId: "404382202581"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    LoggedinPage,
    MapPage,
    HistoryPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    LoggedinPage,
    MapPage,
    HistoryPage,
  ],
  providers: [
    AngularFireDatabase,
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Geolocation,
    Diagnostic,
    NativeGeocoder,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
