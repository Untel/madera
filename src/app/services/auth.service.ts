import { User } from '../models/user.model';

import { Injectable } from '@angular/core';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';
import { FirebaseAuthState } from 'angularfire2/auth';
import { FirebaseListObservable } from 'angularfire2/database/firebase_list_observable';
import { FirebaseObjectObservable } from 'angularfire2/database/firebase_object_observable';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Project } from '../models/project.model';

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
                firstName: state.auth.displayName,
                lastName: 'N/A',
                photoUrl: state.auth.photoURL
            });

        });
    }

    // client1@test.fr ID:          i1jIvHDB93cE3SEqtM29Mb8rpd93
    // commercial1@test.fr ID:      wYnDeaWp81hjzBInhj1ipTgvR8P2
    // compta1@test.fr ID:          yrNS3UCofccuJFCqDHJAzVk60Am2
    fillFakeData() {
        this.af.database.object('/').set(null);
        const projects: FirebaseListObservable<Project[]> = this.af.database.list('/projects');

        const commercial: User = { email: 'client1@test.fr', firstName: 'Adrien', lastName: 'Fernandes', role: 'client', uid: 'i1jIvHDB93cE3SEqtM29Mb8rpd93' };
        const client: User = { email: 'commercial1@test.fr', firstName: 'Max Andre', lastName: 'Leroy', role: 'commercial', uid: 'wYnDeaWp81hjzBInhj1ipTgvR8P2' };
        const compta: User = { email: 'compta1@test.fr', firstName: 'Clément', lastName: 'Deboos', role: 'accounts-departement', uid: '9s5uP5A5eleFN92FzPLpOcyLe923' };

        const usersToAdd = {};
        usersToAdd[commercial.uid] = commercial;
        usersToAdd[client.uid] = client;
        usersToAdd[compta.uid] = compta;

        const project: Project = {
            title: 'Maison 7 pièces',
            pictures: ['/assets/img/background-1.jpg'],
            description: 'Maison pour M. Fernandes. Sans plus de commentaire.',
            commercials: ['i1jIvHDB93cE3SEqtM29Mb8rpd93'],
            client: 'wYnDeaWp81hjzBInhj1ipTgvR8P2'
        }
        projects.push(project);

        this.af.database.object('/users').set(usersToAdd);
        // this.af.auth.createUser({ email: 'client1@test.fr', password: 'azerty' });
        // this.af.auth.createUser({ email: 'commercial1@test.fr', password: 'azerty' });
        // this.af.auth.createUser({ email: 'compta1@test.fr', password: 'azerty' });
    }


  // register(email: string, password: string) {
  //   this.af.auth.createUserWithEmailAndPassword(email, password).then(authState => {
  //     console.log(authState);
  //   });
  // }

}
