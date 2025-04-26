import { Component } from '@angular/core';
import { ChatListComponent } from '../chat-list/chat-list.component';
import { MessagesComponent } from '../messages/messages.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ChatListComponent,
    MessagesComponent,
    AsyncPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{

  isLargeScreen$ !: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {}


  ngOnInit(): void {
    this.isLargeScreen$ = this.breakpointObserver.observe(['(min-width: 1024px)'])
      .pipe(map(result => result.matches));
  }

}