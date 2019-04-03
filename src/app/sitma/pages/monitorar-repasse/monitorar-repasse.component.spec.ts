import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorarRepasseComponent } from './monitorar-repasse.component';

describe('MonitorarRepasseComponent', () => {
  let component: MonitorarRepasseComponent;
  let fixture: ComponentFixture<MonitorarRepasseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorarRepasseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorarRepasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
