import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAndRoleComponent } from './user-and-role.component';

describe('UserAndRoleComponent', () => {
  let component: UserAndRoleComponent;
  let fixture: ComponentFixture<UserAndRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserAndRoleComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAndRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
