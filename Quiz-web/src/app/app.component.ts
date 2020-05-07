import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web';
  isOpened: boolean = false;

  onSidebarClick() {
    this.isOpened = !this.isOpened;
  }
  greeting : any;
  handleMessage(message){
    this.greeting = message;
  }
}
