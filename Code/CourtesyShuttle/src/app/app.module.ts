import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Firebase} from '@ionic-native/firebase/ngx';
import {FcmService} from './fcm.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCrZ1gtYxKK5pnMn5GQFhfPBueOrHc5xNU',
    authDomain: 'domain.firebaseapp.com',
    databaseURL: 'https://myfirebase-259cb.firebaseio.com',
    projectId: 'myfirebase-259cb',
    storageBucket: 'myfirebase-259cb.appspot.com',
    messagingSenderId: '40687532189-aikioh2bvljd283uhb7sr9j55m700ns8.apps.googleusercontent.com'
  }
};

// @ts-ignore
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), HttpClientModule, AppRoutingModule,
    AngularFireModule.initializeApp(environment),
    AngularFirestoreModule,
  ],
  providers: [
      Firebase,
    StatusBar,
    SplashScreen,
    FcmService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy, }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
