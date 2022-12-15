import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionAreaComponent } from './transaction-area.component';

describe('TransactionAreaComponent', () => {
  let component: TransactionAreaComponent;
  let fixture: ComponentFixture<TransactionAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
