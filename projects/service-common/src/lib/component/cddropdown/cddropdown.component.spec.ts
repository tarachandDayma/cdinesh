import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CDDropdownComponent } from './cddropdown.component';

describe('CDDropdownComponent', () => {
  let component: CDDropdownComponent;
  let fixture: ComponentFixture<CDDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CDDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CDDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
