import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgregarAlimentoDialogComponent } from './agregar-alimento-dialog.component';

describe('AgregarAlimentoDialogComponent', () => {
  let component: AgregarAlimentoDialogComponent;
  let fixture: ComponentFixture<AgregarAlimentoDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarAlimentoDialogComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarAlimentoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
