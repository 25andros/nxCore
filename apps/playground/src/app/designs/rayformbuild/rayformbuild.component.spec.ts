import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RayformbuildComponent } from './rayformbuild.component';

describe('RayformbuildComponent', () => {
  let component: RayformbuildComponent;
  let fixture: ComponentFixture<RayformbuildComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RayformbuildComponent]
    });
    fixture = TestBed.createComponent(RayformbuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
