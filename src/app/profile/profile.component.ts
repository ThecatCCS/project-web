import { Component, Inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../services/api/user.service';
import { HttpClient } from '@angular/common/http';
import { UserGetResponse } from '../model/user_get';
import { CommonModule } from '@angular/common';
import { PictureGetResponse } from '../model/picture_get';
import { count, lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { Constants } from '../config/constants';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateProfileDialogComponent } from './editprofile/editprofile.component';
import { MatDialog } from '@angular/material/dialog';
import { ChangpassComponent } from './changpass/changpass.component';
import { ToprankGetResponse } from '../model/toprank_get';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  currentUser: UserGetResponse | undefined;
  userName: string | undefined;
  pictures:  ToprankGetResponse [] = []
  userpic: string | undefined;
  name: string = '';
  password: any;
  gender: string = '';
  age: number = 0;
  pefer: any;
  user: UserGetResponse[] =[];
  userage: any;
  usergender: any;
  userpre: any;
item: any;
  constructor(
    private shared: UserService,
    private http: HttpClient,
    private router: Router,
    private constants: Constants,
    private dialog: MatDialog
  ) {}
     
 
 async ngOnInit() {
    this.getUsernew();
    this.getUser();
    this.getPicture();
    this.getUser();
   
  }
  
  async onDelete(pt_id: number) {
    const userConfirmed = window.confirm('Do you want to delete this image?');
  
    if (userConfirmed) {
      const status =
        (await this.constants.API_ENDPOINT) + `/pictrue/delete/${pt_id}`;
      const data = await lastValueFrom(this.http.delete(status));
   
    } else {
      console.log('Canceled image deletion');
    }
    const downloadDialogRef = this.dialog.open(DownloadDialogComponent, {
      data: {},
    });
    setTimeout(() => {
      console.log('เปิดไดอล็อกดาวน์โหลด');

      downloadDialogRef.close();
    }, 1000); 
    this.getPicture();
  }
  getUsernew(){
    const currentUserString = sessionStorage.getItem('currentUser');
    if (currentUserString !== null) {
      this.currentUser = JSON.parse(currentUserString);
    }
  }
  async setusernew() {
    const url = this.constants.API_ENDPOINT + '/users';
    try {
      const data = await lastValueFrom(this.http.get(url));
      const users = data as UserGetResponse[];
      const foundUser = users.find(
        (user) => user.user_id === this.currentUser?.user_id
      );

      if (foundUser) {
      
        sessionStorage.setItem('currentUser', JSON.stringify(foundUser));
      } else {
        alert('User not found or incorrect credentials.');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }


  getUser() {
    const url = this.constants.API_ENDPOINT + `/${this.currentUser?.user_id}`;
    this.http.get(url).toPromise()
      .then((user_data) => {
        const userDataResponse = user_data as UserGetResponse;

        this.userpic = userDataResponse.user_pictrue;
        this.userage = userDataResponse.user_age;
        if (userDataResponse.user_gender == 2) {
          this.usergender = 'Female';
        } else {
          this.usergender = 'Male';
        }
        this.userpre = userDataResponse. user_preference;
        this.userName = userDataResponse.user_name;
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }
  
  getPicture() {
    const url = this.constants.API_ENDPOINT + '/pictrue/alls';
    this.http.get(url).toPromise()
      .then((data) => {
        this.pictures = data as  ToprankGetResponse [];
        
        this.filterPicturesByUserId();
      })
      .catch(error => {
        console.error('Error fetching picture data:', error);
      });
  }
  

  filterPicturesByUserId() {
    if (this.currentUser) {
      this.pictures = this.pictures.filter(
        (picture) => picture.u_id === this.currentUser?.user_id
      );
 
    }
  }


  onClick(pt_id: number) {
    this.router.navigate(['/linechart', pt_id]);
 
  }
  
  uploadFile(file: File) {
    const url =
      this.constants.API_ENDPOINT + `/upload/${this.currentUser?.user_id}`;
    const formData = new FormData();
    formData.append('filename', file, file.name);

    return this.http.post(url, formData);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.uploadFile(file).subscribe(
      (response) => {
        console.log('File uploaded successfully:', response);
        window.location.reload();
      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
  }

  onFileSelected2(event: any, pt_id: number) {
    const file = event.target.files[0];
    const url = this.constants.API_ENDPOINT + `/upload/update/${pt_id}`;
    const formData = new FormData();
    formData.append('filename', file, file.name);


    this.http.put(url, formData).subscribe(
      (response) => {
        console.log('File uploaded successfully:', response);
        window.location.reload();
      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
  }
  changPass() {
    const dialogRef = this.dialog.open(ChangpassComponent, {
      width: '500px',
    });
  }
  editProfile(): void {
    const dialogRef = this.dialog.open(UpdateProfileDialogComponent, {
      width: '500px',
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


