import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map,tap } from 'rxjs/operators';
import { Area, Nodal } from '../tmp/classes';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  public updatedFields : object;
  nodal: Nodal[] = [];
  childArray = [];
  parentchild : object;

  constructor(private http: HttpClient) { }

  //Method to get Categories to be displayed in Left NAV
  getCategories(): Observable<object>{
    return this.http.get<object>("http://localhost:8080/rpc/get_categories");
  }

  //Method to get Catalogues to be displayed in Catalogue
  getCataloguesForCategory(cat: string): Observable<object>{
    return this.http.get<object>("http://localhost:8080/rpc/get_catalogues?category=eq."+cat).pipe(tap(data => { 
        //console.log(data); 
        var array = this.generateArray(data); 
        for (let key1 in array) {
          //console.log(array[key1].fields);
          for (let key2 in array[key1].fields) {
            //console.log(key2);
            //Get Special Select Fields
            if(array[key1].fields[key2].special){
              if (array[key1].fields[key2].special.selecttype == 'parent'){

                //Get Parent Dropdown values
                this[array[key1].fields[key2].special.parentfunction]().subscribe(data => { 
                  var tempObj : Array<Object> = [];
                  for (let key in data[0].value) {
                    let value = data[0].value[key];
                    let tempOptions = {"label":value.value,"value":value.id};
                    tempObj.push(tempOptions);
                  }
                  var options = JSON.parse('{"options":'+ JSON.stringify(tempObj) +'}');
                  Object.assign(array[key1].fields[key2],options);
                  //console.log(array);
                  return array;
                },
                err => console.error(err),
                () => console.log('Parent Fields Done!')
                );

                //Get Child 1 Dropdown values
                this[array[key1].fields[key2].special.childfunction]().subscribe(data => { 
                  var tempObj : Array<Object> = [];
                  //console.log('-- child data ---');
                  //console.log(data);
                  for (let key in data[0].value) {
                    let value = data[0].value[key];
                    let tempOptions = {"label":value.value,"value":value.id,"parentid":value.parentid};
                    tempObj.push(tempOptions);
                    //console.log(tempOptions);
                  }
                  var options = JSON.parse('{"childoptions":'+ JSON.stringify(tempObj) +'}');
                  Object.assign(array[key1].fields[key2],options);
                  //console.log(array);
                  return array;
                },
                err => console.error(err),
                () => console.log('Child (1) Fields Done!')
                );


              }
              else if (array[key1].fields[key2].special.selecttype == 'child'){
                //Get Child 2 Dropdown values
                if (array[key1].fields[key2].special.childfunction){
                  this[array[key1].fields[key2].special.childfunction]().subscribe(data => { 
                    var tempObj : Array<Object> = [];
                    //console.log('-- child data ---');
                    //console.log(data);
                    for (let key in data[0].value) {
                      let value = data[0].value[key];
                      let tempOptions = {"label":value.value,"value":value.id,"parentid":value.parentid};
                      tempObj.push(tempOptions);
                      //console.log(tempOptions);
                    }
                    var options = JSON.parse('{"childoptions":'+ JSON.stringify(tempObj) +'}');
                    Object.assign(array[key1].fields[key2],options);
                    //console.log(array);
                    return array;
                  },
                  err => console.error(err),
                  () => console.log('Child (2) Fields Done!')
                  );  
                }
              }
          }
        }
      }
    }));
  }


  // ****************** DROPDOWNS ****************** //
  getShuttleRoute(): Observable<object>{
    return this.http.get<object>("http://localhost:8080/settings?name=eq.shuttle-route");
  }

  getShuttleArea(): Observable<object>{
    return this.http.get<object>("http://localhost:8080/settings?name=eq.shuttle-area");
  }

  getArea(): Observable<object>{
    return this.http.get<object>("http://localhost:8080/settings?name=eq.area");
  }

  getNodal(): Observable<any>{
    return this.http.get<object>("http://localhost:8080/settings?name=eq.nodal");
  }

  getSubNodal(): Observable<any>{
    return this.http.get<object>("http://localhost:8080/settings?name=eq.subnodal");
  }

  // ****************** GENERAL ****************** //
  generateArray(obj){
    return Object.keys(obj).map((key)=>{ return obj[key]});
  }


  /* ****************** NOT USED ******************
  getCatalogues(): Observable<object>{
    return this.http.get<object>("http://localhost:8080/rpc/get_catalogues?main=eq.true&order=name.asc");
  }

  getSubCatalogue(id: number): Observable<object>{
    return this.http.get<object>("http://localhost:8080/rpc/get_catalogues?order=name.asc&subid=eq."+id);
  }

  getCatalogue(id: number): Observable<object>{
    return this.http.get<object>("http://localhost:8080/rpc/get_catalogues?id=eq."+id);
  }

  getCataloguesForCategory(cat: string): Observable<object>{
    return this.http.get<object>("http://localhost:8080/rpc/get_catalogues?category=eq."+cat);
  }
  */

}
