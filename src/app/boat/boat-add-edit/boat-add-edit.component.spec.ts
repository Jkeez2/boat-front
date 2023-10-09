import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatAddEditComponent } from './boat-add-edit.component';
import {findEl} from "../../shared/helpers/test-helper";
import {BoatModule} from "../boat.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ActivatedRoute} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('BoatAddEditComponent', () => {
  let component: BoatAddEditComponent;
  let fixture: ComponentFixture<BoatAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule,BoatModule, ReactiveFormsModule,HttpClientTestingModule, RouterTestingModule],
      declarations: [BoatAddEditComponent]
    });
    fixture = TestBed.createComponent(BoatAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form',() => {
    const form = fixture.debugElement.nativeElement.querySelector('form');
    const input = form.querySelectorAll('input');
    expect(input.length).toEqual(1);
    const textarea = form.querySelectorAll('textarea');
    expect(textarea.length).toEqual(1);
  });

  it('check initial values',() => {
    const form = component.boatForm;
    const formDefaultValues = {
      name: '',
      description: ''
    }
    expect(form.value).toEqual(formDefaultValues);
  });

  it('check form validity and submit button',() => {
    const nameInput = findEl(fixture,'[formControlName="name"]');
    nameInput.value = "test";
    nameInput.dispatchEvent(new Event('input'));
    const descriptionInput = findEl(fixture,'[formControlName="description"]');
    descriptionInput.value = "test";
    descriptionInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const formName = component.boatForm.get('name');
      expect(nameInput.value).toEqual(formName?.value);
      expect(formName?.errors).toBeNull();

      const formDescription = component.boatForm.get('description');
      expect(descriptionInput.value).toEqual(formDescription?.value);
      expect(formDescription?.errors).toBeNull();

      expect(component.boatForm.valid).toBeTrue();
    })
  });
});
