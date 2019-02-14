import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyReviewComponent } from './study-review.component';

describe('StudyReviewComponent', () => {
  let component: StudyReviewComponent;
  let fixture: ComponentFixture<StudyReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudyReviewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
