import { Component, OnInit } from '@angular/core';
import { CatalogueService } from './catalog.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { Http, Response, Headers, RequestOptions, ResponseContentType, RequestMethod  } from '@angular/http';
import { map,catchError } from 'rxjs/operators'; 
import { CartService } from '../cart/cart.service';
import { AlertComponent } from '../alert/alert.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})

export class CatalogComponent implements OnInit {

  objectProps;
  dataObject;
  dataObject2 : object;
  catID : number;
  form : FormGroup;
  categoryName : string;
  selectedIcon : string;
  formDivHeight : number;
  catalogueName : string;
  buttonClicked :string;
  successMessage : string;
  catalogueDescription : string;
  shuttleRoute : object;
  shuttleArea : object;
  catalogues: object;
  firstSubCatalogues: object;
  secondSubCatalogues: object;
  thirdSubCatalogues: object;
  childOptions1 : Array<object>;
  childOptions2 : Array<object>;

  //Regx Patterns for Validations
  emailPattern : string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; 
  phonePattern : string = "^[6-9]{1}[0-9]{9}$";

  constructor(
    private http : Http, 
    private cart : CartService,
    private dialog: MatDialog,
    private route : ActivatedRoute, 
    private catalogueService : CatalogueService){
      if (window.screen.width > 450)
        this.formDivHeight = window.innerHeight-50;}

  //Initialize
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      if(params['category'] != undefined){
        this.categoryName = params['category'];
        this.catalogueDescription = null;
        this.catalogueService.getCataloguesForCategory(this.categoryName).subscribe(data => {
          this.catalogues = data;
          //console.log(this.catalogues);
        })
      }
    });
  }

  //Method to Confirm Form reset
  resetForm(name: string){
    const dlg = this.dialog.open(AlertComponent, {
      data: {title: 'Confirm Reset', msg: 'Are you sure you want to reset '+ name +' form?'}
    });
    dlg.afterClosed().subscribe((reset: boolean) => {
      if (reset) {
        this.form.reset();
      }
    });
  }

  //Method to Convert JSON Form data to actual Form Elements
  getCatalogueForm(id: number, name: string, description: string, fields: object, icon: string){
    this.catID = id;
    this.successMessage = null;
    this.catalogueName = name;
    this.catalogueDescription = description;
    this.selectedIcon = icon;
    this.dataObject = fields;
    //console.log(fields);
    this.objectProps = Object.keys(this.dataObject).map(prop => {
      return Object.assign({}, { key: prop }, this.dataObject[prop]);
    });

    const formGroup = {};
    var tmpAssign : object;
    for (let prop of Object.keys(this.dataObject)) {
      formGroup[prop] = new FormControl(this.dataObject[prop].value || '', this.mapValidators(this.dataObject[prop].validation));
    }
    this.form = new FormGroup(formGroup);
  }

  //Method for setting Validation for Form Fields
  private mapValidators(validators) {
    const formValidators = [];
    if (validators) {
      for (const validation of Object.keys(validators)) {
        if (validation === 'required') {
          formValidators.push(Validators.required);
        } else if (validation === 'min') {
          formValidators.push(Validators.min(validators[validation]));
        }
      }
    }

    return formValidators;
  }

  //Method to submit the form and Add to Cart
  onSubmit(form) {
    let tempObj = {
      "id" : this.catID,
      "catalogueName" : this.catalogueName,
      "catalogueDescription": this.catalogueDescription,
      "icon" : this.selectedIcon
     };
    Object.assign(form, tempObj);
    this.cart.addToCart(form);
    this.successMessage = name + ': Added to cart successfully.';
  }

  //Method to fetch Child Options on Parent Dropdown change
  onParentSelect(childId,childoptions) {
    this.childOptions1 = [];
    for(let option in childoptions){
      if (childoptions[option].parentid == childId){
        this.childOptions1.push(childoptions[option]);  
      }
    } 
    //console.log(this.childOptions);
  }

  //Method to fetch Child Options on Parent Dropdown change
  onChildSelect(childId,childoptions) {
    this.childOptions2 = [];
    for(let option in childoptions){
      if (childoptions[option].parentid == childId){
        this.childOptions2.push(childoptions[option]);  
      }
    } 
    //console.log(this.childOptions2);
  }

  /* ************* TO BE USED ***************
  public post(data: string): Observable<any> {
    let postUrl = 'http://localhost:8080/rpc/addtocart';

    const options = new RequestOptions({
      headers: new Headers({'Content-Type':'application/json'}),
      method: RequestMethod.Post,
      url:postUrl,
      responseType: ResponseContentType.Json,
      withCredentials: false,
      
    });

    return this.http.post(postUrl, JSON.stringify({
      data: data}), options)
      .pipe(map(this.handleData),catchError(this.handleError));
  }

  private handleData(res: Response){
    let body = res.json();
    return body;
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
  */

}
