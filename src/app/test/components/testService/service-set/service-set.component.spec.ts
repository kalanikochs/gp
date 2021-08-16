import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSetComponent } from './service-set.component';

describe('ServiceSetComponent', () => {
  let component: ServiceSetComponent;
  let fixture: ComponentFixture<ServiceSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
