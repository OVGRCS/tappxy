import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import * as firebase from "firebase";

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  constructor(private alertCtrl: AlertController, private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public database: AngularFireDatabase) {

  }

  obtenerHistorial(){
    var emailU=firebase.auth().currentUser.email;
    firebase.database().ref("/trayectos/").orderByChild("user").equalTo(firebase.auth().currentUser.email).on("child_added",function (snapshot) {
      var address=snapshot.val().address;
      var elementAddress=document.createElement("p");
      var contenidoAddress="<h2>Dirección: </h2><p>"+address+"</p>";
      elementAddress.innerHTML=contenidoAddress;
      document.getElementById("address").appendChild(elementAddress);
    });

}

  ionViewDidLoad() {
    this.obtenerHistorial()
    console.log('ionViewDidLoad HistoryPage');
  }

}
