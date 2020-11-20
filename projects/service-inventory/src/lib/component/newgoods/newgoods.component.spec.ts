import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewgoodsComponent } from './newgoods.component';

describe('NewgoodsComponent', () => {
  let component: NewgoodsComponent;
  let fixture: ComponentFixture<NewgoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewgoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewgoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
