import { Component, Inject } from '@angular/core';
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
    MatSelectModule
  ],
})
export class UpdateProfileDialogComponent {
  id : number = 0;
  name: string = '';
  gender: string = '';
  age: number = 0;
  img: any;
  pefer : any;
  genders: Gender[] = [
    { value: 1, name: 'female' },
    { value: 2, name: 'Male' }
  ];
  constructor(private http: HttpClient,private constants: Constants){

  }
  edit() {
    
  }
  onFileChange($event: Event) {
    
  }
  updateProfile() {
    
  }
  onFileSelected($event: Event) {
    
  }
  onSubmit() {
    
  }
  user: any = {}; // Define user property here

  
  onFileSelected3(event: any , u_id : number) {
    const file = event.target.files[0];
    const url = this.constants.API_ENDPOINT + `/upload/userpictrue/${u_id}`;
    const formData = new FormData();
    formData.append('filename', file, file.name);
    console.log(formData, "test");
  
    this.http.put(url, formData).subscribe(
      (response) => {
        console.log('File uploaded successfully:', response);
        this.addupdate(u_id); // เรียกใช้ addupdate() พร้อมกับการส่ง u_id ไป
      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
  }
  
  addupdate(u_id: number) {
    const body = {
      user_name: this.name,
      user_gender: this.gender,
      user_age: this.age,
      user_preference: this.pefer,
    };
    const url = this.constants.API_ENDPOINT + `/upload/userprofile/${u_id}`;
    this.http.put(url, body).subscribe((response) => {
      console.log(response);
    });
  }


}
interface Gender {
  value: number;
  name: string;
}