import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { UserGetResponse } from '../model/user_get';
import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../services/api/user.service';
import { Constants } from '../config/constants';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private http: HttpClient,private route: Router , protected shareData : UserService,private yourService: UserService,private constants: Constants) {}
  

  
  async login(email: string, password: string) {
    const url = this.constants.API_ENDPOINT + '/users';
    try {
        const data = await lastValueFrom(this.http.get(url));
        const users = data as UserGetResponse[];
        const foundUser = users.find(user => user.user_email === email && user.user_pass === password);

        if (foundUser) {
            if(foundUser.user_type == 1 ){
                this.navigateToAddmin(foundUser.user_id);

            }
            else {
                console.log("User found:", foundUser);
                sessionStorage.setItem('currentUser', JSON.stringify(foundUser));
                
                this.navigateToMain();
            }
        } else {
            alert("User not found or incorrect credentials.");
        }
    } catch (error) {
        console.error("Error occurred:", error);
    }
}
    navigateToMain() {
        this.route.navigate(["/main"]);
    }
    navigateToAddmin(id : number) {
        this.route.navigate(["/addmin/" + id]);
    }

}



  

