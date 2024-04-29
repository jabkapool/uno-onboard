import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSensorsComponent } from './list-sensors.component';

describe('ListSensorsComponent', () => {
  let component: ListSensorsComponent;
  let fixture: ComponentFixture<ListSensorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSensorsComponent]
    });
    fixture = TestBed.createComponent(ListSensorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
