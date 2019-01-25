import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckCreateCardComponent } from './deck-create-card.component';

describe('DeckCreateCardComponent', () => {
  let component: DeckCreateCardComponent;
  let fixture: ComponentFixture<DeckCreateCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeckCreateCardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckCreateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
