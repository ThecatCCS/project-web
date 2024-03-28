import { Component, Inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../config/constants';
import { UserGetResponse } from '../../model/user_get';
import { lastValueFrom } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-changpass',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './changpass.component.html',
  styleUrl: './changpass.component.scss',
})
export class ChangpassComponent implements OnInit {
  oldpassword1: string = '';
  oldpassword2: string = '';
  newpassword: string = '';
 ownpass : string = '';
  currentUser: UserGetResponse | undefined;

  constructor(private http: HttpClient, private constants: Constants,    private dialog: MatDialog) {}

 async ngOnInit() {
    const currentUserString = sessionStorage.getItem('currentUser');
    if (currentUserString !== null) {
      this.currentUser = JSON.parse(currentUserString);
    }
    const url = this.constants.API_ENDPOINT + `/${this.currentUser?.user_id}`;
    this.http
    
      .get(url)
      .toPromise()
      .then((user_data) => {
        const userDataResponse = user_data as UserGetResponse;
        this.ownpass = userDataResponse.user_pass;
      
        
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }

  addupdate() {
    const currentUserString = sessionStorage.getItem('currentUser');
    if (currentUserString !== null) {
      this.currentUser = JSON.parse(currentUserString);
    }
    if (this.oldpassword1 !== this.ownpass) {
      window.confirm('Password not correct. Do you want to proceed?');
      return;
    }
    
    if (this.oldpassword1 == this.ownpass ) {
      if (this.oldpassword1 !== this.oldpassword2) {
        window.confirm('Password not correct!!!!');
        return;
      }
      if (this.oldpassword1 == this.oldpassword2) {
        
        const body = {
          user_pass: this.newpassword,
        };
        const dialogRef = this.dialog.open(DownloadDialogComponent, {
         
          data: {
            // Pass more data as needed
          },
        });
    
        dialogRef.afterClosed().subscribe((result) => {
          console.log('The download dialog was closed');
          // Handle any actions after the dialog is closed
        });
        const url =
          this.constants.API_ENDPOINT + `/userpass/${ this.currentUser?.user_id}`;

        this.http.put(url, body).subscribe((response) => {
          window.location.reload()
        });
      } 
      }
    
  }
}
 
@Component({
  selector: 'download-dialog',
  template: `
   <div class="loader"></div>
   <style>
/* /* HTML: <div class="loader"></div> */
/* HTML: <div class="loader"></div> */
.loader {
  width: 80px;
  height: 40px;
  background:
    radial-gradient(circle 11px at top,#0000 94%,#b0e5f3) 0 20px,
    radial-gradient(circle 11px at top,#0000 94%,#5dc1e4) 0 10px,
    radial-gradient(circle 11px at top,#0000 94%,#008cd9) 0 0   ;
  background-size: 20px 100%;
  background-repeat: repeat-x;
  animation: l7 1s infinite linear;
}
@keyframes l7 {
  50%  {background-position: 10px 15px,-10px 12px,15px 8px}
  100% {background-position: 20px 20px,-20px 10px,20px 0px}
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
