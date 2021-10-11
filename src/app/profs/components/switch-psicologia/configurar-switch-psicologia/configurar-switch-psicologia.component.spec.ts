import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfigurarSwitchPsicologiaComponent } from './configurar-switch-psicologia.component';

describe('ConfigurarSwitchPsicologiaComponent', () => {
  let component: ConfigurarSwitchPsicologiaComponent;
  let fixture: ComponentFixture<ConfigurarSwitchPsicologiaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurarSwitchPsicologiaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigurarSwitchPsicologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
