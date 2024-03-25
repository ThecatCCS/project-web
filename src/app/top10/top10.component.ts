import { Component } from '@angular/core';
import { Navtop10Component } from "../nav/navtop10/navtop10.component";
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../config/constants';
import { CommonModule } from '@angular/common';
import { ToprankGetResponse } from '../model/toprank_get';
import { UserService } from '../services/api/user.service';
import { UserGetResponse } from '../model/user_get';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
    selector: 'app-top10',
    standalone: true,
    templateUrl: './top10.component.html',
    styleUrl: './top10.component.scss',
    imports: [ Navtop10Component,MatToolbarModule,MatIconModule,CommonModule]
})
export class Top10Component{

    i: number = 0;
    toprank : ToprankGetResponse [] = [];
    currentUser : UserGetResponse | undefined;
    type : number | undefined;
constructor(private http: HttpClient, private constants: Constants,private userService: UserService, private location : Location,private rout : Router){}
onClick(userId?: number) {
  if (userId !== undefined) {
    this.rout.navigate(['/profileuser', userId]);
  }
}
ngOnInit(): void {
      const currentUserString = sessionStorage.getItem('currentUser');
      if (currentUserString !== null) {
        this.currentUser = JSON.parse(currentUserString);
        this.type = this.currentUser?.user_type;
      }
       
        const counterIcons = document.querySelectorAll('.counter-icon');
        counterIcons.forEach((icon: Element) => {
            this.i++; 
            (icon as HTMLElement).textContent = String(this.i); 
        });
        this.getpicture();
    }
    async getpicture() {
        try {
          const url = `${this.constants.API_ENDPOINT}/pictrue/alls`;
          const data = await lastValueFrom(this.http.get<ToprankGetResponse[]>(url));
          this.toprank = data;
          this.updateCounterIcons();
        } catch (error) {
          console.error('Error fetching pictures:', error);
        }
      }
      goBack() {
        this.location.back();
      }
      updateCounterIcons() {
        this.toprank.forEach((item, index) => {
          (item as any).counter = index + 1;
        });
      }
      getUserName() {
       
      }
    }
