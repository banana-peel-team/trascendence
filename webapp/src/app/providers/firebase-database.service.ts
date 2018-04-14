import { Injectable } from '@angular/core'
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Game } from '../../models/game';
import { Player } from '../../models/player';

@Injectable()
export class FirebaseService {

  game: Observable<any>;

  constructor(private af: AngularFireDatabase) {
  }

  createGame(game: Game) {
    return new Promise((resolve, reject) => {
      this.af.list('games').push(game);
    });
  }

  updatePlayer(gameId, index, player: Player) {
    return new Promise((resolve, reject) => {
      this.af.object('games/' + gameId + '/players/' + index + '/').update(player);
      resolve();
    });
  }
}
