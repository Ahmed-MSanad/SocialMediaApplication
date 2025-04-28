import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = 'http://localhost:3000/api/post';
  
  constructor(private http: HttpClient) { }
  
  createPost(content: string, image: string): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found in local storage');
    }

    const headers = new HttpHeaders({
      'Authorization': `bearer ${token}`
    });

    const body = { content, image };

    return this.http.post(`${this.baseUrl}/post`, body, { headers });
  }

  getMyPosts(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found in local storage');
    }

    const headers = new HttpHeaders({
      'Authorization': `bearer ${token}`
    });

    return this.http.get(`${this.baseUrl}/myposts`, { headers });
  }

  updatePost(postId: string, content: string, image: string): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found in local storage');
    }

    const headers = new HttpHeaders({
      'Authorization': `bearer ${token}`
    });

    const body = { content, image };

    return this.http.put(`${this.baseUrl}/post/${postId}`, body, { headers });
  }

  deletePost(postId: string): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found in local storage');
    }

    const headers = new HttpHeaders({
      'Authorization': `bearer ${token}`
    });

    return this.http.delete(`${this.baseUrl}/post/${postId}`, { headers });
  }
}
