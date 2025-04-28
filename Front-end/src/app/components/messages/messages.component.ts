import { AsyncPipe, NgClass } from '@angular/common';
import { Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { combineLatest, map, Observable, Subscription, switchMap, tap } from 'rxjs';
import { ChatService } from '../../core/services/chat.service';
import { MatDividerModule } from '@angular/material/divider';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { MatListItemIcon, MatListModule } from '@angular/material/list'
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { IChat, IMessage } from '../../core/interfaces/ichat';
import { IProfileUser } from '../../core/interfaces/iprofile-user';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    AsyncPipe,
    NgClass,
    ReactiveFormsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatListItemIcon,
    MatInputModule,
    MatAutocompleteModule,
    MatListModule,
    MatOptionModule,
    FormsModule
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent{
  readonly _ChatService = inject(ChatService);
  readonly _authService = inject(AuthService);


  chatMessages ! : IMessage[];
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

  GetMessages(){
    this._ChatService.getChatMessages$(this._ChatService.currentChattingUser()?._id).subscribe({
      next: (res) => {
        this.chatMessages = res;
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

  message : string = "";
  sendMessage(){
    this._ChatService.addChatMessage(this._ChatService.currentChattingUser()?._id, this.message).subscribe({
      next: (res) => {
        console.log(res);
        this.GetMessages();
        this.message = "";
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

}