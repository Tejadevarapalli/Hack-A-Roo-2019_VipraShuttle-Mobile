import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  uri = 'http://localhost:3000/signup/signinDetails';
  uriDriver = 'http://localhost:3000/driver/signinDetails';
  constructor( private http: HttpClient) { }

  authenticate(user) {
    if (user.Usertype === 'Customer') {
      console.log("Inside service call", user);
      return this.http.post(`${this.uri}`, user);
    } else {
      return this.http.post(`${this.uriDriver}`, user);
    }
  }
}
