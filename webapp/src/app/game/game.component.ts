import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../providers/firebase-database.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Game } from '../../models/game';
import { Player } from '../../models/player';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  title = 'Trascendence';
  fetchedGame: Game;
  gameId;
  currentMainPlayerIndex = 0;
  timeoutHandler;
  player: Player;

  playersWithUpdatedLife = [];

  constructor(private firebaseService: FirebaseService, 
              private af: AngularFireDatabase,
              private router: Router,
              private aroute: ActivatedRoute) {
    
    this.aroute.params.forEach((params: Params) => {
      this.gameId = params['gameId'];
    });

    this.af.object('games/' + this.gameId).snapshotChanges().map(game => {
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
  }

  ngOnInit() {
  }

  showCounter(index, difference) {
    if (this.playersWithUpdatedLife[index] == undefined) {
      this.playersWithUpdatedLife[index] = difference;
    } else {
      this.playersWithUpdatedLife[index] += difference;
    }
    if (this.timeoutHandler != undefined) {
      clearTimeout(this.timeoutHandler);
    }
    this.timeoutHandler = setTimeout(()=>{
      this.updateLife(index, this.playersWithUpdatedLife[index]).then(() => {
        this.playersWithUpdatedLife[index] = undefined;
      }).catch(() => {
        this.playersWithUpdatedLife[index] = undefined;
      });
    }, 500);
  }

  updateLife(index, difference) {
    return new Promise((resolve, reject) => {
      this.player = new Player(this.fetchedGame.players[index].name, 
                               this.fetchedGame.players[index].life + difference);
      this.firebaseService.updatePlayer(this.gameId, index, this.player).then(() => {
        resolve();
      }).catch(() => {
        console.log('Error: Player\'s life could not be updated');
        reject();
      });
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
