import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PotreeComponent } from './potree.component';

describe('PotreeComponent', () => {
  let component: PotreeComponent;
  let fixture: ComponentFixture<PotreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PotreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PotreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
