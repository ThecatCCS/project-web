import { Component } from '@angular/core';
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
import { UpdateProfileDialogComponent } from './editprofile/editprofile.component';
import { MatDialog } from '@angular/material/dialog';
import { ChangpassComponent } from './changpass/changpass.component';
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
  pictures: PictureGetResponse[] = [];
  userpic: string | undefined;
  name: string = '';
  password: any;
  gender: string = '';
  age: number = 0;
  pefer: any;

  constructor(
    private shared: UserService,
    private http: HttpClient,
    private router: Router,
    private constants: Constants,
    private dialog: MatDialog
  ) {}
  changPass() {
    const dialogRef = this.dialog.open(ChangpassComponent, {
      width: '500px',
    });
  }
  editProfile(): void {
    const dialogRef = this.dialog.open(UpdateProfileDialogComponent, {
      width: '500px',
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   // Handle the result of the dialog
    // });
  }

 async ngOnInit() {

    this.setusernew();
    this.getUsernew();
    this.getUserpic();
    this.getUserName();
    this.getPicture();
  }

  async onDelete(pt_id: number) {
    const userConfirmed = window.confirm('Do you want to delete this image?');
    console.log(userConfirmed);
    if (userConfirmed) {
      const status =
        (await this.constants.API_ENDPOINT) + `/pictrue/delete/${pt_id}`;
      const data = await lastValueFrom(this.http.delete(status));
      console.log(status);
    } else {
      console.log('Canceled image deletion');
    }
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
        console.log('User found:', foundUser);
        sessionStorage.setItem('currentUser', JSON.stringify(foundUser));
      } else {
        alert('User not found or incorrect credentials.');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
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
      this.pictures = this.pictures.filter(
        (picture) => picture.u_id === this.currentUser?.user_id
      );
      console.log(this.pictures);
    }
  }
  logout() {
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
  onClick(pt_id: number) {
    this.router.navigate(['/linechart', pt_id]);
    console.log('ออกอยู่จ้า', pt_id);
  }
  uploadFile(file: File) {
    const url =
      this.constants.API_ENDPOINT + `/upload/${this.currentUser?.user_id}`;
    const formData = new FormData();
    formData.append('filename', file, file.name);
    console.log(formData, 'tese');
    return this.http.post(url, formData);
  }
  updateFile(file: File, pt_id: number) {
    const url = `${this.constants.API_ENDPOINT}/update/${pt_id}`;
    const formData = new FormData();
    formData.append('file', file); // แก้ 'filename' เป็น 'file' ตาม API ที่ต้องการ
    console.log(formData, 'test');

    return this.http.put(url, formData);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.uploadFile(file).subscribe(
      (response) => {
        console.log('File uploaded successfully:', response);
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
    console.log(formData, 'test');

    this.http.put(url, formData).subscribe(
      (response) => {
        console.log('File uploaded successfully:', response);
      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
  }
}
