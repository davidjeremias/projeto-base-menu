import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboServiceComponent } from './combo-service.component';

describe('ComboServiceComponent', () => {
  let component: ComboServiceComponent;
  let fixture: ComponentFixture<ComboServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
