import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatAddEditComponent } from './boat-add-edit.component';

describe('BoatAddEditComponent', () => {
  let component: BoatAddEditComponent;
  let fixture: ComponentFixture<BoatAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoatAddEditComponent]
    });
    fixture = TestBed.createComponent(BoatAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
