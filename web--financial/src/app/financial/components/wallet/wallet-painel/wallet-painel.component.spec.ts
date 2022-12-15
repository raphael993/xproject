import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletPainelComponent } from './wallet-painel.component';

describe('WalletPainelComponent', () => {
  let component: WalletPainelComponent;
  let fixture: ComponentFixture<WalletPainelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletPainelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletPainelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
