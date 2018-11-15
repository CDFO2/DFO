import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogueService } from '../catalog/catalog.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {

  categories: object;
  constructor(private router: Router, private catalogueService: CatalogueService) { }

  private _opened: boolean = false;
 
  private _toggleSidebar() {
    this._opened = !this._opened;
  }

  ngOnInit() {
  }

  minimizeAll(){
    this.categories = null;
  }

  isActive(viewLocation){
    let url = this.router.url;
    //console.log('****'+ viewLocation + ' = ' + url + ' = ' +url.indexOf(viewLocation).toString());
    if (url.indexOf(viewLocation) == 0){
      if (viewLocation == '/catalogue' && !this.categories){
        this.getCategory();
      }
      return true;
    }
    else{
      return false;
    }
  }

  getCategory(){
    this.catalogueService.getCategories().subscribe(data => {
      this.categories = data;
      //console.log(this.categories);
    });
  }

}
