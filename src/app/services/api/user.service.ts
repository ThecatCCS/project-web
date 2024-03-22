import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../config/constants';
import { UserGetResponse } from '../../model/user_get';
import { Observable, lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UserService {

  user : UserGetResponse[] = [];
  userData : UserGetResponse | undefined;
  constructor(private constants: Constants, private http: HttpClient){}

  getName() {
    const url = this.constants.API_ENDPOINT +'/users';
    return this.http.get(url)
      .toPromise()
      .then((data) => {
        this.user = data as UserGetResponse[];
        console.log(this.user);
      });
  }
  

  getUserById(userId: number): Observable<UserGetResponse> {
    const url = this.constants.API_ENDPOINT + `/${userId}`;
    return this.http.get<UserGetResponse>(url);
  }
}




