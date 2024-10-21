import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeShareInfoService {
  public stringVar = new Subject<string> ();

  setValue(value : string){
    this.stringVar.next(value);
  }
  getObservable(): Subject<string> {
    return this.stringVar;
  }
}
