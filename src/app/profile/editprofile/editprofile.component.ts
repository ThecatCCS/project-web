import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
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
  email: any;
  password: any;
  gender: string = '';
  age: number = 0;
  img: any;
  type : number = 0;
  pefer : any;
  genders: Gender[] = [
    { value: 1, name: 'female' },
    { value: 2, name: 'Male' }
  ];

  edit(arg0: string, arg1: string, arg2: string, arg3: string) {
    
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

  constructor(
    public dialogRef: MatDialogRef<UpdateProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
interface Gender {
  value: number;
  name: string;
}