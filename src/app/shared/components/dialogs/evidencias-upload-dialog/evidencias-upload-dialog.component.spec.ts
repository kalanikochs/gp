import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenciasUploadDialogComponent } from './evidencias-upload-dialog.component';

describe('EvidenciasUploadDialogComponent', () => {
  let component: EvidenciasUploadDialogComponent;
  let fixture: ComponentFixture<EvidenciasUploadDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvidenciasUploadDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidenciasUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
