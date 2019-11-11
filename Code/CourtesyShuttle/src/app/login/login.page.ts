import { Component, OnInit } from '@angular/core';
import {LoginService} from '../service/login.service';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  emailID: String = '';
  password: String = '';
  Usertype: String='';
  InvalidUser: Boolean = false;
  user: any;
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }
  login() {
    // if (this.usertype === 'Customer') {
     this.user = {
      EmailID: this.emailID,
      Password: this.password,
         Usertype: this.Usertype
    };
    // } else {
    //   this.user = {
    //     driverEmail: this.emailID,
    //     driverPassword: this.password,
    //     Usertype: this.usertype
    //   };
    // }
    console.log(this.user);
    this.loginService.authenticate(this.user).subscribe( data => {
      let mymessage = 'Success';
      if (mymessage === 'Success') {
        this.InvalidUser = false;
        // @ts-ignore
        // localStorage.setItem('userID', data.user.userID);

        // @ts-ignore
       localStorage.setItem('usertype', data['Usertype']);
       var UserType= localStorage.getItem('usertype');
        console.log('Checking User Type', UserType);
        // @ts-ignore
        if (UserType === 'Driver') {
          this.router.navigate(['/ride']);
          // @ts-ignore
          localStorage.setItem('emailID', data['EmailID']);
        } else {
          this.router.navigate(['/book-ride']);
          // @ts-ignore
          localStorage.setItem('emailID', data['EmailID']);
        }
      } else {
        this.InvalidUser = true;
        // @ts-ignore
        console.log("Data.Message",data.message);
      }
    });
  }
}
