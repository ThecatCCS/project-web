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
    { value: 1, name: 'female' },
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
    window.confirm('do you want to edit');
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
      width: '250px', // Adjust width as needed
      data: {
        name: this.name,
        age: this.age,
        // Pass more data as needed
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
    <div
      class="load"
      style="background-image: url(https://i.pinimg.com/736x/ec/b8/1b/ecb81bce76f838ff41df121347b4444e.jpg);"
    >
      <h2
        style=" 
      
      color: rgb(235, 97, 171);
      font-family: 'Noto Sans Thai', sans-serif;
      text-align: center;
      text-shadow: 3px 2px rgb(234, 220, 228);
   "
      >
        กรุณารอซักครู่...˃ᴗ˂    
      </h2>
    </div>
  `,
})
export class DownloadDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  download() {
    // Logic to trigger download (e.g., downloading data as a file)
  }
}
