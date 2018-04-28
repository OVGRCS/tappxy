import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import {MapPage} from "../map/map";
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from "firebase";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('email') email;
  @ViewChild('password') password;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public firebase: AngularFireAuth) {

  }

  signIn() {
    this.navCtrl.push(LoginPage);
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  map() {

    let currentUser = firebase.auth().currentUser
    if (currentUser == null){
      this.navCtrl.push(LoginPage);
    } else {
      this.navCtrl.push(MapPage);
    }
  }

}
