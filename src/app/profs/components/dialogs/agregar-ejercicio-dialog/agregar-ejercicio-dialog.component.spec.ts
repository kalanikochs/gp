import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgregarEjercicioDialogComponent } from './agregar-ejercicio-dialog.component';

describe('AgregarEjercicioDialogComponent', () => {
  let component: AgregarEjercicioDialogComponent;
  let fixture: ComponentFixture<AgregarEjercicioDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarEjercicioDialogComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarEjercicioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
