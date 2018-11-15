import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  formDivHeight : number;
  profilePic : string;
  modify : boolean;

  constructor() { 
    this.profilePic = '../../assets/images/profile/user.png';
    if (window.screen.width > 450)
      this.formDivHeight = window.innerHeight-50;    
  }

  ngOnInit() {
  }

  onModify(){
    this.modify = true;
  }
}
