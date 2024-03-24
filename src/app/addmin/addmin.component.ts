import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'app-addmin',
  standalone: true,
  imports: [MatIconModule,MatToolbarModule],
  templateUrl: './addmin.component.html',
  styleUrl: './addmin.component.scss'
})
export class AddminComponent {

}
