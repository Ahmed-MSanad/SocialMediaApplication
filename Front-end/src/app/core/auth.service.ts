import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ISigninCredentials, ISignupCredentials } from './interfaces/isignup-credentials';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IProfileUser } from './interfaces/iprofile-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient : HttpClient, private _Router: Router) { }
  
  
  // readonly isLoggedIn$ = authState(this._Auth);


  currentUser(): Observable<IProfileUser | null> {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token')?.trim();
      console.log('Token being sent from Angular:', token);
      if (!token) {
        console.log('No token found in localStorage');
        return of(null);
      }
      return this.httpClient.get<IProfileUser>(`http://localhost:3000/api/user/profile`, {
        headers: {
          'Authorization': `bearer ${token}`,
          'Content-Type':'application/json'
        }
      });
    } else {
      return of(null);
    }
  }


  register(data : ISignupCredentials) : Observable<any>{
    return this.httpClient.post(`http://localhost:3000/api/auth/register`, data);
  }


  login(data : ISigninCredentials){
    return this.httpClient.post(`http://localhost:3000/api/auth/login`, data);
  }


  signOut(){
    localStorage.removeItem('token');
    this._Router.navigate(["/login"]);
  }
}