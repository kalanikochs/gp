import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SadminsHomeComponent } from './sadmins-home.component';

describe('SadminsHomeComponent', () => {
  let component: SadminsHomeComponent;
  let fixture: ComponentFixture<SadminsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SadminsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SadminsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
