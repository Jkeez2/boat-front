import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UserLogin} from "../user/user-login.model";
import {Observable} from "rxjs";
import {User} from "../user/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080';

  constructor(private router: Router, private http: HttpClient) { }

  login(credentials: UserLogin): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/api/auth/login`, credentials);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/api/auth/register`, user);
  }

  isAunthenticated(): boolean {
    let currentUser = localStorage.getItem('currentUser');
    return currentUser != null;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }
}
