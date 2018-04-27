import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase, AngularFireDatabaseModule, AngularFireList} from "angularfire2/database";
import { Observable} from "rxjs/Observable";
import {LoginPage} from "../login/login";
import {HomePage} from "../home/home";
import * as firebase from "firebase";

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {


  @ViewChild('email') email;
  @ViewChild('password') password;
  @ViewChild('username') username;
  @ViewChild('phone') phone;

  usersRef: AngularFireList<any>;
  users: Observable<any>;
  prueba: Observable<any>;

  constructor(private alertCtrl: AlertController, private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public database: AngularFireDatabase) {
    this.usersRef = this.database.list('users');
    this.users = this.usersRef.snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val()}));
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  registerUser() {

    this.fire.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
      .then(data => {
        this.usersRef.set(this.username.value,
          {
            user: this.email.value,
            password: this.password.value,
            username: this.username.value,
            phone: this.phone.value
          });
        console.log('got data ', data);
        this.alert('Su cuenta ha sido registrada');
        this.navCtrl.push(HomePage);
      })
      .catch(error => {
        console.log('got an error ', error);
        this.alert(error.message);
      });
    console.log('Would register user with ', this.email.value, this.password.value);
  }

}
