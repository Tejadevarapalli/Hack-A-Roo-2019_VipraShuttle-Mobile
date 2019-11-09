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
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }
  login() {
    const user = {
      emailID: this.emailID,
      password: this.password,
      userType: this.usertype
    };

    this.loginService.authenticate(user).subscribe( (data) => {
      // @ts-ignore
      console.log(user);
      const datadummy = {
        message: 'success',
        userType: 'Driver'
      };
      if (datadummy.message === 'success') {
        this.InvalidUser = false;
        // @ts-ignore
        console.log(data);
        // @ts-ignore
        localStorage.setItem('userID', data.userID);
        // @ts-ignore
        if (datadummy.userType === 'Driver') {
          this.router.navigate(['./tab1']);
        } else {
          this.router.navigate(['./tab2']);
        }
      } else {
        this.InvalidUser = true;
        // @ts-ignore
        console.log(data.message);
      }
    });
  }
}
