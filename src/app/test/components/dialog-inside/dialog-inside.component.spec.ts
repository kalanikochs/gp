import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInsideComponent } from './dialog-inside.component';

describe('DialogInsideComponent', () => {
  let component: DialogInsideComponent;
  let fixture: ComponentFixture<DialogInsideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogInsideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogInsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
