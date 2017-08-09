import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geofence } from 'ionic-native';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-active',
  templateUrl: 'active.html'
})
export class Active {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivePage');
  }

  removeFence() {
    Geofence.removeAll();
    this.navCtrl.push(HomePage);
  }

}