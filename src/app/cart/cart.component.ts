import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { CookieService } from 'ngx-cookie-service';
import { AlertComponent } from '../alert/alert.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})

export class CartComponent implements OnInit {

  myCart : Array<Object> = [];
  //cartObject : Array<Object> = [];
  cartObject : object;
  cartKeys :  object;
  successMessage : string;
  catalogueDescription : string;
  formDivHeight : number;

  constructor(
    private dialog: MatDialog,
    private cart: CartService, 
    private cookie : CookieService) {
      if (window.screen.width > 450)
        this.formDivHeight = window.innerHeight-50;
  }

  ngOnInit() {
    //this.cookie.deleteAll();
    this.myCart = this.cart.getFromCart();
    console.log(this.myCart); 
  }

  showCartDetails(item: JSON, catalogueDescription){
    this.cartKeys = Object.keys(item);
    this.cartObject = item;
    this.catalogueDescription = catalogueDescription;
  }

  removeFromMyCart(val: object, name: string){
    const dlg = this.dialog.open(AlertComponent, {
      data: {title: 'Confirm Delete', msg: 'Are you sure you want to remove '+ name +' from cart?'}
    });
    dlg.afterClosed().subscribe((remove: boolean) => {
      if (remove) {
        this.cart.removeFromCart(val);
        this.cartObject = null;
        this.successMessage = 'Item has been removed sucessfully.';
      }
    });
  }

  checkout(){
    const dlg = this.dialog.open(AlertComponent, {
      data: {title: 'Confirm Checkout', msg: (this.myCart.length > 1) ? 'Are you sure you want to checkout ' + this.myCart.length + ' items from your cart?' : 'Are you sure you want to checkout 1 item from your cart?'}
    });
    dlg.afterClosed().subscribe((checkout: boolean) => {
      if (checkout) {
        this.cart.addToMyRequests();
        this.myCart = [];
        this.cartObject = null;
        this.successMessage = (this.myCart.length > 1) ? this.myCart.length + ' items have been submitted sucessfully' : 'Item has been submitted sucessfully';
  }
});
}
}
