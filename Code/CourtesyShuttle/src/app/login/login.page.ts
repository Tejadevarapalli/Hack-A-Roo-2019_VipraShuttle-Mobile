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
  Usertype:String='';
  InvalidUser: Boolean = false;
  user: any;
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }
  login() {
    if (this.Usertype === 'Customer') {
       this.user = {
        EmailID: this.emailID,
        Password: this.password,
         Usertype: this.Usertype
      };
    } else {
      this.user = {
        EmailID: this.emailID,
        Password: this.password,
        Usertype: this.Usertype
      };
    }
    console.log(this.user);
    this.loginService.authenticate(this.user).subscribe( data => {
      var mymessage = 'Success';
      if (mymessage === 'Success') {
        this.InvalidUser = false;
        // @ts-ignore
        // localStorage.setItem('userID', data.user.userID);

       localStorage.setItem('usertype',data['Usertype']);
       var UserType= localStorage.getItem('usertype');
        console.log('Checking User Type', UserType);
        // @ts-ignore
        if (UserType === 'Driver') {
          this.router.navigate(['/ride']);
        } else {
          this.router.navigate(['/book-ride']);
        }
      } else {
        this.InvalidUser = true;
        // @ts-ignore
        console.log("Data.Message",data.message);
      }
    });
  }
}
