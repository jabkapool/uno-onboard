import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDashboardsComponent } from './list-dashboards.component';

describe('ListDashboardsComponent', () => {
  let component: ListDashboardsComponent;
  let fixture: ComponentFixture<ListDashboardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDashboardsComponent]
    });
    fixture = TestBed.createComponent(ListDashboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
