import { Component, EventEmitter, Input, Output } from '@angular/core';
import Assertion from '@shared/validation/assertion';
import { UserProfileArguments } from './user-profile-arguments';
import { ApplicationUserExtended } from '@models/extended';
import { UserRole } from '@models/enums';
import { UserService } from '@services/user.service';
import { AlertService } from '@shared/alert/services/alert.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  user: ApplicationUserExtended | null = null;

  showGoToAdminButton = false;
  showResendInvitationButton = false;
  inactiveUser = false;

  private currentUser: ApplicationUserExtended;

  @Input('userProfileArguments')
  set userSet(value: UserProfileArguments) {
    this.userProfileArguments = value;
    this.reloadUser();
  }

  private userProfileArguments: UserProfileArguments | null = null;
  showCurrentSalary = false;

  constructor(private readonly userService: UserService, private readonly alertService: AlertService) {}

  private reloadUser(): void {
    Assertion.notNull(this.userProfileArguments, 'this.userProfileArguments');

    this.user = this.userProfileArguments.user;
    this.inactiveUser = !this.user.isActive;
    const hasCurrentUser = this.userProfileArguments.hasCurrentUser;
    this.currentUser = this.userProfileArguments.currentUserOrNull;

    this.showGoToAdminButton = !this.inactiveUser && hasCurrentUser && this.currentUser?.hasHRRole();
    this.showResendInvitationButton = this.currentUser?.hasHRRole() && !this.userProfileArguments.user.emailConfirmed;
  }

  sendInvitationEmail() {
    this.currentUser.hasRoleOrFail(UserRole.HRManager);
    this.userService.sendInvitationEmail(this.user.id).subscribe(() => {
      this.alertService.success('Invitation email was sent.');
    });
  }
}
