import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsLayoutComponent } from './admins-layout.component';

describe('AdminsLayoutComponent', () => {
  let component: AdminsLayoutComponent;
  let fixture: ComponentFixture<AdminsLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminsLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
