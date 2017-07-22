import { User } from '../models/user.model';

import { Injectable } from '@angular/core';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';
import { FirebaseAuthState } from 'angularfire2/auth';
import { FirebaseListObservable } from 'angularfire2/database/firebase_list_observable';
import { FirebaseObjectObservable } from 'angularfire2/database/firebase_object_observable';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

    state$: Observable<FirebaseAuthState>;

    constructor(private af: AngularFire, private router: Router ) {
        this.state$ = this.af.auth.asObservable();
        this.state$.filter(auth => !auth).subscribe(() => this.router.navigateByUrl('/pages/login'));
    }

    logout = () => {
        return this.af.auth.logout().then(() => {
        });
    }

    loginWithCredentials = (email, password) => {
        return this.af.auth.login({ email, password }, {
            provider: AuthProviders.Password,
            method: AuthMethods.Password
        });
    }

    loginWithGoogle = () => {
        return this.af.auth.login({
            provider: AuthProviders.Google,
            method: AuthMethods.Popup
        }).then(state => {
            console.log(state);

            const userRef$ = this.af.database.object(`/users/${state.uid}`);
            userRef$.update({
                displayName: state.auth.displayName,
                photoUrl: state.auth.photoURL
            });

        });
    }


  // register(email: string, password: string) {
  //   this.af.auth.createUserWithEmailAndPassword(email, password).then(authState => {
  //     console.log(authState);
  //   });
  // }

}
