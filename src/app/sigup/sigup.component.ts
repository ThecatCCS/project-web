import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button'
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Constants } from '../config/constants';

@Component({
  selector: 'app-sigup',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,MatButtonModule,FormsModule,MatSelectModule,HttpClientModule],
  templateUrl: './sigup.component.html',
  styleUrl: './sigup.component.scss'
})
export class SigupComponent {
  id : number = 0;
  name: string = '';
  email: any;
  password: any;
  gender: string = '';
  age: number = 0;
  img: any;
  type : number = 0;
  pefer : any;
  constructor(private http: HttpClient,private rout: Router,private constants: Constants) {}

  genders: Gender[] = [
    { value: 1, name: 'female' },
    { value: 2, name: 'Male' }
  ];

  validateEmail(email: string): boolean {
    const emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

addNew() {
  if (!this.validateEmail(this.email)) {
    alert("incerrect Email!!!!");
    return;
  }
    const body = {
      user_name: this.name,
      user_email: this.email,
      user_pass: this.password,
      user_gender: this.gender,
      user_age: this.age,
      user_id: this.id,
      user_img : this.img,
      user_preference: this.pefer,
      user_type: this.type
    };
    const url = this.constants.API_ENDPOINT + '/user';
    this.http.post(url, body).subscribe((response) => {
 
      this.navigateToLogin();
    });
  }
  navigateToLogin() {
    this.rout.navigate(["/login"]);
  }
}

interface Gender {
  value: number;
  name: string;
}