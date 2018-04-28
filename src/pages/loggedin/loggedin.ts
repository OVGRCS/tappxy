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

  public emailU: any;
  public email: any;
  public telefono: string;
  public name: any;
  public pass: any;
  public emailComprobar: any;
  public datos:FirebaseListObservable<any>;

  constructor(private alertCtrl: AlertController, private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public database: AngularFireDatabase) {
    this.emailU=firebase.auth().currentUser.uid;
    firebase.database().ref("/users/"+this.emailU).on("value",function (snapshot) {

      var telefono=snapshot.val().phone;
      var email=snapshot.val().user;
      var user = snapshot.val().username;
      var pass = snapshot.val().password;
        console.log("snapshot",snapshot.val().phone);

      var user=document.createElement("article");
      var contenido= "<h2>telefono= "+telefono+"</h2>" +
        "<h2> email= "+email+"</h2>";
      user.innerHTML=contenido;
      document.getElementById("nombre").appendChild(user);


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

  /*asignarvalor(valor:string){

    this.telefono=valor;
    console.log('metodo',this.telefono);
  }*/

 /* public items: Array<any> = [];
  public itemRef: firebase.database.Reference = firebase.database().ref('/users');
  constructor(){}
  ionViewDidLoad() {
    this.itemRef.on('value', itemSnapshot => {
      this.items = [];
      itemSnapshot.forEach( itemSnap => {
        this.items.push(itemSnap.val());
        return false;
      });
    });
  }*/



}
