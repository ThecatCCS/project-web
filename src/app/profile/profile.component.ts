import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../services/api/user.service';
import { HttpClient } from '@angular/common/http';
import { UserGetResponse } from '../model/user_get';
import { CommonModule } from '@angular/common';
import { PictureGetResponse } from '../model/picture_get';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { Constants } from '../config/constants';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatToolbarModule,MatIconModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  currentUser: UserGetResponse | undefined;
  userName: string | undefined;
  pictures: PictureGetResponse[] = [];
  userpic: string | undefined;
  
  constructor(private shared: UserService, private http: HttpClient,private router: Router,private constants: Constants) {

  }

  ngOnInit(): void {
    const currentUserString = sessionStorage.getItem('currentUser');
    if (currentUserString !== null) {
      this.currentUser = JSON.parse(currentUserString);
      console.log(this.currentUser);
      if (this.currentUser !== undefined) {
        const userEmail = this.currentUser.user_email;
        const userRole = this.currentUser.user_pass;
        // console.log(userEmail);
        // console.log(userRole);
        this.getUserpic();
        this.getUserName();
      } else {

      }
    }
    this.getPicture();
  }

  onDelete(pt_id: number) {
  if (confirm('คุณแน่ใจหรือไม่ที่ต้องการลบรูปภาพนี้?')) {
    fetch(`/delete/${pt_id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('เกิดข้อผิดพลาดในการลบรูปภาพ');
      }
      return response.json();
    })
    .then(data => {
      if (data.affected_row > 0) {
        alert('รูปภาพถูกลบเรียบร้อยแล้ว');

      } else {
        throw new Error('ไม่สามารถลบรูปภาพได้');
      }
    })
    .catch(error => {
      console.error('เกิดข้อผิดพลาด:', error);
      alert('เกิดข้อผิดพลาดในการลบรูปภาพ');
    });
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
      this.pictures = this.pictures.filter(picture => picture.u_id === this.currentUser?.user_id);
      console.log(this.pictures)
    }
  }
  logout() {
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
    onClick(pt_id: number) {
      this.router.navigate(['/linechart', pt_id]);
      console.log("ออกอยู่จ้า",pt_id);
      
    }
    uploadFile(file: File) {
      const url = this.constants.API_ENDPOINT +`/upload/${this.currentUser?.user_id}`;
      const formData = new FormData();
      formData.append('filename', file, file.name);
      console.log(formData,"tese");
      return this.http.post(url, formData);
    }
    updateFile(file: File) {
      const url = this.constants.API_ENDPOINT + `/upload/${this.currentUser?.user_id}`;
      const formData = new FormData();
      formData.append('filename', file, file.name);
      console.log(formData,"test");
  
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
    };
  
    
}
