import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigMouthWebTestComponent } from './big-mouth-web-test.component';

describe('BigMouthWebTestComponent', () => {
  let component: BigMouthWebTestComponent;
  let fixture: ComponentFixture<BigMouthWebTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BigMouthWebTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BigMouthWebTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
