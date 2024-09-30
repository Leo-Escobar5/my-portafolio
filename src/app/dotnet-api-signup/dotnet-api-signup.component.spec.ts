import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotnetApiSignupComponent } from './dotnet-api-signup.component';

describe('DotnetApiSignupComponent', () => {
  let component: DotnetApiSignupComponent;
  let fixture: ComponentFixture<DotnetApiSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DotnetApiSignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DotnetApiSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
