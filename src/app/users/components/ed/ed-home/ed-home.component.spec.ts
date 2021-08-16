import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdHomeComponent } from './ed-home.component';

describe('EdHomeComponent', () => {
  let component: EdHomeComponent;
  let fixture: ComponentFixture<EdHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
