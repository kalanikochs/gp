import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SwitchMedicoLayoutComponent } from './switch-medico-layout.component';

describe('SwitchMedicoLayoutComponent', () => {
  let component: SwitchMedicoLayoutComponent;
  let fixture: ComponentFixture<SwitchMedicoLayoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchMedicoLayoutComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchMedicoLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
