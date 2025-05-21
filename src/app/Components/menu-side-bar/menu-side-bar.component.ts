import { Component, OnInit } from '@angular/core';
import { LoginCustomerComponent } from '../login-customer/login-customer.component';

@Component({
  selector: 'app-menu-side-bar',
  templateUrl: './menu-side-bar.component.html',
  styleUrls: ['./menu-side-bar.component.css']
})
export class MenuSideBarComponent implements OnInit {
  widthVal?: any;
  widthValdash?: any;
  constructor() { }

  ngOnInit(): void {
  }
  onMenu(): void {
    if (sessionStorage.getItem("user") === null) {
      this.widthVal = '250px';
    }
    else {
      this.widthVal = '0px';
      this.widthValdash = '250px';
    }

  }
  offMenu(): void {
    this.widthVal = '0px';
    if (sessionStorage.getItem("user") === null) {
    }
    else {
      this.widthValdash = '0px';
    }
  }
  logout(): void {
    sessionStorage.removeItem('user');
  }



}
