import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModificarPsicologiaDialogComponent } from './modificar-psicologia-dialog.component';

describe('ModificarPsicologiaDialogComponent', () => {
  let component: ModificarPsicologiaDialogComponent;
  let fixture: ComponentFixture<ModificarPsicologiaDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarPsicologiaDialogComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarPsicologiaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
