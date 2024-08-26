import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotnetApiComponent } from './dotnet-api.component';

describe('DotnetApiComponent', () => {
  let component: DotnetApiComponent;
  let fixture: ComponentFixture<DotnetApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DotnetApiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DotnetApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
