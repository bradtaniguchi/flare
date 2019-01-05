import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckListFieldComponent } from './deck-list-field.component';

describe('DeckListFieldComponent', () => {
  let component: DeckListFieldComponent;
  let fixture: ComponentFixture<DeckListFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeckListFieldComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckListFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
