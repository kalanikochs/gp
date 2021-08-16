import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfigurarSwitchAlimentarioComponent } from './configurar-switch-alimentario.component';

describe('ConfigurarSwitchAlimentarioComponent', () => {
  let component: ConfigurarSwitchAlimentarioComponent;
  let fixture: ComponentFixture<ConfigurarSwitchAlimentarioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurarSwitchAlimentarioComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigurarSwitchAlimentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
