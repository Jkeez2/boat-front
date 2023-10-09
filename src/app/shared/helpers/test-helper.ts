import {ComponentFixture} from "@angular/core/testing";

/**
 * Helper used for testing.
 */

/**
 * Method that find a DOM element.
 * @param fixture host component
 * @param el element to find
 */
export function findEl(fixture: ComponentFixture<any>, el: string) {
  return fixture.debugElement.nativeElement.querySelector(el);
}
