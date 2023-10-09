import {Component} from '@angular/core';
import {User} from "../user.model";
import {UserService} from "../user.service";
import {catchError, Observable, tap, throwError} from "rxjs";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {UserRegister} from "../user-register.model";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user: UserRegister = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  fieldRequired: string = "This field is required";

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, this.checkPassword] ],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required]
  });

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private auth: AuthService, private userService: UserService, private fb: FormBuilder) { }

  register() {
    this.user = Object.assign(this.user, this.registerForm.value);
    this.auth.register(this.user)
      .pipe(
        tap(() => {
          this.successMessage = null;
        }),
        catchError(this.handleError<User>(`Register`))
      )
      .subscribe((registeredUser) => {
        this.successMessage = 'Account successfully created.';
        setTimeout(() => {
          this.successMessage = null;
        }, 5000);
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

  checkValidation(input: string){
    return this.registerForm.get(input)?.invalid && (this.registerForm.get(input)?.dirty || this.registerForm.get(input)?.touched);
  }

  emailErrors() {
    return this.registerForm.get('email')?.hasError('required') ? 'This field is required' :
      this.registerForm.get('email')?.hasError('email') ? 'Not a valid emailaddress' :''
  }

  checkPassword(control: AbstractControl) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }
  getErrorPassword() {
    return this.registerForm.get('password')?.hasError('required') ? 'This field is required (The password must be at least six characters, one uppercase letter and one number)' :
      this.registerForm.get('password')?.hasError('requirements') ? 'Password needs to be at least six characters, one uppercase letter and one number' : '';
  }
}
