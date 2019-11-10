import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import {Platform} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  // @ts-ignore
  // @ts-ignore
  constructor(private platform: Platform,
              public firebaseNative: Firebase,
              public http: HttpClient) {
    console.log('Hello FcmProvider Provider');
  }
  // Get permission from the user
  async getToken() {
    let token;
    console.log('Token before');
    console.log(token);
    token = await this.firebaseNative.getToken();
    console.log('Token After');
    console.log(token);
    // if (this.platform.is('android')) {
    //   token = await this.firebaseNative.getToken();
    // }
    //
    // if (this.platform.is('ios')) {
    //   token = await this.firebaseNative.getToken();
    //   await this.firebaseNative.grantPermission();
    // }
    // Post the token to your node server
    this.http.get('http://localhost:3000/notification/store', token)
        .subscribe(data => {
          console.log(JSON.stringify(data));
        }, error => {
          console.log('err');
          console.log(JSON.stringify(error));
        });
  }

  // Listen to incoming FCM messages
  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen();
  }

}
