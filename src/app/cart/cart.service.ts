import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CartService{

  jsonObj : Object;
  cookieCart : string;
  cookieReq : string;
  public counter : number = 1;
  myCart : Array<Object> = [];
  myRequests : Array<Object> = [];
  private Count = new BehaviorSubject<number>(0);
  cast = this.Count.asObservable();

  constructor(private cookie : CookieService){}

  /*  Lifecycle hooks, like OnInit() work with Directives and Components. 
      They do not work with other types, like a service.
  */

  addToCart(val: object){
    this.myCart.push(val);
    this.cookie.set('myCart',JSON.stringify(this.myCart),5);
    this.Count.next(this.myCart.length);
  }

  removeFromCart(val: object){
    this.myCart.splice(this.myCart.indexOf(val),1);
    //this.cookie.delete('myCart');
    this.cookie.set('myCart',JSON.stringify(this.myCart),5);
    this.Count.next(this.myCart.length);
  }
  
  getFromCart(){
    if (this.cookie.check('myCart') && this.myCart.length == 0){
      this.myCart = [];
      this.jsonObj = JSON.parse(this.cookie.get('myCart'));
      //console.log('Get: '+ this.cookie.get('myCart'));
      for(var obj in this.jsonObj){
        this.myCart.push(this.jsonObj[obj]);
        //console.log(this.jsonObj[obj]);
      }
    }
    return this.myCart;
  }

  addToMyRequests(){
    this.cookieCart = this.cookie.get('myCart');
    this.cookieReq = this.cookie.get('myRequests');
    this.myRequests = [];
    if (this.cookie.check('myRequests'))
    {
      //Loop through Request Cookie 
      var jsonObj1 = JSON.parse(this.cookieReq);
      for(var obj in jsonObj1){
        this.myRequests.push(jsonObj1[obj]);
      }
      //Loop through Cart Cookie 
      var jsonObj2 = JSON.parse(this.cookieCart);
      for(var obj in jsonObj2){
        let tempObj = {
          "submittedDate" : new Date()
         };
        Object.assign(jsonObj2[obj], tempObj);
        this.myRequests.push(jsonObj2[obj]);
      }
    }
    else{
      var jsonObj = JSON.parse(this.cookieCart);
      for(var obj in jsonObj){
        let tempObj = {
          "submittedDate" : new Date()
         };
        Object.assign(jsonObj[obj], tempObj);
        this.myRequests.push(jsonObj[obj]);
      }
    }
    //this.cookie.delete('myRequests');
    this.cookie.set('myRequests',JSON.stringify(this.myRequests),365);
    this.cookie.delete('myCart');
    this.myCart = [];
    this.Count.next(this.myCart.length);
  }

  getMyRequests(){
    if (this.cookie.check('myRequests') && this.myRequests.length == 0){
      var jsonObj = JSON.parse(this.cookie.get('myRequests'));
      //console.log('My Reqs : '+ this.cookie.get('myRequests'));
      for(var obj in jsonObj){
        this.myRequests.push(jsonObj[obj]);
      }
    }
    return this.myRequests;
  }

}