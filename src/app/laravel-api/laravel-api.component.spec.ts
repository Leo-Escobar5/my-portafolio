import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaravelApiComponent } from './laravel-api.component';

describe('LaravelApiComponent', () => {
  let component: LaravelApiComponent;
  let fixture: ComponentFixture<LaravelApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaravelApiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaravelApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
