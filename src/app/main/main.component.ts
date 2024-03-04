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
@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  imports: [NavComponent, Navtop10Component, CommonModule, MatToolbarModule],
})
export class MainComponent {
  Picture: PictureGetResponse[] | undefined;
  constructor(protected shared: UserService, private http: HttpClient) {}
  ngOnInit(): void {
    const currentUserString = sessionStorage.getItem('currentUser');
    if (currentUserString !== null) {
      const currentUser = JSON.parse(currentUserString);
      console.log(currentUser);
      const userEmail = currentUser.user_email;
      const userRole = currentUser.user_age;

      console.log(userEmail);
      console.log(userRole);
    } else {
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
        localStorage.getItem('currentUser') || '{}'
      ) as UserGetResponse;
      if (currentUser === null) {
        const machineIdString = window.navigator.userAgent;
        const machineIdNumber = parseInt(machineIdString, 10);
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

        localStorage.setItem('currentUser', JSON.stringify(currentUserDefault));
      }
     let playerRating: number = 0;
let opponentRating: number = 0;
let playerIndex: number;
let opponentIndex: number;

// เช็คว่ามีรูปที่โหวตหรือไม่
if (this.Picture[0].pictrue_id) {
    playerRating = this.Picture[0].pictrue_p;
    opponentRating = this.Picture[1].pictrue_p;
    playerIndex = 0;
    opponentIndex = 1;
} else {
    playerRating = this.Picture[1].pictrue_p;
    opponentRating = this.Picture[2].pictrue_p;
    playerIndex = 1;
    opponentIndex = 2;
}

const result: number = 1;

const kFactor: number = 32;

const expectedScore: number = 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));

const newRating: number = playerRating + kFactor * (result - expectedScore);
const ratingChange: number = newRating - playerRating;

if (ratingChange > 0) {
    console.log(`รูปที่ ${playerIndex + 1} ได้รับคะแนนเพิ่มขึ้น ${ratingChange} คะแนน Elo`);
} else if (ratingChange < 0) {
    console.log(`รูปที่ ${playerIndex + 1} ได้รับคะแนนลดลง ${Math.abs(ratingChange)} คะแนน Elo`);
} else {
    console.log(`คะแนน Elo ของรูปที่ ${playerIndex + 1} ไม่เปลี่ยนแปลง`);
}
const unratedPictureRating: number = this.Picture[opponentIndex].pictrue_p;
console.log(`รูปที่ ${opponentIndex + 1} ได้รับคะแนนลดลง ${kFactor} คะแนน Elo`);

      if (this.Picture[0].pictrue_id) {
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
        console.log('1');
        this.getPicture();
      }
      else{
        const body2 = {
          vote_timestamp: voteTimestamp,
          vote_point: this.Picture[1].pictrue_p,
          pt_id: this.Picture[1].pictrue_id,
          u_id: currentUser.user_id,
        };
        const url2 = 'http://localhost:3000/vote/vote';
        this.http.post(url2, body2).subscribe((response) => {
          console.log(response);
        });

        console.log('2');
        this.getPicture();
      }
    }
  }
}
