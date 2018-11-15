import { Injectable } from '@angular/core';
import { Area, Nodal } from './classes';

@Injectable()
export class DropDownService {
  getArea() {
    return [
     new Area(1, 'USA' ),
     new Area(2, 'India' ),
     new Area(3, 'Australia' )
    ];
  }
  
  getNordal() {
   return [
     new Nodal(1, 1, 'Arizona' ),
     new Nodal(2, 1, 'Alaska' ),
     new Nodal(3, 1, 'Florida'),
     new Nodal(4, 1, 'Hawaii'),
     new Nodal(5, 2, 'Gujarat' ),
     new Nodal(6, 2, 'Goa'),
     new Nodal(7, 2, 'Punjab' ),
     new Nodal(8, 3, 'Queensland' ),
     new Nodal(9, 3, 'South Australia' ),
     new Nodal(10, 3, 'Tasmania')
    ];
  }
}
