import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTitleComponent } from './list-title.component';

describe('ListTitleComponent', () => {
  let component: ListTitleComponent;
  let fixture: ComponentFixture<ListTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
