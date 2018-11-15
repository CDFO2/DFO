//Cab Area
export class Area {
  constructor(public id: number, public name: string) { }
}

//Cab Nodal Points
export class Nodal {
  constructor(public id: number, public parentid: number, public name: string) { }
}
