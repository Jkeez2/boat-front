import { Component } from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {UserLogin} from "../user-login.model";
import {AuthService} from "../../auth/auth.service";
import {catchError, Observable, tap, throwError} from "rxjs";
import {User} from "../user.model";

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
  constructor(private auth: AuthService, private userService: UserService, private router: Router, private fb: FormBuilder) {
  }


  login() {
    this.userLogin = Object.assign(this.userLogin, this.loginForm.value);

    this.auth.login(this.userLogin)
      .pipe(
        catchError(this.handleError<User>(`Login`))
      )
      .subscribe((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user.id));
        this.router.navigate(['/boats']);
    });
  }

  /**
   * Handle Http operation that failed.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.errorMessage = `${operation} failed: ${error.error.message}`;
      setTimeout(() => {
        this.errorMessage = null;
      }, 5000);
      return throwError(result as T);
    };
  }
}
