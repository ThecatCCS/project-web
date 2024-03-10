import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { UserService } from '../services/api/user.service';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PictureGetResponse } from '../model/picture_get';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Navtop10Component } from '../nav/navtop10/navtop10.component';
import { UserGetResponse } from '../model/user_get';
import { ImageVotingSystem } from '../services/eloRating';
import { Image } from '../services/eloRating';
@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  imports: [NavComponent, Navtop10Component, CommonModule, MatToolbarModule],
})
export class MainComponent {
  currentUser: UserGetResponse | undefined;
  Picture: PictureGetResponse[] | undefined;

  constructor(protected shared: UserService, private http: HttpClient) {}
  ngOnInit(): void {
    const currentUserString = sessionStorage.getItem('currentUser');
    if (currentUserString !== null) {
      this.currentUser = JSON.parse(currentUserString);
      console.log(this.currentUser);
      if (this.currentUser !== undefined) {
        const userEmail = this.currentUser.user_email;
        const userRole = this.currentUser.user_pass;
        console.log(userEmail);
        console.log(userRole);
      } else {
      }
    }
    this.getPicture();
    console.log('Init State');
  }
  async getPicture() {
    const url = 'http://localhost:3000/pictrue/all';
    const data = await lastValueFrom(this.http.get(url));
    this.Picture = data as PictureGetResponse[];
    console.log(this.Picture);
  }
  check(p_id: number) {
    if (this.Picture !== undefined) {
      const currentTime: Date = new Date();
      const voteTimestamp: string = currentTime
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');
      const currentUser = JSON.parse(
        sessionStorage.getItem('currentUser') || '{}'
      ) as UserGetResponse;
      if (currentUser === undefined) {
        const machineIdString = window.navigator.userAgent;
        const machineIdNumber = parseInt(machineIdString, 10);
        console.log("เข้านะ");
        const currentUserDefault: UserGetResponse = {
          user_id: machineIdNumber,
          name: function (name: any): unknown {
            throw new Error('Function not implemented.');
          },
          user_email: '',
          user_pass: '',
          user_type: 0,
          user_pictrue: '',
          user_name: '',
          user_age: null,
          user_gender: null,
          user_preference: null,
        };

        sessionStorage.setItem('currentUser', JSON.stringify(currentUserDefault));
      }
      if (this.Picture[0].pictrue_id == p_id) {
        // const image1 = new Image(
        //   this.Picture[0].pictrue_url,
        //   this.Picture[0].pictrue_p
        // );
        // const image2 = new Image(
        //   this.Picture[1].pictrue_url,
        //   this.Picture[1].pictrue_p
        // );
        const image1 = new Image("url1", 1200);
        const image2 = new Image("url2", 1000);
        const votingSystem = new ImageVotingSystem(image1, image2);
        votingSystem.updateEloRating(image1, image2);
        console.log('รูป 1: ELO Rating =', image1.pictrue_p);
        console.log('รูป 2: ELO Rating =', image2.pictrue_p);
        const body1 = {
          vote_timestamp: voteTimestamp,
          vote_point: this.Picture[0].pictrue_p,
          pt_id: this.Picture[0].pictrue_id,
          u_id: currentUser.user_id,
        };
        const url1 = 'http://localhost:3000/vote/vote';
        this.http.post(url1, body1).subscribe((response) => {
          console.log(response);
        });
        const body2 = {
          vote_timestamp: voteTimestamp,
          vote_point: image2.pictrue_p - this.Picture[1].pictrue_p,
          pt_id: this.Picture[1].pictrue_id,
          u_id: currentUser.user_id,
        };
        const url2 = 'http://localhost:3000/vote/vote';
        this.http.post(url2, body2).subscribe((response) => {
          console.log(response);
        });
        const body3 = {
          pictrue_p: image1.pictrue_p,
        };
        const body4 = {
          pictrue_p: image2.pictrue_p,
        };
        const url3 = `http://localhost:3000/pictrue/${this.Picture[0].pictrue_id}`;
        this.http.put(url3, body3).subscribe((response) => {
          console.log(response);
        });
        const url4 = `http://localhost:3000/pictrue/${this.Picture[1].pictrue_id}`;
        this.http.put(url4, body4).subscribe((response) => {
          console.log(response);
        });

        this.getPicture();
      } else {
        const image1 = new Image(
          this.Picture[1].pictrue_url,
          this.Picture[1].pictrue_p
        );
        const image2 = new Image(
          this.Picture[0].pictrue_url,
          this.Picture[0].pictrue_p
        );
        const votingSystem = new ImageVotingSystem(image1, image2);
        votingSystem.updateEloRating(image1, image2);
        console.log('รูป 1: ELO Rating =', image1.pictrue_p);
        console.log('รูป 2: ELO Rating =', image2.pictrue_p);
        const body1 = {
          vote_timestamp: voteTimestamp,
          vote_point: image1.pictrue_p - this.Picture[1].pictrue_p,
          pt_id: this.Picture[1].pictrue_id,
          u_id: currentUser.user_id,
        };
        const url1 = 'http://localhost:3000/vote/vote';
        this.http.post(url1, body1).subscribe((response) => {
          console.log(response);
        });
        const body2 = {
          vote_timestamp: voteTimestamp,
          vote_point: image2.pictrue_p - this.Picture[0].pictrue_p,
          pt_id: this.Picture[0].pictrue_id,
          u_id: currentUser.user_id,
        };
        const url2 = 'http://localhost:3000/vote/vote';
        this.http.post(url2, body2).subscribe((response) => {
          console.log(response);
          this.getPicture();
        });
        const body3 = {
          pictrue_p: image1.pictrue_p,
        };
        const body4 = {
          pictrue_p: image2.pictrue_p,
        };
        const url3 = `http://localhost:3000/pictrue/${this.Picture[1].pictrue_id}`;
        this.http.put(url3, body3).subscribe((response) => {
          console.log(response);
        });
        const url4 = `http://localhost:3000/pictrue/${this.Picture[0].pictrue_id}`;
        this.http.put(url4, body4).subscribe((response) => {
          console.log(response);
        });
      }
    }
  }
}
