import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../config/constants';
import { UserGetResponse } from '../../model/user_get';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-update-profile-dialog',
  standalone: true,
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss'],
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
  ],
})
export class UpdateProfileDialogComponent implements OnInit {
  id: number = 0;
  name: string = '';
  gender: any;
  age: any;
  img: any;
  pefer: any;
  url: any;
  currentUser: UserGetResponse | undefined;
  selectedFile: File | undefined;
  genders: Gender[] = [
    { value: 1, name: 'Female' },
    { value: 2, name: 'Male' },
  ];
  constructor(
    private http: HttpClient,
    private constants: Constants,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
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
        this.url = userDataResponse.user_pictrue;
        this.name = userDataResponse.user_name;
        this.age = userDataResponse.user_age;
        if (userDataResponse.user_gender == 1) {
          this.gender = 'female';
        } else {
          this.gender = 'Male';
        }

        this.pefer = userDataResponse.user_preference;
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }
  onFileSelected(event: any): void {
    if (
      event &&
      event.target &&
      event.target.files &&
      event.target.files.length > 0
    ) {
      this.selectedFile = event.target.files[0];
    }
  }
  onFormSubmit(event: any): void {
    if (!window.confirm('do you want to edit')) {
      return; // ยกเลิกการทำงานของฟังก์ชันถ้าผู้ใช้กด "Cancel"
    }
    const currentUserString = sessionStorage.getItem('currentUser');
    if (currentUserString !== null) {
      this.currentUser = JSON.parse(currentUserString);
    }
    if (this.selectedFile) {
      const url =
        this.constants.API_ENDPOINT +
        `/upload/userpictrue/${this.currentUser?.user_id}`;
      const formData = new FormData();
      formData.append('filename', this.selectedFile, this.selectedFile.name);

      this.http.put(url, formData).subscribe(
        (response) => {
          this.addupdate();
          console.log('File uploaded successfully:', response);
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
    } else {
      this.addupdate();
      console.error('No file selected.');
    }
    const dialogRef = this.dialog.open(DownloadDialogComponent, {
      data: {
        
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The download dialog was closed');
      // Handle any actions after the dialog is closed
    });
  }

  addupdate() {
    console.log('test', this.gender);

    const body = {
      user_name: this.name,
      user_gender: this.gender,
      user_age: this.age,
      user_preference: this.pefer,
    };
    const url =
      this.constants.API_ENDPOINT +
      `/upload/userprofile/${this.currentUser?.user_id}`;
    this.http.put(url, body).subscribe((response) => {
      window.location.reload();
    });
  }
}
interface Gender {
  value: number;
  name: string;
}
 
@Component({
  selector: 'download-dialog',
  template: `
   <div class="loader"></div>
   <style>
/* HTML: <div class="loader"></div> */
.loader {
  width: 70px;
  height: 50px;
  box-sizing: border-box;
  background:
    conic-gradient(from 135deg at top,#0000, #fff 1deg 90deg,#0000 91deg) right -20px bottom 8px/18px 9px,
    linear-gradient(#fff 0 0) bottom/100% 8px,
    #000;
  background-repeat: no-repeat;
  border-bottom: 8px solid #000;
  position: relative;
  animation: l7-0 2s infinite linear;
}
.loader::before {
  content: "";
  position: absolute;
  width: 10px;
  height: 14px;
  background: lightblue;
  left: 10px;
  animation: l7-1 2s infinite cubic-bezier(0,200,1,200);
}
@keyframes l7-0{
  100% { background-position: left -20px bottom 8px,bottom}
}
@keyframes l7-1{
  0%,50%   {bottom: 8px}
  90%,100% {bottom: 8.1px}
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
