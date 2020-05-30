import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SecurityService} from "../../../core/services/security.service";
import {PlayGameService} from "../../../core/services/play-game.service";
import {User} from "../../../core/models/user";
import {UserDto} from "../../../core/models/userDto";
import {ProfileService} from "../../../core/services/profile.service";


@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.css']
})
export class WaitingRoomComponent implements OnInit {

  @Input() players: String[];

  @Output()
  public startGame: EventEmitter<any> = new EventEmitter();

  @Input()
  currentUser: UserDto;

  @Input()
  hostId: number;

  @Input()
  image: string;

  gameId: string = this.route.snapshot.paramMap.get('gameId');

  public invitation: boolean = false;
  public isLoaded: boolean = false;
  selectedFriend: User;
  friends: User[] = [];

  constructor(public route: ActivatedRoute,
              public profileService:ProfileService,
              public playGameService:PlayGameService) {
  }

  ngOnInit(): void {
  }

  copy(divElement) {
    divElement.select();
    document.execCommand('copy');
    divElement.setSelectionRange(0, 0);
  }

  start() {
    this.startGame.emit();
  }

  loadFriends() {
    if (!this.isLoaded) {
      this.profileService.getFriends(this.currentUser.registerId)
        .subscribe(
          friends => {
            this.friends = friends;
            this.isLoaded = true;
          })
    }
  }

  onChange(value: string) {
    this.selectedFriend = this.friends.filter(value1 => value1.login == value)[0];
  }

  inviteFriend() {
    if (this.selectedFriend) {
      this.playGameService.inviteToGame(this.selectedFriend, this.gameId)
        .subscribe(
          data => {
            this.invitation = false;
          }
        );
    }
  }

}
