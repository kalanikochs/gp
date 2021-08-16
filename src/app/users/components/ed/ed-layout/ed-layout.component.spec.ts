import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdLayoutComponent } from './ed-layout.component';

describe('EdLayoutComponent', () => {
  let component: EdLayoutComponent;
  let fixture: ComponentFixture<EdLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
