import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInsideInsideComponent } from './dialog-inside-inside.component';

describe('DialogInsideInsideComponent', () => {
  let component: DialogInsideInsideComponent;
  let fixture: ComponentFixture<DialogInsideInsideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogInsideInsideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogInsideInsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
