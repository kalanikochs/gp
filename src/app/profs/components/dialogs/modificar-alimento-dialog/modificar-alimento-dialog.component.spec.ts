import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModificarAlimentoDialogComponent } from './modificar-alimento-dialog.component';

describe('ModificarAlimentoDialogComponent', () => {
  let component: ModificarAlimentoDialogComponent;
  let fixture: ComponentFixture<ModificarAlimentoDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarAlimentoDialogComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarAlimentoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
