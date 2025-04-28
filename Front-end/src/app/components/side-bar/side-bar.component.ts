import { AuthService } from './../../core/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { IProfileUser } from '../../core/interfaces/iprofile-user';


export type MenuItem = {
  icon : string,
  label : string,
  route? : string,
}

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterLink,
    RouterModule,
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  menuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: 'home',
    },
    {
      icon: 'chat',
      label: 'Chats',
      route: 'messages',
    },
    {
      icon: 'contacts',
      label: 'Users',
      route: 'chatUsersList',
    },
  ]);

  collapsed = signal(true);

  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');

  profilePicSize = computed(() => this.collapsed() ? '32px' : '112px');

  _authService = inject(AuthService);

  logOut(){
    this._authService.signOut();
  }


  currentUser: IProfileUser | null = null;
  ngOnInit(): void {
    this._authService.currentUser().subscribe({
      next: (res) => {
        this.currentUser = res;
        console.log(this.currentUser);
      },
      error: (error) => {
        console.log('Error in CurrentUser in side-bar component', error);
        if (error.status === 401 || error.status === 403) {
          console.log('User is not authorized. Redirecting to login...');
        } else {
          console.log('Failed to fetch user profile:', error.message);
        }
      }
    });
  }

  
  setProfile(){
    Swal.fire({
      title: 'Update your profile',
      html: `
        <input type="text" id="swal-input1" class="swal2-input" placeholder="Enter your new Image URL">
        <input type="text" id="swal-input2" class="swal2-input" placeholder="Enter your new username">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const imageURL = document.getElementById('swal-input1') as HTMLInputElement;
        const username = document.getElementById('swal-input2') as HTMLInputElement;
        return { imageURL, username };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { imageURL, username } = result.value;

        
      }
    });
  }

// Dark & Light Themes
  is_light_mode : boolean = true;
  modeToggle(){
    this.is_light_mode = !this.is_light_mode;
    document.documentElement.classList.toggle("dark");
  }
}