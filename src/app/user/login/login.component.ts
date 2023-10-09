import { Component } from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {UserLogin} from "../models/user-login.model";
import {AuthService} from "../../auth/auth.service";
import {catchError, Observable, throwError} from "rxjs";
import {User} from "../models/user.model";

/**
 * Component that represents the login page, using reactive form.
 * Validators are used to validate user's inputs
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string | null = null;
  userLogin: UserLogin = new UserLogin("", "");
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  constructor(private auth: AuthService, private userService: UserService, private router: Router,
              private fb: FormBuilder) {
  }

  /**
   * When the user presses login button, it calls the authService for logging.
   */
  login() {
    // Transform form values into UserLogin
    this.userLogin = Object.assign(this.userLogin, this.loginForm.value);

    this.auth.login(this.userLogin)
      .pipe(
        catchError(this.handleError<User>(`Login`))
      )
      .subscribe((user) => {
        // If login is successful, we store current user's id and navigate to boats list
        localStorage.setItem('currentUser', JSON.stringify(user.id));
        this.router.navigate(['/boats']);
    });
  }

  /**
   * Handle Http operation that failed.
   *
   * @param operation name of the operation that failed
   * @param result optional value to return as the observable result
   * @example Handles errors like email not found or wrong password.
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.errorMessage = `${operation} failed: ${error.error.message}`;

      // Removes login error message after 5 seconds
      setTimeout(() => {
        this.errorMessage = null;
      }, 5000);

      return throwError(result as T);
    };
  }
}
