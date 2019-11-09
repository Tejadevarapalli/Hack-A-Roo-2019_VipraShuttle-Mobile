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
      EmailID: this.emailID,
      Password: this.password,
      Usertype: this.usertype
    };
    console.log(user);
    this.loginService.authenticate(user).subscribe( data => {
      // @ts-ignore
      console.log(data);
      if (data['message'] === 'success') {
        this.InvalidUser = false;
        // @ts-ignore
        localStorage.setItem('userID', data.userID);
        // @ts-ignore
        if (data.userType === 'Driver') {
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
