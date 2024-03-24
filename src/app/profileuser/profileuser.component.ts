import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from 'express';
import { Constants } from '../config/constants';
import { UserGetResponse } from '../model/user_get';
import { PictureGetResponse } from '../model/picture_get';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/api/user.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-profileuser',
  standalone: true,
  imports: [MatToolbarModule,CommonModule],
  templateUrl: './profileuser.component.html',
  styleUrl: './profileuser.component.scss',
})
export class ProfileuserComponent implements OnInit {
  username: string | undefined;
  currentUser: UserGetResponse | undefined;
  picture: PictureGetResponse[] = [];
  userpic: string | undefined;
  userId: any;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private http: HttpClient,

    private constants: Constants
  ) {}
  
  ngOnInit(): void {

        this.getPicture();
        this.getUser();
  
    }
  
    

  getUser() {

    this.route.params.subscribe((params) => {
       this.userId = params['userId'];
      console.log("อกกก",this.userId);
    })
    const url = this.constants.API_ENDPOINT + `/${this.userId}`;
    this.http
      .get(url)
      .toPromise()
      .then((user_data) => {
        const userDataResponse = user_data as UserGetResponse;

        this.userpic = userDataResponse.user_pictrue;
        console.log(this.userpic);

        this.username = userDataResponse.user_name;
        console.log("d",this.username);
        
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }

  getPicture() {
    const url = this.constants.API_ENDPOINT + '/pictrue/alls';
    this.http
      .get(url)
      .toPromise()
      .then((data) => {
        this.picture = data as PictureGetResponse[];
        this.filterPicturesByUserId();
  
      })
      .catch((error) => {
        console.error('Error fetching picture data:', error);
      });
  }

  filterPicturesByUserId() {
    if (this.userId) {
      console.log("gghgghh",this.userId);
      console.log(this.picture);
      this.picture = this.picture.filter(
        
        (picture) => picture.u_id == this.userId
      
        
      );
      console.log("dfdfdfd",this.picture);
    }
  }
}
