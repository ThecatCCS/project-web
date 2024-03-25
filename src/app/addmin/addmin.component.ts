import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { UserGetResponse } from '../model/user_get';
import { Constants } from '../config/constants';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Location } from '@angular/common';
@Component({
  selector: 'app-addmin',
  standalone: true,
  imports: [MatIconModule,MatToolbarModule,CommonModule,FormsModule],
  templateUrl: './addmin.component.html',
  styleUrl: './addmin.component.scss'
})
export class AddminComponent implements OnInit {
 user : UserGetResponse [] = [];
 timeIn: number | undefined;
  constructor(private rout : Router , private constants:Constants , private http : HttpClient,   private location : Location){}
  ngOnInit(): void {
    this.getUser();
}
logout() {
  sessionStorage.removeItem('currentUser');
  this.location.back();
}

 async getUser() {
    const url = this.constants.API_ENDPOINT + `/userPro`;
    let data = await lastValueFrom(this.http.get(url));
    this.user = data as UserGetResponse[];
    
  }

  Online(id: number) {
    this.rout.navigate(['/profileuser', id]);

  }
  time() {
    const url = `${this.constants.API_ENDPOINT}/vote/${this.timeIn}`;
    alert("Do you want to Set time?");
 
    this.http.put(url, null).subscribe(
      (response) => {
 
        
      },
      (error) => {
        console.error("An error occurred:", error);
      }
    );  
  }
  
 


  
}
