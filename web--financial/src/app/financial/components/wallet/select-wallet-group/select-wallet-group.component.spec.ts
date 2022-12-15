import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectWalletGroupComponent } from './select-wallet-group.component';

describe('SelectWalletGroupComponent', () => {
  let component: SelectWalletGroupComponent;
  let fixture: ComponentFixture<SelectWalletGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectWalletGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectWalletGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
