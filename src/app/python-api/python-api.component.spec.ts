import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PythonApiComponent } from './python-api.component';

describe('PythonApiComponent', () => {
  let component: PythonApiComponent;
  let fixture: ComponentFixture<PythonApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PythonApiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PythonApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
