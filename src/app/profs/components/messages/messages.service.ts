import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class MessageSevices{
    public notificationsURL = 'http://localhost:4200/profs/messages';
    constructor(
        private _http: HttpClient
    ){

    }
    postSubscription(sub: PushSubscription){
        return this._http.post(this.notificationsURL, sub).pipe
    }
}
