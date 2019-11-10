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
  usertype:String='';
  InvalidUser: Boolean = false;
  user: any;
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }
  login() {
    if (this.usertype === 'Customer') {
       this.user = {
        EmailID: this.emailID,
        Password: this.password,
         Usertype: this.usertype
      };
    } else {
      this.user = {
        driverEmail: this.emailID,
        driverPassword: this.password,
        Usertype: this.usertype
      };
    }
    console.log(this.user);
    this.loginService.authenticate(this.user).subscribe( data => {
      // @ts-ignore
      console.log(data);
      // @ts-ignore
      if (data.message === 'Success') {
        this.InvalidUser = false;
        // @ts-ignore
        // localStorage.setItem('userID', data.user.userID);
        // @ts-ignore
        if (data.user[0].Usertype === 'Driver') {
          this.router.navigate(['/ride']);
        } else {
          this.router.navigate(['/book-ride']);
        }
      } else {
        this.InvalidUser = true;
        // @ts-ignore
        console.log(data.message);
      }
    });
  }
}
