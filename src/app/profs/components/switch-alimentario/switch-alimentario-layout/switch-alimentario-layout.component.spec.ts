import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SwitchAlimentarioLayoutComponent } from './switch-alimentario-layout.component';

describe('SwitchAlimentarioLayoutComponent', () => {
  let component: SwitchAlimentarioLayoutComponent;
  let fixture: ComponentFixture<SwitchAlimentarioLayoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchAlimentarioLayoutComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchAlimentarioLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
