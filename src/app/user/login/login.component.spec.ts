import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {UserModule} from "../user.module";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, UserModule],
      declarations: [LoginComponent]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form',() => {
    const form = fixture.debugElement.nativeElement.querySelector('form');
    const inputs = form.querySelectorAll('input');
    expect(inputs.length).toEqual(2);
  });

  it('check initial values',() => {
    const form = component.loginForm;
    const formDefaultValues = {
      password: '',
      email: ''
    }
    expect(form.value).toEqual(formDefaultValues);
  });
});
