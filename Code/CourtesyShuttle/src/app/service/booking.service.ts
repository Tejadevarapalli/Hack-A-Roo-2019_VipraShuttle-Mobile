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
export class BookingService {

  uriBooking = 'http://localhost:3000/booking/createBooking';
  uriPickup = 'http://localhost:3000/booking/getMyPickUps';

  constructor(private http: HttpClient) { }

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

  addBooking(bookingDetails) {
      return this.http.post(`${this.uriBooking}`, bookingDetails);
  }
  getMyPickups(driverEmail) {
    return this.http.post(`${this.uriPickup}`, driverEmail);
  }

}
