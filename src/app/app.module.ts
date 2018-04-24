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
import {Geocoder, GoogleMaps} from "@ionic-native/google-maps";
import {MapPage} from "../pages/map/map";
import {Geolocation} from "@ionic-native/geolocation";
import {Diagnostic} from "@ionic-native/diagnostic";

const firebaseAuth = {
  apiKey: "AIzaSyDWRv60y1GLJlTdd7XGhuBIMFzBtq04y_E",
  authDomain: "test-fa9f4.firebaseapp.com",
  databaseURL: "https://test-fa9f4.firebaseio.com",
  projectId: "test-fa9f4",
  storageBucket: "test-fa9f4.appspot.com",
  messagingSenderId: "665716891650"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    LoggedinPage,
    MapPage
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
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Geolocation,
    Diagnostic,
    Geocoder,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
