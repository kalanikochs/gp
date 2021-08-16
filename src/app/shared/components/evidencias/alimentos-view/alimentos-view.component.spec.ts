import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimentosViewComponent } from './alimentos-view.component';

describe('AlimentosViewComponent', () => {
  let component: AlimentosViewComponent;
  let fixture: ComponentFixture<AlimentosViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlimentosViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlimentosViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
