import { Component } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FirebaseService } from './providers/firebase-database.service';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Game } from '../models/game';
import { Player } from '../models/player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [FirebaseService]
})
export class AppComponent {
  title = 'Trascendence';
  game: Game;
  player1: Player;
  player2: Player;
  fetchedGame: Game;

  createGameDev = false;

  constructor(private firebaseService: FirebaseService, private af: AngularFireDatabase) {
    var gameId = '-Kyh8vXyMLxY0FqNlINI';

    this.af.object('games/' + gameId).snapshotChanges().map(game => {
      const $key = game.payload.key;
      const data = { $key, ...game.payload.val() };
      this.fetchedGame = new Game(data.name, data.players);
    }).subscribe();

    if (this.createGameDev) {
      this.player1 = new Player('Diego', 20);
      this.player2 = new Player('Gonzalo', 20);
      this.game = new Game('First game', [this.player1, this.player2]);
      this.firebaseService.createGame(this.game).then(() => {
        console.log('User Added');
      });
    }
  }
  
}
