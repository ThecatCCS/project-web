import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../config/constants';
import { UserGetResponse } from '../../model/user_get';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UserService {

  user : UserGetResponse[] = [];
  userData : UserGetResponse | undefined;
  constructor(private constants: Constants, private http: HttpClient){}

  async getName() {
    const url = 'http://localhost:3000/users';
    const data = await lastValueFrom(
      this.http.get(url));
    this.user = data as UserGetResponse[];
    console.log(this.user);
  }
}




