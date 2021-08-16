import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarCitasDialogComponent } from './solicitar-citas-dialog.component';

describe('SolicitarCitasDialogComponent', () => {
  let component: SolicitarCitasDialogComponent;
  let fixture: ComponentFixture<SolicitarCitasDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitarCitasDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarCitasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
