import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompinteractComponent } from './compinteract.component';

describe('CompinteractComponent', () => {
  let component: CompinteractComponent;
  let fixture: ComponentFixture<CompinteractComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompinteractComponent]
    });
    fixture = TestBed.createComponent(CompinteractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
