import {Component, OnInit} from '@angular/core';
import {User} from "../../core/models/user";
import {ProfileService} from "../../core/services/profile.service";
import {Role} from "../../core/models/role";
import {SecurityService} from "../../core/services/security.service";
import {Imaged} from "../../core/models/imaged";
import {Image} from "../../core/models/image";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})

export class ViewProfile implements OnInit {
  userData: User;
  id: number;
  role: Role;
  roleEnum = Role;
  isOwn: boolean;
  isFriend: boolean;
  visitorId: number;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private securityService: SecurityService
  ) {
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('userId'));
    if (this.id) {
      this.visitorId = this.securityService.getCurrentId();
      if (this.visitorId != this.id) this.isOwn = false;
      else this.isOwn = true;
      this.profileService.checkFriendship(this.id, this.visitorId).subscribe(data => {
        this.isFriend = data;
        console.log(data);
      });
    } else {
      this.id = this.securityService.getCurrentId();
      this.isOwn = true;
    }
    this.getUser();
  }

  private getUser() {
    console.log(this.id);
    this.profileService.getUser(this.id).subscribe(data => {
      this.userData = data;
      this.role = this.securityService.getCurrentRole();
    });
  }

  processFile(imageInput: any, imaged: Imaged) {
    //this.id=this.securityService.getCurrentId();
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      imaged.image.src = event.target.result.substring(23);
      this.profileService.putImage(file).subscribe(
        id => {
          console.log("id=" + id);
          if (typeof id === "number") {
            imaged.imageId = id;
          }
        },
        error => {
          imaged.image.src = null;
          console.log(error);
        });
    });

    reader.readAsDataURL(file);
  }

  friendship() {
    if (this.isFriend)
      this.profileService.removeFriend(this.visitorId, this.id).subscribe(data => {
        this.isFriend = false;
      });
    else
      this.profileService.addFriend(this.visitorId, this.id).subscribe(data => {
        this.isFriend = true
      });
  }
}
