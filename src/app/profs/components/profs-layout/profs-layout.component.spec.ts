import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfsLayoutComponent } from './profs-layout.component';

describe('ProfsLayoutComponent', () => {
  let component: ProfsLayoutComponent;
  let fixture: ComponentFixture<ProfsLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfsLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
