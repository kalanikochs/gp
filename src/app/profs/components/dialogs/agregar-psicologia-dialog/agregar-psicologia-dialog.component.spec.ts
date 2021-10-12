import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgregarPsicologiaDialogComponent } from './agregar-psicologia-dialog.component';

describe('AgregarPsicologiaDialogComponent', () => {
  let component: AgregarPsicologiaDialogComponent;
  let fixture: ComponentFixture<AgregarPsicologiaDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarPsicologiaDialogComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarPsicologiaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
