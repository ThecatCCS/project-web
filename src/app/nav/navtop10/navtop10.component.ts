import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router'; // Import Router from '@angular/router' instead of 'express'
@Component({
  selector: 'app-navtop10',
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: './navtop10.component.html',
  styleUrl: './navtop10.component.scss',
})
export class Navtop10Component {
  currentUser: any;

  constructor(private router: Router) {
    const currentUserString = sessionStorage.getItem('currentUser');
    this.currentUser = currentUserString ? JSON.parse(currentUserString) : null;
  }
  logout() {
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
