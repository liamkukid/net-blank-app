import { Component, OnInit } from '@angular/core';
import { ApplicationUser } from '@models/application-user';
import { AuthService } from '@shared/services/auth/auth.service';
import { UserAdminService } from '@modules/admin/services/user.admin.service';
import { UserRole } from '@models/enums';
import { SelectItem } from '@shared/value-objects';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivatedRouteExtended } from '@shared/routes/activated-route-extended';
import { AlertService } from '@shared/alert/services/alert.service';
import { UserEditForm } from './user-edit-form';
import { ConfirmMsg } from '@shared/components/dialogs/models/confirm-msg';
import { DialogMessage } from '@shared/components/dialogs/models/dialog-message';
import { UserRoleSelectItem } from '@shared/value-objects/user-role-select-item';
import { DeleteUserDialogMessage } from './delete-user-dialog-message';
import { ApplicationUserExtended } from '@models/extended';
import { TitleService } from '@services/title.service';
import { RestoreUserDialogMessage } from '@modules/admin/components/users/users-edit/restore-user-dialog-message';
import { UserRestoreRequestService } from '@admin-services/user-restore-request-service';

@Component({
  templateUrl: 'users-edit.component.html'
})
export class UsersEditComponent implements OnInit {
  userId: number | null = null;
  userName = '';

  editForm: UserEditForm | null = null;

  functionManagers: Array<ApplicationUser> = [];
  user: ApplicationUserExtended | null = null;
  currentUser: ApplicationUserExtended | null;
  userRolesForSelect: UserRoleSelectItem[] = [];
  selectedUserRole: SelectItem<UserRole> | null = null;

  confirmDeletionMessage: DialogMessage<ConfirmMsg>;

  private readonly allRoles = [
    UserRole.Employee,
    UserRole.HRManager,
    UserRole.TopManager,
    UserRole.SystemAdministrator
  ];

  private readonly activatedRouteExtended: ActivatedRouteExtended;
  isActive = false;
  showRestoreRequestButton = false;
  showGoToSalariesButton = false;

  constructor(
    private readonly userService: UserAdminService,
    private readonly userRestoreRequestService: UserRestoreRequestService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly alertService: AlertService,
    activatedRoute: ActivatedRoute,
    private readonly titleService: TitleService
  ) {
    this.activatedRouteExtended = new ActivatedRouteExtended(activatedRoute);
  }

  get editingMyself(): boolean {
    return this.currentUser != null && this.user.email === this.currentUser.email;
  }

  private getRolesForSelectBasedOnUserRole(): UserRoleSelectItem[] {
    return this.allRoles.map(x => new UserRoleSelectItem(x, UserRole[x], this.enableUserRoleField(x)));
  }

  ngOnInit() {
    this.activatedRouteExtended.getIdFromRoute().subscribe(userId => {
      this.authService.getCurrentUser().subscribe(currentUser => {
        this.currentUser = currentUser;

        this.userId = userId;
        this.reloadUser();
      });
    });
  }

  private reloadUser(): void {
    this.userService.userForAdminPanel(this.userId).subscribe(user => {
      this.user = user;
      this.userName = user.userName;
      this.editForm = new UserEditForm(this.user, this.userService, this.alertService);

      this.userRolesForSelect = this.getRolesForSelectBasedOnUserRole();
      this.selectedUserRole = this.userRolesForSelect.find(x => x.item === this.currentUser.roleAsEnum);
      this.isActive = user.isActive;
      this.titleService.setTitle(`Edit ${this.user.fullName}`);
      this.checkIfRestoreRequestCreated();
      this.showGoToSalariesButton = this.isActive && this.currentUser?.hasRole(UserRole.TopManager);
    });
  }

  onSubmit(): void {
    this.editForm.onSuccessSubmit(this.currentUser, () => {
      // TODO Maxim: add alert message here
      this.router.navigate(['admin', 'users']);
    });
  }

  deleteUser() {
    if (!this.isActive) {
      this.alertService.warn('User is inactive');
      return;
    }

    this.confirmDeletionMessage = new DeleteUserDialogMessage(
      this.currentUser,
      this.user,
      this.userService,
      this.router
    ).create();
  }

  enableUserRoleField(role: UserRole): boolean {
    return (
      this.currentUser != null &&
      this.user != null &&
      this.currentUser.hasRole(this.user.roleAsEnum) &&
      this.currentUser.id !== this.user.id &&
      this.currentUser.hasRole(role)
    );
  }

  restoreUser() {
    if (!this.isActive) {
      this.confirmDeletionMessage = new RestoreUserDialogMessage(
        this.currentUser,
        this.user,
        this.userRestoreRequestService,
        this.router
      ).create();
    } else {
      this.alertService.warn('User is active');
      return;
    }
  }

  private checkIfRestoreRequestCreated() {
    if (!this.isActive) {
      this.userRestoreRequestService.isRequested(this.userId).subscribe(result => {
        this.showRestoreRequestButton = !result;
      });
    }
  }
}
