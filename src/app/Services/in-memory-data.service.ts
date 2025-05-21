// import { Injectable } from '@angular/core';
// import { InMemoryDbService } from 'angular-in-memory-web-api';
// import { Customer } from './customer';

// @Injectable({
//   providedIn: 'root',
// })
// export class InMemoryDataService implements InMemoryDbService {
//   createDb() {
//     const customers = [
//       { id: 1, firstName: "mark", lastName: "Moore" },
//       { id: 2, firstName: "Jeffrey", lastName: "Moore" },
//       { id: 3, firstName: "Brian", lastName: "Stockton" },
//       { id: 4, firstName: 'john5', lastName: 'turning' }
//     ];
//     return { customers };
//   }

//   // Overrides the genId method to ensure that a hero always has an id.
//   // If the heroes array is empty,
//   // the method below returns the initial number (4).
//   // if the heroes array is not empty, the method below returns the highest
//   // hero id + 1.
//   genId(customers: Customer[]): number {
//     return customers.length > 0 ? Math.max(...customers.map(customer => customer.id)) + 1 : 1;
//   }

// }