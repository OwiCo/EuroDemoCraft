import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../Models/product';
import {RESULTS} from '../mock-search-results';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl: string = `https://api.rainforestapi.com/request?api_key=4EEDADFC0F7B4CD3B0996DEA09B90586&type=search&amazon_domain=amazon.com&search_term=`;
  searchTerm!: string;
  
  constructor(private http: HttpClient) { }

  // correctly format the search term to work in API request: 'memory+cards' instead of 'memory cards'
  formatSearchTerm(searchTerm: string): string {
    this.searchTerm = searchTerm.replace(" ", "+");
    return this.searchTerm;
  }
/*
  // returns a list of products from API based on user's search term
  getProductListing(searchTerm: string): Observable<Product[]> {
    // what the API request string should look like: `search_term=memory+cards&page=1`;
    // console.log(`${this.apiUrl}${searchTerm}&page=1`);
    // console.log(this.http.get(`${this.apiUrl}${searchTerm}&page=1`));
    return this.http.get<Product[]>(`${this.apiUrl}${searchTerm}&page=1`)
      .pipe(map((data: any) => data.search_results.filter((item: Product) => item.price !== undefined)),
        catchError(this.handleError<Product[]>('getProductListing', []))
      );
  }*/
  getProductListing(searchTerm: string): Observable<Product[]> {
    return of(RESULTS);
  }

  // returns a single product when the use click on a product 
  getProduct(id: string): Product {
    const results = JSON.parse(sessionStorage.getItem('results')!);
    const item: Product = results.find((x: { asin: string; }) => x.asin === id);
    // console.log(item);
    return item;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
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
