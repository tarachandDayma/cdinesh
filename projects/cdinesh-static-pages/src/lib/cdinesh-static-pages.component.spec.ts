import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdineshStaticPagesComponent } from './cdinesh-static-pages.component';

describe('CdineshStaticPagesComponent', () => {
  let component: CdineshStaticPagesComponent;
  let fixture: ComponentFixture<CdineshStaticPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdineshStaticPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdineshStaticPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
