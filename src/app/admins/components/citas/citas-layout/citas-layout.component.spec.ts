import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasLayoutComponent } from './citas-layout.component';

describe('CitasLayoutComponent', () => {
  let component: CitasLayoutComponent;
  let fixture: ComponentFixture<CitasLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitasLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
