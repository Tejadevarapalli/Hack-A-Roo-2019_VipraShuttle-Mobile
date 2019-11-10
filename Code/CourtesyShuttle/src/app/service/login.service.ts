import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap, map} from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  uri = 'http://localhost:3000/signup/signinDetails';
  uriDriver = 'http://localhost:3000/driver/signinDetails';
  uriGetDriver = 'http://localhost:3000/driver/getAll';
  uriUpdateLocation = 'http://localhost:3000/driver/updateLocation';
  constructor( private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
          'Backend returned code ${error.status}, ' +
          'body was: ${error.error}');
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  authenticate(user) {
    if (user.Usertype === 'Customer') {
      console.log("Inside service call", user);
      return this.http.post(`${this.uri}`, user);
    } else {
      return this.http.post(`${this.uriDriver}`, user);
    }
  }

  getAllDrivers() {
    return this.http.get(`${this.uriGetDriver}`, httpOptions).pipe(
        map(this.extractData),
        catchError(this.handleError));
  }

  updateDriversLocation(driverDetails) {
    console.log(driverDetails);
    return this.http.put(`${this.uriUpdateLocation}`, driverDetails);
  }
}
