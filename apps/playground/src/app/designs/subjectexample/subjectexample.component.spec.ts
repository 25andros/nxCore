import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectexampleComponent } from './subjectexample.component';

describe('SubjectexampleComponent', () => {
  let component: SubjectexampleComponent;
  let fixture: ComponentFixture<SubjectexampleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubjectexampleComponent]
    });
    fixture = TestBed.createComponent(SubjectexampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
