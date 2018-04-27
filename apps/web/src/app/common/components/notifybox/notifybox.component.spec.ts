import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyboxComponent } from './notifybox.component';

describe('NotifyboxComponent', () => {
  let component: NotifyboxComponent;
  let fixture: ComponentFixture<NotifyboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotifyboxComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifyboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
