import { UiService } from './ui.service';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

    public user$: Observable<User> = new Observable<User>();
    private userId;

    constructor(private auth: AuthService, private af: AngularFire, ui: UiService) {
        this.user$ = this.auth.state$
            .do(auth => auth ? this.userId = auth.uid : null)
            .filter( auth => !!auth )
            .switchMap( auth => this.af.database.object(`/users/${auth.uid}`), (auth, user) => Object.assign({}, user, auth) );

        this.user$.distinct().subscribe(user => {
            console.log('USER Connected: ', user);
            // ui.primary(`Bonjour ${user.firstName} !`);
        });
    }

    updateUser = (user: User) => {
        console.log(user);
        return this.af.database.object(`/users/${this.userId}`).update(user);
    }

    uploadProfilPicture = (b64Img) => {
        return this.af.database.object(`/users/${this.userId}/photo`).set(b64Img);
    }
} 
 