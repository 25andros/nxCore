import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayformsComponent } from './arrayforms.component';

describe('ArrayformsComponent', () => {
  let component: ArrayformsComponent;
  let fixture: ComponentFixture<ArrayformsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArrayformsComponent]
    });
    fixture = TestBed.createComponent(ArrayformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
