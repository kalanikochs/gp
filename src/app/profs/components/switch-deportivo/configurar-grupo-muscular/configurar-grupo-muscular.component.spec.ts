import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfigurarGrupoMuscularComponent } from './configurar-grupo-muscular.component';

describe('ConfigurarGrupoMuscularComponent', () => {
  let component: ConfigurarGrupoMuscularComponent;
  let fixture: ComponentFixture<ConfigurarGrupoMuscularComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurarGrupoMuscularComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigurarGrupoMuscularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
