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
  player: Player;
  player1: Player;
  player2: Player;
  player3: Player;
  fetchedGame: Game;
  gameId;
  currentMainPlayerIndex = 0;

  createGameDev = false;

  constructor(private firebaseService: FirebaseService, 
              private af: AngularFireDatabase) {
    var gameId = '-Kyn9HofQVqaBM7mAiAj';

    this.af.object('games/' + gameId).snapshotChanges().map(game => {
      const $key = game.payload.key;
      const data = { $key, ...game.payload.val() };
      this.fetchedGame = new Game(data.name, data.players);
      this.fetchedGame.players.forEach((player, index) => {
        if (index==this.currentMainPlayerIndex) {
          player.main = true;
        }
      });
      this.gameId = data.$key;
    }).subscribe();

    if (this.createGameDev) {
      this.player1 = new Player('Diego', 20);
      this.player2 = new Player('Gonzalo', 20);
      this.player3 = new Player('Bruno', 20);
      this.game = new Game('First game', [this.player1, this.player2, this.player3]);
      this.firebaseService.createGame(this.game).then(() => {
        console.log('User Added');
      });
    }
  }

  updateLife(index, difference) {
    this.player = new Player(this.fetchedGame.players[index].name, 
                             this.fetchedGame.players[index].life + difference);
    this.firebaseService.updatePlayer(this.gameId, 
                                      index, 
                                      this.player).then(() => {
    }).catch(() => {
      console.log('Error: Player\'s life could not be updated');
    });
  }

  makeMainPlayer(index) {
    this.fetchedGame.players.forEach((player, i) => {
      if (player.main == true) {
        player.main = false;
      }
      if (i == index) {
        player.main = true;
        this.currentMainPlayerIndex = index;
      }
    });
  }
  
}
