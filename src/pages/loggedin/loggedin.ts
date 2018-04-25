import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase, AngularFireDatabaseModule, AngularFireList} from "angularfire2/database";
import { Observable} from "rxjs/Observable";
import * as firebase from "firebase";


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

  usersRef: AngularFireList<any>;
  users: Observable<any>;

  email: string;

  constructor(private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public database: AngularFireDatabase) {
    this.usersRef = this.database.list('users');
    this.users = this.usersRef.snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val()}));
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoggedinPage');
  }

}
