import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModificarFechaCitaDialogComponent } from './modificar-fecha-cita-dialog.component';

describe('ModificarFechaCitaDialogComponent', () => {
  let component: ModificarFechaCitaDialogComponent;
  let fixture: ComponentFixture<ModificarFechaCitaDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarFechaCitaDialogComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarFechaCitaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
