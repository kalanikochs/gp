import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModificarEjercicioDialogComponent } from './modificar-ejercicio-dialog.component';

describe('ModificarEjercicioDialogComponent', () => {
  let component: ModificarEjercicioDialogComponent;
  let fixture: ComponentFixture<ModificarEjercicioDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarEjercicioDialogComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarEjercicioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
