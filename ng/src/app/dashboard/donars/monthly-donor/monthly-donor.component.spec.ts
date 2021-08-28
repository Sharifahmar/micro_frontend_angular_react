import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyDonorComponent } from './monthly-donor.component';

describe('MonthlyDonorComponent', () => {
  let component: MonthlyDonorComponent;
  let fixture: ComponentFixture<MonthlyDonorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyDonorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyDonorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
