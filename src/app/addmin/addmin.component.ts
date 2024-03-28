import { Component, Inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { UserGetResponse } from '../model/user_get';
import { Constants } from '../config/constants';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Location } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-addmin',
  standalone: true,
  imports: [MatIconModule,MatToolbarModule,CommonModule,FormsModule],
  templateUrl: './addmin.component.html',
  styleUrl: './addmin.component.scss'
})
export class AddminComponent implements OnInit {
 user : UserGetResponse [] = [];
 timeIn: number | undefined;
  constructor(private rout : Router , private constants:Constants , private http : HttpClient,    private dialog: MatDialog,   private location : Location){}
  ngOnInit(): void {

    this.getUser();
 
    
}
logout() {
  sessionStorage.removeItem('currentUser');
  this.location.back();
}

 async getUser() {
    const url = this.constants.API_ENDPOINT + `/userPro`;
    let data = await lastValueFrom(this.http.get(url));
    this.user = data as UserGetResponse[];
 
  }

  Online(id: number) {
    this.rout.navigate(['/profileuser', id]);

  }
  time() {
    const url = `${this.constants.API_ENDPOINT}/vote/${this.timeIn}`;
    alert("Do you want to Set time?");
 
    this.http.put(url, null).subscribe(
      (response) => {
 
        console.log("เวลาถูกเซ็ทแล้ว");
        
      },
      (error) => {
        console.error("An error occurred:", error);
      }
    );
    const downloadDialogRef = this.dialog.open(DownloadDialogComponent, {
      data: {},
    });
    setTimeout(() => {
      console.log('เปิดไดอล็อกดาวน์โหลด');

      downloadDialogRef.close();
    }, 1000); 

  }
}
 
@Component({
  selector: 'download-dialog',
  template: `
   <div class="loader"></div>
   <style>
/* HTML: <div class="loader"></div> */
/* HTML: <div class="loader"></div> */
.loader {
  width: 80px;
  height: 70px;
  border: 5px solid #000;
  padding: 0 8px;
  box-sizing: border-box;
  background:
    linear-gradient(#fff 0 0) 0    0/8px 20px,
    linear-gradient(#fff 0 0) 100% 0/8px 20px,
    radial-gradient(farthest-side,#fff 90%,#0000) 0 5px/8px 8px content-box,
    #000;
  background-repeat: no-repeat; 
  animation: l3 2s infinite linear;
}
@keyframes l3{
  25% {background-position: 0 0   ,100% 100%,100% calc(100% - 5px)}
  50% {background-position: 0 100%,100% 100%,0    calc(100% - 5px)}
  75% {background-position: 0 100%,100%    0,100% 5px}
}
   </style>
  `,
})
export class DownloadDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  download() {

  }
}

