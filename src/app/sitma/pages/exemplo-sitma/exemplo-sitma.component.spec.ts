import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemploSitmaComponent } from './exemplo-sitma.component';

describe('ExemploSitmaComponent', () => {
  let component: ExemploSitmaComponent;
  let fixture: ComponentFixture<ExemploSitmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExemploSitmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExemploSitmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
