import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPersonaDialogComponent } from './ver-persona-dialog.component';

describe('VerPersonaDialogComponent', () => {
  let component: VerPersonaDialogComponent;
  let fixture: ComponentFixture<VerPersonaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerPersonaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPersonaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
