import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleListFieldComponent } from './role-list-field.component';

describe('RoleListFieldComponent', () => {
  let component: RoleListFieldComponent;
  let fixture: ComponentFixture<RoleListFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoleListFieldComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleListFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
