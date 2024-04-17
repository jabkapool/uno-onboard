import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSensorsComponent } from './create-sensors.component';

describe('CreateSensorsComponent', () => {
  let component: CreateSensorsComponent;
  let fixture: ComponentFixture<CreateSensorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSensorsComponent]
    });
    fixture = TestBed.createComponent(CreateSensorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
