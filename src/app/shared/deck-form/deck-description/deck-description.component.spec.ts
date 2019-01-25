import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckDescriptionComponent } from './deck-description.component';

describe('DeckDescriptionComponent', () => {
  let component: DeckDescriptionComponent;
  let fixture: ComponentFixture<DeckDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeckDescriptionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
