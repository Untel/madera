import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { AngularFire } from 'angularfire2';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

    private storage;
    public user$: Observable<User> = new Observable<User>();

    constructor(private auth: AuthService, private af: AngularFire) {
        this.storage = firebase.storage().ref();
        this.user$ = this.auth.state$
            .filter( auth => !!auth )
            .switchMap( auth => this.af.database.object(`/users/${auth.uid}`), (auth, user) => Object.assign({}, user, auth) );

        this.user$.subscribe(user => console.log('USER Connected: ', user));
    }

    updateUser = (user: User) => {
        let uid = this.af.auth.getAuth().uid;
        const userRef$ = this.af.database.object(`/users/${uid}`);
        return userRef$.update(user);
    }

    uploadProfilPicture = () => {
        let uid = this.af.auth.getAuth().uid;
        // this.storage.child(`profil-pictures/${uid}`).put();
    }
}
