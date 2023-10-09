import {ComponentFixture, TestBed} from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {UserModule} from "../user.module";
import {findEl} from "../../shared/helpers/test-helper";

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let service: AuthService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [UserModule, ReactiveFormsModule, HttpClientTestingModule],
      declarations: [RegistrationComponent],
      providers: [AuthService]
    });
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form',() => {
    const form = fixture.debugElement.nativeElement.querySelector('form');
    const inputs = form.querySelectorAll('input');
    expect(inputs.length).toEqual(4);
  });

  it('check initial values',() => {
    const form = component.registerForm;
    const formDefaultValues = {
      firstName: '',
      lastName: '',
      password: '',
      email: ''
    }
    expect(form.value).toEqual(formDefaultValues);
  });

  it('check form validity and submit button',() => {
    const firstNameInput = findEl(fixture,'[formControlName="firstName"]');
    firstNameInput.value = "test";
    firstNameInput.dispatchEvent(new Event('input'));
    const lastNameInput = findEl(fixture,'[formControlName="lastName"]');
    lastNameInput.value = "test";
    lastNameInput.dispatchEvent(new Event('input'));
    const emailInput = findEl(fixture,'[formControlName="email"]');
    emailInput.value = "test@test.com";
    emailInput.dispatchEvent(new Event('input'));
    const passwordInput = findEl(fixture,'[formControlName="password"]');
    passwordInput.value = "testsecresT123";
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const formFirstName = component.registerForm.get('firstName');
      expect(firstNameInput.value).toEqual(formFirstName?.value);
      expect(formFirstName?.errors).toBeNull();

      const formLastName = component.registerForm.get('lastName');
      expect(lastNameInput.value).toEqual(formLastName?.value);
      expect(formLastName?.errors).toBeNull();

      const formEmail = component.registerForm.get('email');
      expect(emailInput.value).toEqual(formEmail?.value);
      expect(formEmail?.errors).toBeNull();

      const formPassword = component.registerForm.get('password');
      expect(passwordInput.value).toEqual(formPassword?.value);
      expect(formPassword?.errors).toBeNull();

      expect(component.registerForm.valid).toBeTrue();
    })
  });
});
