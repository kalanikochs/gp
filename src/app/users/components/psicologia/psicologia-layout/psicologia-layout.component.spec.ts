import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsicologiaLayoutComponent } from './psicologia-layout.component';

describe('PsicologiaLayoutComponent', () => {
  let component: PsicologiaLayoutComponent;
  let fixture: ComponentFixture<PsicologiaLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsicologiaLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsicologiaLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
