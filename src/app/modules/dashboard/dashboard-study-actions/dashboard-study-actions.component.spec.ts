import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStudyActionsComponent } from './dashboard-study-actions.component';

describe('DashboardStudyActionsComponent', () => {
  let component: DashboardStudyActionsComponent;
  let fixture: ComponentFixture<DashboardStudyActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardStudyActionsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardStudyActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
