import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MezptComponent } from './mezpt.component';

describe('MezptComponent', () => {
  let component: MezptComponent;
  let fixture: ComponentFixture<MezptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MezptComponent]
    });
    fixture = TestBed.createComponent(MezptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
