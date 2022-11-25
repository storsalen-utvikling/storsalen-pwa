import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefillPageComponent } from './refill-page.component';

describe('RefillPageComponent', () => {
  let component: RefillPageComponent;
  let fixture: ComponentFixture<RefillPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RefillPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RefillPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
