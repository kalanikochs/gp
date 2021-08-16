import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/core/services/test.service';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.scss']
})
export class ObservableComponent implements OnInit {
  textoObservado$;

  constructor(private testService: TestService) {
    this.testService.obs$.subscribe(texto => {
      this.textoObservado$ = texto;
    });
  }

  ngOnInit() {}
}
