import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  nCount : number;
  profilePic : string;
  constructor(private cart: CartService,) { 
    this.profilePic = '../../assets/images/profile/user.png';
  }

  ngOnInit() {
    this.cart.cast.subscribe(
      totalItems=>  this.nCount = totalItems);
   }

}
