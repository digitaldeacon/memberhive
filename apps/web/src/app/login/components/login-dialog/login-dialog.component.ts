import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState, Credentials, AuthenticateAction, SignOutAction, AuthService } from '@memberhivex/core';

@Component({
  selector: 'mh-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {
  form: FormGroup;
  message: string;

  constructor(
    private _dref: MatDialogRef<LoginDialogComponent>,
    private _store: Store<AppState>,
    private _fb: FormBuilder,
    private _auth: AuthService
  ) {
    this.form = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit(): void {
    const username: string = this.form.get('username').value;
    const password: string = this.form.get('password').value;

    username.trim();
    password.trim();

    const payload: Credentials = {
      username: username,
      password: password
    };

    this._store.dispatch(new AuthenticateAction(payload));
  }

  cancel(): void {
    this.form.reset();
    this._auth.clearStore();
    this._store.dispatch(new SignOutAction());
    this._dref.close();
  }
}
