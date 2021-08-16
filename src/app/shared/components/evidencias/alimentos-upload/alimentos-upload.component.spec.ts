import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimentosUploadComponent } from './alimentos-upload.component';

describe('AlimentosUploadComponent', () => {
  let component: AlimentosUploadComponent;
  let fixture: ComponentFixture<AlimentosUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlimentosUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlimentosUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
