import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineSeparatorComponent } from './line-separator.component';

describe('LineSeparatorComponent', () => {
  let component: LineSeparatorComponent;
  let fixture: ComponentFixture<LineSeparatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineSeparatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineSeparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
