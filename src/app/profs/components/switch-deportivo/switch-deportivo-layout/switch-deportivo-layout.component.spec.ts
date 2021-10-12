import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SwitchDeportivoLayoutComponent } from './switch-deportivo-layout.component';

describe('SwitchDeportivoLayoutComponent', () => {
  let component: SwitchDeportivoLayoutComponent;
  let fixture: ComponentFixture<SwitchDeportivoLayoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchDeportivoLayoutComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchDeportivoLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
