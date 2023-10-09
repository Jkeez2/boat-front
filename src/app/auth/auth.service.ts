import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UserLogin} from "../user/user-login.model";
import {Observable} from "rxjs";
import {User} from "../user/user.model";
import {UserRegister} from "../user/user-register.model";

/**
 * This service is used to register new user accounts, login users,
 * check if current user is authenticated and logout.
 * Currently using local storage to keep track of authenticated user.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth';

  currentUser: User;

  constructor(private router: Router, private http: HttpClient) { }

  /**
   * API request to log in user with credentials.
   * Errors like "account with email not found" are managed in components.
   * @param credentials email and password
   * @return logged in user
   */
  login(credentials: UserLogin): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, credentials);
  }

  /**
   * API request to register a new user account.
   * Errors like "email already taken" are managed in components.
   * @param user account to register
   * @return new created user
   */
  register(user: UserRegister): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  /**
   * Check if user is authenticated using local storage.
   */
  isAuthenticated(): boolean {
    let currentUser = localStorage.getItem('currentUser');
    return currentUser != null;
  }

  /**
   * Clear local storage to simulate logout and navigate to main page.
   */
  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }
}
