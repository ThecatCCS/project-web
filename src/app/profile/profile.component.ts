import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../services/api/user.service';
import { HttpClient } from '@angular/common/http';
import { UserGetResponse } from '../model/user_get';
import { CommonModule } from '@angular/common';
import { PictureGetResponse } from '../model/picture_get';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { Constants } from '../config/constants';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatToolbarModule,MatIconModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  currentUser: UserGetResponse | undefined;
  userName: string | undefined;
  pictures: PictureGetResponse[] = [];
  userpic: string | undefined;
  
  constructor(private shared: UserService, private http: HttpClient,private router: Router,private constants: Constants) {

  }

  ngOnInit(): void {
    const currentUserString = sessionStorage.getItem('currentUser');
    if (currentUserString !== null) {
      this.currentUser = JSON.parse(currentUserString);
      console.log(this.currentUser);
      if (this.currentUser !== undefined) {
        const userEmail = this.currentUser.user_email;
        const userRole = this.currentUser.user_pass;
        // console.log(userEmail);
        // console.log(userRole);
        this.getUserpic();
        this.getUserName();
      } else {
        // Handle case when currentUser is undefined
      }
    }
    this.getPicture();
  }
  
  getUserName(): void {
    this.userName = this.currentUser?.user_name;
    console.log(this.userName);
  }
  getUserpic(): void {
    this.userpic = this.currentUser?.user_pictrue;
    console.log(this.userpic);
  }
  async getPicture() {
    const url = this.constants.API_ENDPOINT + '/pictrue/alls';
    const data = await lastValueFrom(this.http.get(url));
    this.pictures = data as PictureGetResponse[];
    this.filterPicturesByUserId();
  }

  filterPicturesByUserId() {
    if (this.currentUser) {
      this.pictures = this.pictures.filter(picture => picture.u_id === this.currentUser?.user_id);
      console.log(this.pictures)
    }
  }
  logout() {
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
  onClick(pt_id: number) {
    this.router.navigate(['/linechart', pt_id]);
    console.log("ออกอยู่จ้า",pt_id);
  }
  
  
  
  
}
