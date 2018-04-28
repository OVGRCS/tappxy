import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase, AngularFireDatabaseModule, AngularFireList} from "angularfire2/database";
import { Observable} from "rxjs/Observable";
import firebase, {database} from "firebase";
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {errorHandler} from "@angular/platform-browser/src/browser";
import {onChildAdded} from "angularfire2/database-deprecated";



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
    this.emailU=firebase.auth().currentUser.uid;
    firebase.database().ref("/users/"+this.emailU).on("value",function (snapshot) {

      var telefono=snapshot.val().phone;
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
      document.getElementById("pass").appendChild(passuser);


    });
    }

  ngOnInit(){
    this.datos=this.database.list("/users/"+this.emailU);
  }

  ionViewDidLoad() {

  }

  private asignarvalor(phone: any) {
    this.telefono=phone;
    console.log('metodo',this.telefono);

  }

}
