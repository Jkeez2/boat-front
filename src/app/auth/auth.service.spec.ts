import {TestBed} from '@angular/core/testing';

import { AuthService } from './auth.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {User} from "../user/user.model";
import {Router} from "@angular/router";
import {UserRegister} from "../user/user-register.model";

describe('AuthService', () => {
  let service: AuthService;
  let controller: HttpTestingController;

  const expectedUrl = 'http://localhost:8080';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register new user', () => {
    let user: UserRegister = {firstName: "Jeanne", lastName: "Trope", email: "jeannetrop@test.com", password: "secretpassworD1"};
    let newUser: User | undefined;

    service.register(user).subscribe(
      (createdUser) => {
        newUser = createdUser;
      }
    );

    const request = controller.expectOne(`${expectedUrl}/api/auth/register`);
    request.flush(user);
    controller.verify();

    expect(newUser?.firstName).toEqual(user.firstName);
    expect(newUser?.lastName).toEqual(user.lastName);
    expect(newUser?.email).toEqual(user.email);
    expect(newUser?.password).toEqual(user.password);
  });

  it('should logout and redirect to home', () => {
    service.logout();
    expect(TestBed.inject(Router).url).toEqual('/');
  });
});
