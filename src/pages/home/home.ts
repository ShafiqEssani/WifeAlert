import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geofence, Geolocation, SMS } from 'ionic-native';
import { Active } from '../active/active';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  radius: number = 100;
  error: any;
  success: any;

  constructor(public navCtrl: NavController, private platform: Platform) {
    this.platform.ready().then(() => {

      Geofence.initialize().then(
        () => console.log('Geofence Plugin Ready'),
        (err) => console.log(err)
      );
    });
  }

  setGeofence(value: number) {

    Geolocation.getCurrentPosition({
      enableHighAccuracy: true
    }).then((resp) => {
      var longitude = resp.coords.longitude;
      var latitude = resp.coords.latitude;
      var radius = value;

      let fence = {
        id: "myGeofenceID1",
        latitude: latitude,
        longitude: longitude,
        radius: radius,
        transitionType: 2
      }

      Geofence.addOrUpdate(fence).then(
        () => this.success = true,
        (err) => this.error = "Failed to add or update the fence."
      );

      Geofence.onTransitionReceived().subscribe(resp => {
        SMS.send('03332052567', 'OMG She lied, leave her now!');
      });

      this.navCtrl.push(Active);


    }).catch((error) => {
      this.error = error;
    });
  }
}