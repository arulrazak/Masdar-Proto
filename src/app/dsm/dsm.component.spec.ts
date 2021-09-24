import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DsmComponent } from './dsm.component';

describe('DsmComponent', () => {
  let component: DsmComponent;
  let fixture: ComponentFixture<DsmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
