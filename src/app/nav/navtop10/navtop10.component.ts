import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router'; // Import Router from '@angular/router' instead of 'express'
import { count, lastValueFrom } from 'rxjs';
import { Constants } from '../../config/constants';
import { HttpClient } from '@angular/common/http';
import { UserGetResponse } from '../../model/user_get';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navtop10',
  standalone: true,
  imports: [MatToolbarModule,CommonModule],
  templateUrl: './navtop10.component.html',
  styleUrl: './navtop10.component.scss',
})
export class Navtop10Component implements OnInit {
  pic : UserGetResponse [] = [];
  currentUser: any;

  constructor(private router: Router, private constants : Constants , private http : HttpClient) {}
 
  ngOnInit(): void {
    this.getpic();
  }

 async getpic(){
    const currentUserString = sessionStorage.getItem('currentUser');
    this.currentUser = currentUserString ? JSON.parse(currentUserString) : null;
    console.log("dfdfhh",this.currentUser.user_pictrue);
    
    // const url =
    // this.constants.API_ENDPOINT + `/${this.currentUser.user_id}`;
    // const data = await lastValueFrom(this.http.get(url));
    // this.pic = data as UserGetResponse[];
    // console.log("55459898",this.pic);
  
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
