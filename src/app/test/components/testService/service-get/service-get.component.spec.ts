import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceGetComponent } from './service-get.component';

describe('ServiceGetComponent', () => {
  let component: ServiceGetComponent;
  let fixture: ComponentFixture<ServiceGetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceGetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
