import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  myRequests : Array<Object> = [];
  cartKeys : object;
  cartObject : object;
  catalogueDescription : string;
  catID : number;
  formDivHeight : number;
  Math : Math;

  constructor(
    private cart: CartService, 
    private cookie : CookieService,
    private elRef: ElementRef, 
    private renderer: Renderer2){    
      if (window.screen.width > 450)
        this.formDivHeight = window.innerHeight-50;
    }

  ngOnInit() {
    //this.cookie.deleteAll();
    this.myRequests = this.cart.getMyRequests();
    console.log(this.myRequests); 
  }

  showReqDetails(item: JSON, id, catalogueDescription){
    this.cartKeys = Object.keys(item);
    this.cartObject = item;
    this.catID = id;
    this.catalogueDescription = catalogueDescription;
  }

}
