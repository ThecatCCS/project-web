import { Component, Inject } from '@angular/core';
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
import { Router } from '@angular/router';

import { Constants } from '../config/constants';
import { MatDialog } from '@angular/material/dialog';
import { ElorateComponent } from './elorate/elorate.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  user1: UserGetResponse | undefined;
  user2: UserGetResponse | undefined;

  constructor(
    protected shared: UserService,
    private http: HttpClient,
    private constants: Constants,
    private router: Router,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    const currentUserString = sessionStorage.getItem('currentUser');
    if (currentUserString !== null) {
      this.currentUser = JSON.parse(currentUserString);
    }
    let currentUser = JSON.parse(
      sessionStorage.getItem('currentUser') || '{}'
    ) as UserGetResponse;
    if (currentUser.user_age == null) {
      const machineIdString = window.navigator.userAgent;
      const hashCode = function (s: string) {
        let hash = 0,
          i,
          chr;
        if (s.length === 0) return hash;
        for (i = 0; i < s.length; i++) {
          chr = s.charCodeAt(i);
          hash = (hash << 5) - hash + chr;
          hash |= 0; // Convert to 32bit integer
        }
        return hash;
      };
      const machineIdNumber = Math.abs(hashCode(machineIdString));
      const currentUserDefault: UserGetResponse = {
        user_id: machineIdNumber,
        name: function (name: any): unknown {
          throw new Error('Function not implemented.');
        },
        user_email: 'dddd',
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

    this.getPicture();
  }
  onClick(userId?: number) {
    if (userId !== undefined) {
      this.router.navigate(['/profileuser', userId]);
    }
  }

  async getPicture(): Promise<void> {
    const url =
      this.constants.API_ENDPOINT + `/pictrue/duo/${this.currentUser?.user_id}`;
    const data = await lastValueFrom(this.http.get(url));
    this.Picture = data as PictureGetResponse[];

    if (this.Picture && this.Picture.length > 0) {
      const [user1$, user2$] = await Promise.all([
        this.shared.getUserById(this.Picture[0].u_id),
        this.shared.getUserById(this.Picture[1].u_id),
      ]);

      user1$.subscribe((user1) => {
        this.user1 = user1;
      });

      user2$.subscribe((user2) => {
        this.user2 = user2;
      });
    }
  }

  check(p_id: number) {
    if (this.Picture !== undefined) {
      const currentTime: Date = new Date();

      const voteTimestamp: string = currentTime.toISOString().slice(0, 19);

      if (
        this.Picture[0].pictrue_id == p_id &&
        this.currentUser !== undefined
      ) {
        const image1 = new Image(
          this.Picture[0].pictrue_url,
          this.Picture[0].pictrue_p
        );
        const image2 = new Image(
          this.Picture[1].pictrue_url,
          this.Picture[1].pictrue_p
        );
        const votingSystem = new ImageVotingSystem(image1, image2);

        votingSystem.updateEloRating(image1, image2);

        const body1 = {
          vote_timestamp: voteTimestamp,
          vote_point: image1.pictrue_p - this.Picture[0].pictrue_p,
          pt_id: this.Picture[0].pictrue_id,
          u_id: this.currentUser.user_id,
        };
        const url1 = this.constants.API_ENDPOINT + '/vote/vote';
        this.http.post(url1, body1).subscribe((response) => {});
        const body2 = {
          vote_timestamp: voteTimestamp,
          vote_point: image2.pictrue_p - this.Picture[1].pictrue_p,
          pt_id: this.Picture[1].pictrue_id,
          u_id: this.currentUser.user_id,
        };
        const url2 = this.constants.API_ENDPOINT + '/vote/vote';
        this.http.post(url2, body2).subscribe((response) => {});
        const body3 = {
          pictrue_p: image1.pictrue_p,
        };
        const body4 = {
          pictrue_p: image2.pictrue_p,
        };
        const url3 =
          this.constants.API_ENDPOINT +
          `/pictrue/${this.Picture[0].pictrue_id}`;
        this.http.put(url3, body3).subscribe((response) => {});
        const url4 =
          this.constants.API_ENDPOINT +
          `/pictrue/${this.Picture[1].pictrue_id}`;
        this.http.put(url4, body4).subscribe((response) => {});
      } else if (this.currentUser !== undefined) {
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

        const body1 = {
          vote_timestamp: voteTimestamp,
          vote_point: image1.pictrue_p - this.Picture[1].pictrue_p,
          pt_id: this.Picture[1].pictrue_id,
          u_id: this.currentUser.user_id,
        };
        const url1 = this.constants.API_ENDPOINT + '/vote/vote';
        this.http.post(url1, body1).subscribe((response) => {});
        const body2 = {
          vote_timestamp: voteTimestamp,
          vote_point: image2.pictrue_p - this.Picture[0].pictrue_p,
          pt_id: this.Picture[0].pictrue_id,
          u_id: this.currentUser.user_id,
        };
        const url2 = this.constants.API_ENDPOINT + '/vote/vote';
        this.http.post(url2, body2).subscribe((response) => {});
        const body3 = {
          pictrue_p: image1.pictrue_p,
        };
        const body4 = {
          pictrue_p: image2.pictrue_p,
        };
        const url3 =
          this.constants.API_ENDPOINT +
          `/pictrue/${this.Picture[1].pictrue_id}`;
        this.http.put(url3, body3).subscribe((response) => {});
        const url4 =
          this.constants.API_ENDPOINT +
          `/pictrue/${this.Picture[0].pictrue_id}`;
        this.http.put(url4, body4).subscribe((response) => {});
      }
    }
    const dialogRef = this.dialog.open(ElorateComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('รอซักครู่');
      const downloadDialogRef = this.dialog.open(DownloadDialogComponent, {
        maxWidth: '100px',

        maxHeight: '100px',
        data: {},
      });
      setTimeout(() => {
        console.log('เปิดไดอล็อกดาวน์โหลด');

        downloadDialogRef.close();
      }, 2000);
      this.getPicture();
    });
  }
  }
  
@Component({
  selector: 'download-dialog',
  template: `
   <div class="loader"></div>
   <style>
/* HTML: <div class="loader"></div> */
.loader {
  width: 50px;
  aspect-ratio: 1;
  color: #000;
  border: 2px solid;
  box-sizing: border-box;
  --c:radial-gradient(farthest-side,#0000 calc(100% - 3px),currentColor calc(100% - 2px) 98%,#0000);
  background: var(--c),var(--c);
  background-size: 23px 23px;
  background-position: 0 0,12px 12px;
  animation: l4 1s infinite;
}
@keyframes l4{
  100% {background-position: -23px 0px,12px 35px}
}
   </style>
  `,
})
export class DownloadDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  download() {
    // Logic to trigger download (e.g., downloading data as a file)
  }
}
