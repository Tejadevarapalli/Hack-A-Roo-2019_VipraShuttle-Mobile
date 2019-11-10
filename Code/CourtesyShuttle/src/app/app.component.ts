import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import {TabsPage} from './tabs/tabs.page';
import {FcmService} from './fcm.service';
import {ToastController} from '@ionic/angular';
import { tap } from 'rxjs/operators';
import { Firebase } from '@ionic-native/firebase/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
    rootPage:any = TabsPage;
  public appPages = [
      {
      title: 'Ride',
      url: '/ride',
      icon: 'list'
    },
      {
          title: 'Book Ride',
          url: '/book-ride',
          icon: 'list'
      }
  ];
    constructor(platform: Platform, statusBar: StatusBar,
                splashScreen: SplashScreen, fcm: FcmService,
                toastCtrl: ToastController,
                public firebaseNative: Firebase) {
        platform.ready().then(() => {

            statusBar.backgroundColorByHexString('#2693ee');
            statusBar.styleDefault();
            splashScreen.hide();

            // Get an FCM token
            fcm.getToken();

            // Listen to incoming messages
            fcm.listenToNotifications().pipe(
                tap(msg => {
                    // show a toast
                    console.log(msg);
                    const toast = toastCtrl.create({
                        message: msg.body,
                        duration: 3000
                    });
                    //toast.present();
                })
            )
                .subscribe();
        });
    }

}
