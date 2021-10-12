import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfigurarGrupoMedicoComponent } from './configurar-grupo-medico.component';

describe('ConfigurarGrupoMedicoComponent', () => {
  let component: ConfigurarGrupoMedicoComponent;
  let fixture: ComponentFixture<ConfigurarGrupoMedicoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurarGrupoMedicoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigurarGrupoMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
