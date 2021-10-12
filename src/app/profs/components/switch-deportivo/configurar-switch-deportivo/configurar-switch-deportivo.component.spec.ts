import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfigurarSwitchDeportivoComponent } from './configurar-switch-deportivo.component';

describe('ConfigurarSwitchDeportivoComponent', () => {
  let component: ConfigurarSwitchDeportivoComponent;
  let fixture: ComponentFixture<ConfigurarSwitchDeportivoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurarSwitchDeportivoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigurarSwitchDeportivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
