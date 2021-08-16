import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsicologiaHomeComponent } from './psicologia-home.component';

describe('PsicologiaHomeComponent', () => {
  let component: PsicologiaHomeComponent;
  let fixture: ComponentFixture<PsicologiaHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsicologiaHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsicologiaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
