import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SwitchPsicologiaLayoutComponent } from './switch-psicologia-layout.component';

describe('SwitchPsicologiaLayoutComponent', () => {
  let component: SwitchPsicologiaLayoutComponent;
  let fixture: ComponentFixture<SwitchPsicologiaLayoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchPsicologiaLayoutComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchPsicologiaLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
