import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EvidenciasUploadMobileDialogComponent } from './evidencias-upload-mobile-dialog.component';

describe('EvidenciasUploadMobileDialogComponent', () => {
  let component: EvidenciasUploadMobileDialogComponent;
  let fixture: ComponentFixture<EvidenciasUploadMobileDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvidenciasUploadMobileDialogComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EvidenciasUploadMobileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
