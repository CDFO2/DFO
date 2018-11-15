import { Component, OnInit } from '@angular/core';
import { Area, Nodal } from './classes';
import { DropDownService} from './dropdown.service';
import { CatalogueService } from '../catalog/catalog.service';
import { Observable } from 'rxjs';
import { map,tap,filter } from 'rxjs/operators';

@Component({
  selector: 'app-tmp',
  templateUrl: './tmp.component.html',
  styleUrls: ['./tmp.component.css']
})
export class TmpComponent implements OnInit {

  selectedCountry:Area = new Area(0, 'India'); 
  area: Area[];
  nodal: Nodal[] = [];
  fullNodal: Nodal[] = [];

  constructor(private dropdown: DropDownService, private catalogueService: CatalogueService) {}
  
  onSelect(areaid) {
    this.nodal = [];
    for(let i in this.fullNodal){
      for(let j in this.fullNodal[i]){
        var obj = this.fullNodal[i][j];
        if (obj.parentid == areaid)
          this.nodal.push(obj);
      }
    } 
  }

  ngOnInit(){
    this.catalogueService.getArea().subscribe(data => {
      this.area = data[0].value;
    });
    this.catalogueService.getNodal().subscribe(data => {
      this.fullNodal.push(data);
      //console.log(this.fullNodal);
    });
  }
}
