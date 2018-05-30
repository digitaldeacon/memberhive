import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { takeWhile, filter } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import {
  AppState,
  getAuthError,
  isAuthLoading,
  isAuth,
  Credentials,
  AuthenticateAction,
  ListPeopleAction,
  ListSettingAction,
  ListInteractionsAction,
  ListTagsAction,
  ListFamiliesAction
} from '@memberhivex/core';

@Component({
  selector: 'mh-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private alive: boolean = true;

  loading$: Observable<boolean>;
  error$: Observable<string>;
  form: FormGroup;
  closeError: boolean = false;

  constructor(private _fb: FormBuilder, private _router: Router, private _store: Store<AppState>) {
    this._store
      .select(isAuth)
      .pipe(takeWhile(() => this.alive), filter((authenticated: boolean) => authenticated))
      .subscribe((value: boolean) => {
        this._store.dispatch(new ListPeopleAction({}));
        this._store.dispatch(new ListSettingAction());
        this._store.dispatch(new ListInteractionsAction({}));
        this._store.dispatch(new ListTagsAction({}));
        this._store.dispatch(new ListFamiliesAction({}));
        this.home();
      });
  }

  ngOnInit(): void {
    this.initForm();
    this.error$ = this._store.select(getAuthError);
    this.loading$ = this._store.select(isAuthLoading);
  }

  onKey(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.submit();
    }
  }

  initForm(): void {
    this.closeError = true;
    this.form = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit(): void {
    const username: string = this.form.get('username').value;
    const password: string = this.form.get('password').value;

    this.closeError = false;

    username.trim();
    password.trim();

    const payload: Credentials = {
      username: username,
      password: password
    };

    this._store.dispatch(new AuthenticateAction(payload));
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  home(): void {
    this._router.navigate(['/dashboard']);
  }
}
