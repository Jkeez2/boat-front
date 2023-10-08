import {ComponentFixture} from "@angular/core/testing";
import {RegistrationComponent} from "../../user/registration/registration.component";

export function findEl(fixture: ComponentFixture<any>, el: string) {
  return fixture.debugElement.nativeElement.querySelector(el);
}
