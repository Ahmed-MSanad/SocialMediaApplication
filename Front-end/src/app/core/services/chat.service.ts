import { IProfileUser } from './../interfaces/iprofile-user';
import { HttpClient } from '@angular/common/http';
import { IChat, IMessage } from './../interfaces/ichat';
import { concatMap, map, Observable, of, take } from 'rxjs';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatListControl = new FormControl();

  constructor(private httpClient : HttpClient) { }

  get myChats$() : Observable<IProfileUser[]>{
    if(typeof localStorage != 'undefined'){
      const token = localStorage.getItem('token')?.trim();
      return this.httpClient.get<IProfileUser[]>(`http://localhost:3000/api/message/users`, {
        headers: {
          'Authorization': `bearer ${token}`,
          'Content-Type':'application/json'
        }
      });
    }
    else{
      return of([]);
    }
  }

  addChatMessage(sendToUserId : string, text : string) : Observable<any>{
    if(typeof localStorage != 'undefined'){
      const token = localStorage.getItem('token')?.trim();
      return this.httpClient.post(`http://localhost:3000/api/message/send/${sendToUserId}`, {text}, {
        headers: {
          'Authorization': `bearer ${token}`,
          'Content-Type':'application/json'
        }
      });
    }
    else{
      return of([]);
    }
  }


  getChatMessages$(otherUserId : string) : Observable<IMessage[]>{
    if(typeof localStorage != 'undefined'){
      const token = localStorage.getItem('token')?.trim();
      return this.httpClient.get<IMessage[]>(`http://localhost:3000/api/message/${otherUserId}`, {
        headers: {
          'Authorization': `bearer ${token}`,
          'Content-Type':'application/json'
        }
      });
    }
    else{
      return of([]);
    }
  }

  currentChattingUser: WritableSignal<IProfileUser> = signal<IProfileUser>({
    _id: 'none',
    fullName: 'User',
    profilePicture: './assets/images/user_1.png',
    email: 'User@gmail.com'
  });

}