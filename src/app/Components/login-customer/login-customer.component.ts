import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-customer',
  standalone: false,
  templateUrl: './login-customer.component.html',
  styleUrls: ['./login-customer.component.css']
})
export class LoginCustomerComponent implements OnInit {
  fname: string = '';
  lname: string = '';
  isVisible: string = 'visible';  // used for showing/hiding button

  constructor(private router: Router) { }

  ngOnInit(): void {
    // You don’t need to load any customers right now
  }

  logincustomer(): void {
    const isValid = this.fname.trim().toLowerCase() === 'admin' && this.lname.trim().toLowerCase() === 'test13';

    if (isValid) {
      const fakeCustomer = { firstName: 'admin', lastName: 'test13' };
      sessionStorage.setItem('user', JSON.stringify(fakeCustomer));
      this.router.navigate(['/dashboard']);
    } else {
      this.isVisible = 'hidden';
      console.log("Invalid login attempt.");
      setTimeout(() => {
        this.isVisible = 'visible';
        window.location.href = '/login';
      }, 2000);
    }
  }
}
