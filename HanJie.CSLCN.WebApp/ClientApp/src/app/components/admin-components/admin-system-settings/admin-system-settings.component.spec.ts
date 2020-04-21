import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSystemSettingsComponent } from './admin-system-settings.component';

describe('AdminHomepageSettingsComponent', () => {
  let component: AdminSystemSettingsComponent;
  let fixture: ComponentFixture<AdminSystemSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSystemSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSystemSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
