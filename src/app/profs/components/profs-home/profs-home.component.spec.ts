import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfsHomeComponent } from './profs-home.component';

describe('ProfsHomeComponent', () => {
  let component: ProfsHomeComponent;
  let fixture: ComponentFixture<ProfsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
