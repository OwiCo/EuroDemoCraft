import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CafeAPI-Angular';
  isShown: boolean = false;

  constructor(public router: Router) { }

  toggleShow() {
    this.isShown = !this.isShown;
  }
}
