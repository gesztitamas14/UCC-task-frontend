import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpdeskPageComponent } from './helpdesk-page.component';

describe('HelpdeskPageComponent', () => {
  let component: HelpdeskPageComponent;
  let fixture: ComponentFixture<HelpdeskPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpdeskPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpdeskPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
