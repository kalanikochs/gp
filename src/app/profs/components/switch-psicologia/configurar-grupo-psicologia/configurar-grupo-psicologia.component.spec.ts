import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfigurarGrupoPsicologiaComponent } from './configurar-grupo-psicologia.component';

describe('ConfigurarGrupoPsicologiaComponent', () => {
  let component: ConfigurarGrupoPsicologiaComponent;
  let fixture: ComponentFixture<ConfigurarGrupoPsicologiaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurarGrupoPsicologiaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigurarGrupoPsicologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
