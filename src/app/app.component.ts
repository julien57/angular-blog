import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
    var config = {
      apiKey: "AIzaSyDp36KgX089z-RqyTnJpe7Zmr1o8wKBSzA",
      authDomain: "blog-60f89.firebaseapp.com",
      databaseURL: "https://blog-60f89.firebaseio.com",
      projectId: "blog-60f89",
      storageBucket: "blog-60f89.appspot.com",
      messagingSenderId: "698081127854"
    };
    firebase.initializeApp(config);
  }
}
