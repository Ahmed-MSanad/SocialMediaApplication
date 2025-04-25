import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';

@Component({
  selector: 'app-blank',
  imports: [RouterOutlet, SideBarComponent],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.scss'
})
export class BlankComponent {

}
