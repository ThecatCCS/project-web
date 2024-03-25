import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Constants } from '../config/constants';
import { UserGetResponse } from '../model/user_get';
import { PictureGetResponse } from '../model/picture_get';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/api/user.service';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { ToprankGetResponse } from '../model/toprank_get';
@Component({
  selector: 'app-profileuser',
  standalone: true,
  imports: [MatToolbarModule, CommonModule],
  templateUrl: './profileuser.component.html',
  styleUrl: './profileuser.component.scss',
})
export class ProfileuserComponent implements OnInit {
  username: string | undefined;
  currentUser: UserGetResponse | undefined;
  picture: ToprankGetResponse[] = [];
  userpic: string | undefined;
  userId: any;
  userage: any;
  usergender: any;
  userpre: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private http: HttpClient,
    private location: Location,
    private constants: Constants
  ) {}

  ngOnInit(): void {
    this.getPicture();
    this.getUser();
  }

  goBack() {
    this.location.back();
  }


  getUser() {
    this.route.params.subscribe((params) => {
      this.userId = params['userId'];
    });

    const url = this.constants.API_ENDPOINT + `/${this.userId}`;
    this.http
      .get(url)
      .toPromise()
      .then((user_data) => {
        const userDataResponse = user_data as UserGetResponse;

        this.userage = userDataResponse.user_age;
        if (userDataResponse.user_gender == 2) {
          this.usergender = 'Famel';
        } else {
          this.usergender = 'Meal';
        }

        this.userage = userDataResponse.user_age;

        this.userpre = userDataResponse.user_preference;

        this.userpic = userDataResponse.user_pictrue;

        this.username = userDataResponse.user_name;
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }

  Online(pt_id: number) {
    this.router.navigate(['/linechart', pt_id]);
  }

  getPicture() {
    const url = this.constants.API_ENDPOINT + '/pictrue/alls';
    this.http
      .get(url)
      .toPromise()
      .then((data) => {
        this.picture = data as ToprankGetResponse[];
        this.filterPicturesByUserId();
      })
      .catch((error) => {
        console.error('Error fetching picture data:', error);
      });
  }

  filterPicturesByUserId() {
    if (this.userId) {
      this.picture = this.picture.filter(
        (picture) => picture.u_id == this.userId
      );

    }
  }
}
