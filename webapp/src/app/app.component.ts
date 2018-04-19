import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
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
  gameId;

  createGameDev = false;

  constructor(private firebaseService: FirebaseService, 
              private af: AngularFireDatabase,
              private router: Router) {
    var gameId = '-Kyn9HofQVqaBM7mAiAj';

    router.navigate([`game/${gameId}`]);

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
}
