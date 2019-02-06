import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckStudyComponent } from './deck-study.component';

describe('DeckStudyComponent', () => {
  let component: DeckStudyComponent;
  let fixture: ComponentFixture<DeckStudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeckStudyComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
