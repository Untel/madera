import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { AuthService } from './auth.service';

@Injectable()
export class UiService {

  mainColor: string;
  secondColor: string;

  constructor(private af: AngularFire, private auth: AuthService) {
  }

}
