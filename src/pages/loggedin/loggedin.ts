import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase, AngularFireDatabaseModule, AngularFireList} from "angularfire2/database";
import { Observable} from "rxjs/Observable";
import firebase, {database} from "firebase";
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {errorHandler} from "@angular/platform-browser/src/browser";
import {onChildAdded} from "angularfire2/database-deprecated";
import {MapPage} from "../map/map";
import {LoginPage} from "../login/login";



/**
 * Generated class for the LoggedinPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()

@Component({
  selector: 'page-loggedin',
  templateUrl: 'loggedin.html',
})


export class LoggedinPage {

  public datos:FirebaseListObservable<any>;

  constructor(private alertCtrl: AlertController, private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public database: AngularFireDatabase) {

    }

    crearelementos(){
      var emailU=firebase.auth().currentUser.uid;
      firebase.database().ref("/users/"+emailU).on("value",function (snapshot) {

        var telefono=snapshot.val().phone;
        var email=snapshot.val().user;
        var username = snapshot.val().username;
        var pass = snapshot.val().password;
        console.log("email",email);
        var user=document.createElement("p");
        var emailuser=document.createElement("p");
        var phoneuser=document.createElement("p");
        var passuser=document.createElement("p");
        console.log("emailuser",emailuser);
        var contenidoUser= "<h2>Nombre: </h2><p>"+username+"</p>";
        var contenidoEmailuser= "<h2>Email: </h2><p>"+email+"</p>";
        var contenidoTelefono= "<h2>Telefono: </h2><p>"+telefono+"</p>";
        var contenidoPass= "<h2>Contraseña: </h2><p>"+pass+"</p>";
        console.log("contenidouser",contenidoUser);
        user.innerHTML=contenidoUser;
        emailuser.innerHTML=contenidoEmailuser;
        phoneuser.innerHTML=contenidoTelefono;
        passuser.innerHTML=contenidoPass;
        console.log("user",user);

        document.getElementById("nombre").appendChild(user);
        /* document.getElementById("email").appendChild(emailuser);
         document.getElementById("telefono").appendChild(phoneuser);
         document.getElementById("pass").appendChild(passuser);*/


      });
    }

  ngOnInit(){
    this.datos=this.database.list("/users/"+this.emailU);
  }

  ionViewDidLoad() {
    let currentUser = firebase.auth().currentUser
    if (currentUser == null){
      this.navCtrl.push(LoginPage);
    } else {
      this.crearelementos();
    }
  }




  private asignarvalor(phone: any) {
    this.telefono=phone;
    console.log('metodo',this.telefono);

  }

}
