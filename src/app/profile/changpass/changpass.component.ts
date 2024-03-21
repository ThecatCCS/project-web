import { Component } from '@angular/core';
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
export class ChangpassComponent {
  oldpassword1: string = '';
  oldpassword2: string = '';
  newpassword: string ='';

  currentUser: UserGetResponse | undefined;


  constructor(private http: HttpClient, private constants: Constants) {}

  addupdate() {
    const currentUserString = sessionStorage.getItem('currentUser');
    if (currentUserString !== null) {
      this.currentUser = JSON.parse(currentUserString);
    }
    if(this.oldpassword1 == this.currentUser?.user_pass){
      if(this.oldpassword1 == this.oldpassword2){

        const body = {
          user_pass: this.newpassword,
        };
        const url = this.constants.API_ENDPOINT + `/userpass/${this.currentUser.user_id}`;
        this.http.put(url, body).subscribe((response) => {
          console.log(response);
        });
      }
      else{
        console.log("รหัสไม่ตรงกัน");
        
      }
    }  else{
        console.log("รหัสไม่ถูกต้อง");
        
      }
   
  }
}
