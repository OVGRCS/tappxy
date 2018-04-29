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
    var emailU=firebase.auth().currentUser.email;
    firebase.database().ref("/trayectos/").orderByChild("user").equalTo(firebase.auth().currentUser.email).on("child_added",function (snapshot) {
      var address=snapshot.val().address;
      var elementAddress=document.createElement("p");
      var contenidoAddress="<h2>Nombre: </h2><p>"+address+"</p>";
      elementAddress.innerHTML=contenidoAddress;
      document.getElementById("address").appendChild(elementAddress);
      console.log("user",firebase.auth().currentUser.email);
      console.log("trayectos",snapshot.val());


      /*var telefono=snapshot.val().phone;
      var email=snapshot.val().user;
      var username = snapshot.val().username;
      var pass = snapshot.val().password;

      var user=document.createElement("p");
      var emailuser=document.createElement("p");
      var phoneuser=document.createElement("p");
      var passuser=document.createElement("p");
      var contenidoUser= "<h2>Nombre: </h2><p>"+username+"</p>";
      var contenidoEmailuser= "<h2>Email: </h2><p>"+email+"</p>";
      var contenidoTelefono= "<h2>Telefono: </h2><p>"+telefono+"</p>";
      var contenidoPass= "<h2>Contraseña: </h2><p>"+pass+"</p>";

      user.innerHTML=contenidoUser;
      emailuser.innerHTML=contenidoEmailuser;
      phoneuser.innerHTML=contenidoTelefono;
      passuser.innerHTML=contenidoPass;

      document.getElementById("nombre").appendChild(user);
      document.getElementById("email").appendChild(emailuser);
      document.getElementById("telefono").appendChild(phoneuser);
      document.getElementById("pass").appendChild(passuser);*/


    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

}
