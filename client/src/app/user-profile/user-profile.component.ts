import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { finalize } from 'rxjs/operators';

import { AuthenticationService } from '@app/core';
import { RoleChecker } from '@app/shared';

import { LoopBackAuth } from '../../../sdk/services/core';
import { RegisteredUser } from '../../../sdk/models';
import { RegisteredUserApi } from '../../../sdk/services';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {

  roleChecker: RoleChecker;

  isLoading = false;
  error: string;
  oldUser: RegisteredUser;
  userForm: FormGroup;
  passwordForm: FormGroup;
  userRoleForm: FormGroup;

  @Input() user: RegisteredUser;

  constructor(
    protected auth: LoopBackAuth,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private userApi: RegisteredUserApi,
    private formBuilder: FormBuilder,
    private location: Location) {
    this.roleChecker = new RoleChecker(userApi);
  }

  ngOnInit() {
    this.initUserRoleForm();
    this.initUserForm();
    this.initPasswordForm();
  }

  initUserForm(): void {
    const id = this.route.snapshot.paramMap.get('id');

    let form = {

      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
    };

    if (id != null) {
      form['id'] = [''];
      form['accountId'] = [''];

      this.setLoading(true);
      this.userApi.findById(id)
        .pipe(finalize(() => this.setLoading(false)))
        .subscribe((user: RegisteredUser) => {
          this.userForm.reset(user);

          this.userApi.getRoles(user.id)
            .subscribe((roles: [any]) => {
              roles.forEach(role => {
                const name = role.name;
                if (this.userRoleForm.get(name)) {
                  this.userRoleForm.setValue({ [name]: true })
                }
              });

            });
        });
    } else {
      form['password'] = ['',
        [
          Validators.required,
          // Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
        ]];
    }
    this.userForm = this.formBuilder.group(form);
  }

  initUserRoleForm(): void {
    const form = {
      admin: [false]
    };

    this.userRoleForm = this.formBuilder.group(form);
  }

  initPasswordForm(): void {
    const form = {
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    };

    this.passwordForm = this.formBuilder.group(form);
  }

  editingSelf(): boolean {
    const credentials = this.authenticationService.credentials;
    return credentials.id === this.userForm.controls.id.value;
  }

  setLoading(val: boolean): void {
    this.isLoading = val;
  }

  updateUser(): void {
    this.setLoading(true);

    this.userApi.patchOrCreate(this.userForm.value)
      .pipe(finalize(() => this.setLoading(false)))
      .subscribe((user: RegisteredUser) => {
        this.userApi.getRoles(user.id).subscribe(roles => console.log(roles));
      })
  }

  canDelete(): boolean {

    //you cannot delete yourself
    if (this.editingSelf()) {
      return false;
    }

    return this.roleChecker.is("admin");
  }

  deleteUser(): void {
    this.userApi.deleteById<Event>(this.userForm.controls.id.value).pipe(finalize(() => this.setLoading(false)))
      .subscribe(user => {
        this.goBack();
      });
  }

  changePassword(): void {
    this.userApi.changePassword(
      this.passwordForm.get('currentPassword').value,
      this.passwordForm.get('newPassword').value)
      .pipe(finalize(() => {
        this.setLoading(false);
        this.passwordForm.reset();
      }))
      .subscribe(() => {
      }, error => {

        console.log(`change password error: ${error}`);
        this.error = error;
      })
  }

  goBack(): void {
    this.location.back();
  }
}
