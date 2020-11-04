import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestActivationComponent } from './guest-activation.component';

describe('GuestActivationComponent', () => {
  let component: GuestActivationComponent;
  let fixture: ComponentFixture<GuestActivationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestActivationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
