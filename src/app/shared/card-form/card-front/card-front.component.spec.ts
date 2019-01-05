import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFrontComponent } from './card-front.component';

describe('CardFrontComponent', () => {
  let component: CardFrontComponent;
  let fixture: ComponentFixture<CardFrontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardFrontComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
