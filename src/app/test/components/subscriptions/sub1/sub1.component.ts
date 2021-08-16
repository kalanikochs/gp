import { Component, OnInit, OnDestroy } from '@angular/core';
import { HandsetService } from 'src/app/core/services/handset.service';
import { UnsubscribeService } from 'src/app/core/services/unsubscribe.service';
import { Subscription, Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-sub1',
  templateUrl: './sub1.component.html',
  styleUrls: ['./sub1.component.scss']
})
export class Sub1Component implements OnInit, OnDestroy {
  handsetValue: boolean;
  subscriptions = [];
  // sub1;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private handsetService: HandsetService,
    private unsubscribeService: UnsubscribeService
  ) {}

  ngOnInit() {
    /* const sub1 = this.isHandset$.subscribe(val => {
      this.handsetValue = val;
      console.log(this.handsetValue);
    }); */
    const sub1 = this.handsetService.isHandset$.subscribe(val => {
      this.handsetValue = val;
      console.log(this.handsetValue);
    });

    this.subscriptions.push(sub1);
  }

  ngOnDestroy() {
    this.unsubscribeService.unsubscribe(this.subscriptions);
  }
}
