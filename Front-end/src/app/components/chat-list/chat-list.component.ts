import { IProfileUser } from './../../core/interfaces/iprofile-user';
import { AsyncPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { UserService } from '../../core/services/user.service';
import { ChatService } from '../../core/services/chat.service';
import { map, Observable, of, Subscription, switchMap } from 'rxjs';
import { MatListItemAvatar, MatListOption, MatSelectionList } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import { MatLineModule } from '@angular/material/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router, RouterModule } from '@angular/router';
import { IChat } from '../../core/interfaces/ichat';
import { FilterUsersPipe } from '../../core/pipes/filter-users.pipe';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatAutocompleteModule,
    AsyncPipe,
    FilterUsersPipe,
    MatSelectionList,
    MatDivider,
    MatListOption,
    MatListItemAvatar,
    MatLineModule,
    // CustomFirebaseDatePipe,
    RouterModule,
  ],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss'
})
export class ChatListComponent implements OnInit{
  readonly _ChatService = inject(ChatService);

  allUsers ! : IProfileUser[];

  ngOnInit(){
    this._ChatService.myChats$.subscribe({
      next: (res) => {
        this.allUsers = res;
        console.log(res);
      },
      error:(error) => {
        console.log(error);
      }
    });
  }

  createChat(otherUser : IProfileUser){
    this._ChatService.currentChattingUser.set(otherUser);
  }
}