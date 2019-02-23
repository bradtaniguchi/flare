import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlimCardComponent } from './slim-card.component';

describe('SlimCardComponent', () => {
  let component: SlimCardComponent;
  let fixture: ComponentFixture<SlimCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SlimCardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlimCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
