import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  uri = 'http://localhost:3000/signup/signupDetails';
  uriDriver = 'http://localhost:3000/driver/signupDetails';

  constructor(private http: HttpClient) {
  }
  addUser(userDetails) {
    if (userDetails.Usertype === 'Customer') {
    return this.http.post(`${this.uri}`, userDetails);
    } else {
      return this.http.post(`${this.uriDriver}`, userDetails);
    }
  }
}
