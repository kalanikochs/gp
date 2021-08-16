import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SwitchAlimentosDialogComponent } from './switch-alimentos-dialog.component';

describe('SwitchAlimentosDialogComponent', () => {
  let component: SwitchAlimentosDialogComponent;
  let fixture: ComponentFixture<SwitchAlimentosDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchAlimentosDialogComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchAlimentosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
