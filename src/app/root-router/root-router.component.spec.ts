import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootRouterComponent } from './root-router.component';

describe('RootRouterComponent', () => {
  let component: RootRouterComponent;
  let fixture: ComponentFixture<RootRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RootRouterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RootRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
