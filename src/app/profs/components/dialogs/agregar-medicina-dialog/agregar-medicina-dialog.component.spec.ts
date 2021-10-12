import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgregarMedicinaDialogComponent } from './agregar-medicina-dialog.component';

describe('AgregarMedicinaDialogComponent', () => {
  let component: AgregarMedicinaDialogComponent;
  let fixture: ComponentFixture<AgregarMedicinaDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarMedicinaDialogComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarMedicinaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
