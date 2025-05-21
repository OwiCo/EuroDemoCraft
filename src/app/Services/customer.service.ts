import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer } from '../Models/inventory';
import { CafeAPIUrl } from './URLList';

import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // create functions to make http requests and other various and sundry actions.
  CustomerList(): Observable<Customer[]> {
    // return this.http.get<Customer[]>(`${this.url}Customerlist`);
    return this.http.get<Customer[]>(`${CafeAPIUrl}/Customer/Customerlist`);
  }

  addCustomer(Customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${CafeAPIUrl}/Customer/register`, Customer, this.httpOptions).pipe(
      tap((newcustomer: Customer) => console.log(`added customer w / id=${newcustomer.id}`)),
      catchError(this.handleError<Customer>('addCustomer'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
