import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlfaComponent } from './alfa.component';

describe('AlfaComponent', () => {
  let component: AlfaComponent;
  let fixture: ComponentFixture<AlfaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlfaComponent]
    });
    fixture = TestBed.createComponent(AlfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
