import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModificarMedicinaDialogComponent } from './modificar-medicina-dialog.component';

describe('ModificarMedicinaDialogComponent', () => {
  let component: ModificarMedicinaDialogComponent;
  let fixture: ComponentFixture<ModificarMedicinaDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarMedicinaDialogComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarMedicinaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
