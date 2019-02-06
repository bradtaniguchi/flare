import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckStudySideNavComponent } from './deck-study-side-nav.component';

describe('DeckStudySideNavComponent', () => {
  let component: DeckStudySideNavComponent;
  let fixture: ComponentFixture<DeckStudySideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeckStudySideNavComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckStudySideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
