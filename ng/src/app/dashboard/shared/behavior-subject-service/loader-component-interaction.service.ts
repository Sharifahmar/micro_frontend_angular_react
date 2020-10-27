import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderComponentService {

  private emitChangeSource  = new BehaviorSubject<boolean>(false);
  changeEmitted = this.emitChangeSource.asObservable();

  constructor() { }

  emitChange(object: any) {
    this.emitChangeSource.next(object);
  }

}
