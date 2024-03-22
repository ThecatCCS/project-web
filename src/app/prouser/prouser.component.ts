import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserGetResponse } from '../model/user_get';
import { PictureGetResponse } from '../model/picture_get';
import { HttpClient } from '@angular/common/http';
import { Router } from 'express';
import { Constants } from '../config/constants';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-prouser',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, CommonModule],
  templateUrl: './prouser.component.html',
  styleUrl: './prouser.component.scss'
})
export class ProuserComponent {
  currentUser: UserGetResponse | undefined;
  userName: string | undefined;
  pictures: PictureGetResponse[] = [];
  userpic: string | undefined;
  user: UserGetResponse[] =[];

  constructor(
  
    private http: HttpClient,
    private router: Router,
    private constants: Constants  ,
  ) {}
 
  async ngOnInit() {
    this.getUsernew();
   this.getUserName();
    this.getUserpic();
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
  getUserName(): void {
    this.userName = this.currentUser?.user_name;
    console.log(this.userName);
  }
  

  async getUserpic() {
    const url = this.constants.API_ENDPOINT + `/${this.currentUser?.user_id}`;
    const user_data = await lastValueFrom(this.http.get(url));
    const userDataResponse = user_data as UserGetResponse;
    this.userpic = userDataResponse.user_pictrue;
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
