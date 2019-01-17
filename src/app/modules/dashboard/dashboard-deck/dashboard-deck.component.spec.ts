import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDeckComponent } from './dashboard-deck.component';

describe('DashboardDeckComponent', () => {
  let component: DashboardDeckComponent;
  let fixture: ComponentFixture<DashboardDeckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardDeckComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
