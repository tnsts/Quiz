import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.css']
})
export class WaitingRoomComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  copy(divElement){
    divElement.select();
    document.execCommand('copy');
    divElement.setSelectionRange(0, 0);
  }
}