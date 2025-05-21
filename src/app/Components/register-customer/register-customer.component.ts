import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Customer } from '../../Models/inventory';
import { CustomerService } from 'src/app/Services/customer.service';
// import { InMemoryDataService } from '../in-memory-data.service';

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.css']
})
export class RegisterCustomerComponent implements OnInit {
  fname: string = '';
  lname: string = '';

  customerlist: Customer[] = [];
  observablelist = this.customerservice.CustomerList();

  constructor(private customerservice: CustomerService) { }

  ngOnInit(): void {
    this.observablelist
      .subscribe(
        x => {
          this.customerlist = x
        });
  }

  registercustomer(): void {
    //sets login form input to sessionStorage
    let sessionStorageObj = { id: this.customerlist[this.customerlist.length - 1].id + 1, firstName: this.fname, lastName: this.lname };
    sessionStorage.setItem('user', JSON.stringify(sessionStorageObj));
    //converts input into customer
    let c: Customer = sessionStorageObj;
    //adds customer to log
    this.customerservice.addCustomer(c)
      .subscribe(Customer => {
        this.customerlist.push(Customer);
      });
    window.location.href = '/';


  }


}
