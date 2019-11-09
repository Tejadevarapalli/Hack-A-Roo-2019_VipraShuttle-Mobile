import { Component, OnInit } from '@angular/core';
import {RegistrationService} from '../service/registration.service';
import { Router} from '@angular/router';

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
  constructor(private userService: RegistrationService,  private router: Router) { }

  ngOnInit() {
  }
  // addUser() {
  //   const userDetails = {} as registration;
  //   userDetails.emailID = this.emailID;
  //   userDetails.firstName = this.fname;
  //   userDetails.lastName = this.lname;
  //   userDetails.password = this.password;
  //   userDetails.confirmPassword = this.cpassword;
  //   this.userService.addUser(userDetails).subscribe(data => {
  //     localStorage.setItem('authorization', data.toString());
  //     this.router.navigate(['/login']);
  //   });
  // }

  clearValues() {
    this.fname = null;
    this.lname = null ;
    this.emailID = null;
    this.password = null;
  }
}
