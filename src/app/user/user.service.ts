import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {User} from "./user.model";
import {UserLogin} from "./user-login.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getCurrentUser(userId: number): Observable<User> {
    const requestUrl = `${this.apiUrl}/api/users/${userId}`;
    return this.http.get<User>(requestUrl);
  }
}
