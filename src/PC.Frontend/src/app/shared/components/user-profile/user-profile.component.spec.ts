import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { TestApplicationUser } from '@shared/test-utils/models';
import { UserRole } from '@models/enums';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApplicationUserExtended } from '@models/extended';
import { UserService } from '@services/user.service';
import { AlertService } from '@shared/alert/services/alert.service';
import { testUtilStubs } from '@shared/test-utils';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [...testUtilStubs, UserService, AlertService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    component.user = new ApplicationUserExtended(new TestApplicationUser(UserRole.Employee));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
