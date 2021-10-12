import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreacionEjercicioComponent } from './creacion-ejercicio.component';

describe('CreacionEjercicioComponent', () => {
  let component: CreacionEjercicioComponent;
  let fixture: ComponentFixture<CreacionEjercicioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreacionEjercicioComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreacionEjercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
