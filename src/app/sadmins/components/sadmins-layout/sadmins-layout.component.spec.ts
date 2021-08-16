import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SadminsLayoutComponent } from './sadmins-layout.component';

describe('SadminsLayoutComponent', () => {
  let component: SadminsLayoutComponent;
  let fixture: ComponentFixture<SadminsLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SadminsLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SadminsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
