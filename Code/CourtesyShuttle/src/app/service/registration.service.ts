import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  uri = 'https://smartattend.herokuapp.com/api/register';

  constructor(private http: HttpClient) {
  }
  addUser(userDetails) {
    return this.http.post(`${this.uri}`, userDetails);
  }
}
