import { Component } from '@angular/core';
import { Navtop10Component } from "../nav/navtop10/navtop10.component";
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
@Component({
    selector: 'app-top10',
    standalone: true,
    templateUrl: './top10.component.html',
    styleUrl: './top10.component.scss',
    imports: [ Navtop10Component,MatToolbarModule,MatIconModule]
})
export class Top10Component{
    i: number = 0;

    ngOnInit(): void {
        const counterIcons = document.querySelectorAll('.counter-icon');
        counterIcons.forEach((icon: Element) => {
            this.i++; 
            (icon as HTMLElement).textContent = String(this.i); 
        });
    }
    
}