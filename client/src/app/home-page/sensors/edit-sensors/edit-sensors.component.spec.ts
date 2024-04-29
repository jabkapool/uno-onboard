import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSensorsComponent } from './edit-sensors.component';

describe('EditSensorsComponent', () => {
  let component: EditSensorsComponent;
  let fixture: ComponentFixture<EditSensorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSensorsComponent]
    });
    fixture = TestBed.createComponent(EditSensorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
