import { Component, OnInit } from '@angular/core';
import {RegistrationService} from '../service/registration.service';
import { Router} from '@angular/router';
import {Geolocation} from '@ionic-native/geolocation/ngx';
declare var google;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  fname: String;
  lname: String;
  emailID: String;
  password: String;
  cpassword: String;
  userType: String;
  currentLocation: any = {
    lat: 0,
    lng: 0
  };
  userDetails: any;
  constructor(private userService: RegistrationService,  private router: Router, private geolocation: Geolocation) { }

  ngOnInit() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentLocation.lat = resp.coords.latitude;
      this.currentLocation.lng = resp.coords.longitude;
    });
  }
  addUser() {
    // if (this.userType === 'Driver') {
    //   this.userDetails = {
    //     driverName : this.fname + ' ' + this.lname,
    //     driverEmail: this.emailID,
    //     driverPassword : this.password,
    //     Usertype : this.userType,
    //     currLat: this.currentLocation.lat,
    //     currLon: this.currentLocation.lng
    //   };
    // } else {
    this.userDetails = {
      EmailID : this.emailID,
      Firstname : this.fname,
      Lastname : this.lname,
      Password : this.password,
      Usertype: this.userType,
    };
    // }

    console.log(this.userDetails);
    this.userService.addUser(this.userDetails).subscribe(data => {
      localStorage.setItem('authorization', data.toString());
      this.router.navigate(['/login']);
    });
  }

  clearValues() {
    this.fname = null;
    this.lname = null ;
    this.emailID = null;
    this.password = null;
  }
}
