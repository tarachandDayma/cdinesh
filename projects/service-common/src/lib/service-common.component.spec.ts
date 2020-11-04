import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCommonComponent } from './service-common.component';

describe('ServiceCommonComponent', () => {
  let component: ServiceCommonComponent;
  let fixture: ComponentFixture<ServiceCommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceCommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
