import { Injectable } from '@angular/core'
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FirebaseService {

  game: Observable<any>;

  constructor(private af: AngularFireDatabase) {
  }

  getGame(gameId) {
    return new Promise((resolve, reject) => {
      this.game = this.af.object('games/' + gameId).valueChanges();
      resolve(this.game);
    });
  }
}
