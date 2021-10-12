import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfigurarSwitchMedicoComponent } from './configurar-switch-medico.component';

describe('ConfigurarSwitchMedicoComponent', () => {
  let component: ConfigurarSwitchMedicoComponent;
  let fixture: ComponentFixture<ConfigurarSwitchMedicoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurarSwitchMedicoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigurarSwitchMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
