import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceInventoryComponent } from './service-inventory.component';

describe('ServiceInventoryComponent', () => {
  let component: ServiceInventoryComponent;
  let fixture: ComponentFixture<ServiceInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
