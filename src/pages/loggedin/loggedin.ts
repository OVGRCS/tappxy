import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase, AngularFireDatabaseModule, AngularFireList} from "angularfire2/database";
import { Observable} from "rxjs/Observable";
import firebase, {database} from "firebase";
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {errorHandler} from "@angular/platform-browser/src/browser";



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

  constructor(private alertCtrl: AlertController, private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public database: AngularFireDatabase) {
    this.telefono="";
    }



  ionViewDidLoad() {
    var myUserId = firebase.auth().currentUser.email;
    var topUserPostsRef = firebase.database().ref('/users');

    console.log('id',topUserPostsRef.key);

    var emailAuth= firebase.auth().currentUser.email;
    const commentsRef = firebase.database().ref('users/');
    commentsRef.on('child_added', function(data) {
      return data.val().phone
      /*if(emailAuth==data.val().user){

        this.asignarvalor(data.val().phone);
      }*/
    });
   /* console.log('aux',aux);
    this.telefono=;
    console.log('telefono',this.telefono); */


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
