import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-wallet-form',
  templateUrl: './wallet-form.component.html',
  styleUrls: ['./wallet-form.component.scss']
})
export class WalletFormComponent implements OnInit {

  @Input() walletForm: any;

  @Output() submitWalletForm = new EventEmitter();
  @Output() cancel = new EventEmitter();

  ngOnInit(): void {
  }

  onSubmitWalletForm() {
    this.submitWalletForm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }

}
