import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestOfCDComponent } from './best-of-cd.component';

describe('BestOfCDComponent', () => {
  let component: BestOfCDComponent;
  let fixture: ComponentFixture<BestOfCDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestOfCDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestOfCDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
