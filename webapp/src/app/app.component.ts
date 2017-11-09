import { Component } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FirebaseService } from './providers/firebase-database.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FirebaseService]
})
export class AppComponent {
  title = 'Trascendence';
  
}
