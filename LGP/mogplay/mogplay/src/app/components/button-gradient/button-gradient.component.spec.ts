import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonGradientComponent } from './button-gradient.component';

describe('ButtonGradientComponent', () => {
  let component: ButtonGradientComponent;
  let fixture: ComponentFixture<ButtonGradientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonGradientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonGradientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
