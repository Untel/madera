import { User } from '../models/user.model';

import { Injectable } from '@angular/core';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';
import { FirebaseAuthState } from 'angularfire2/auth';
import { FirebaseListObservable } from 'angularfire2/database/firebase_list_observable';
import { FirebaseObjectObservable } from 'angularfire2/database/firebase_object_observable';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  state$: Observable<FirebaseAuthState>;
  user$: Observable<User> = new Observable<User>();

  constructor(private af: AngularFire) {

    this.state$ = this.af.auth.asObservable();
    this.state$.skip(1)
      .do(state => console.log('Auth state', state))
      .subscribe(state => {
        if (state) this.user$ = this.af.database.object(`/users/${state.uid}`);
      });
  }

  logout = () => {
    return this.af.auth.logout().then(() => {
    });
  }

  loginWithCredentials = (email, password) => {
    return this.af.auth.login({ email, password }, {
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    }).then(state => {

    });
  }

  loginWithGoogle = () => {
    return this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    }).then(state => {

      const userRef$ = this.af.database.object(`/users/${state.uid}`);

      const user: User = {
        displayName: state.auth.displayName,
        photoUrl: state.auth.photoURL
      };
      userRef$.update(user);

    });
  }


  // register(email: string, password: string) {
  //   this.af.auth.createUserWithEmailAndPassword(email, password).then(authState => {
  //     console.log(authState);
  //   });
  // }

}
