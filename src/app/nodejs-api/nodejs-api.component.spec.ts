import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodejsApiComponent } from './nodejs-api.component';

describe('NodejsApiComponent', () => {
  let component: NodejsApiComponent;
  let fixture: ComponentFixture<NodejsApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NodejsApiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NodejsApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
