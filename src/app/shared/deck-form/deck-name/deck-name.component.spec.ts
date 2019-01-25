import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckNameComponent } from './deck-name.component';

describe('DeckNameComponent', () => {
  let component: DeckNameComponent;
  let fixture: ComponentFixture<DeckNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeckNameComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
