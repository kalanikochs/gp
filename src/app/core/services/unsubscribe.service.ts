import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnsubscribeService {
  constructor() {}

  unsubscribe = (subs: Array<Subscription>) => {
    subs.forEach(el => {
      el.unsubscribe();
    });
  }
}
