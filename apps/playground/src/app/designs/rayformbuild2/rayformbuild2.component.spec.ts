import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rayformbuild2Component } from './rayformbuild2.component';

describe('Rayformbuild2Component', () => {
  let component: Rayformbuild2Component;
  let fixture: ComponentFixture<Rayformbuild2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Rayformbuild2Component]
    });
    fixture = TestBed.createComponent(Rayformbuild2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
