import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyOverviewSideNavComponent } from './study-overview-side-nav.component';

describe('StudyOverviewSideNavComponent', () => {
  let component: StudyOverviewSideNavComponent;
  let fixture: ComponentFixture<StudyOverviewSideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudyOverviewSideNavComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyOverviewSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
