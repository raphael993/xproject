import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-provider-form',
  templateUrl: './provider-form.component.html',
  styleUrls: ['./provider-form.component.scss']
})
export class ProviderFormComponent implements OnInit {

  @Output() cancel = new EventEmitter;
  @Output() submitProviderForm = new EventEmitter;

  @Input() providerForm: any;

  ngOnInit(): void {
  }

  onSubmitProviderForm() {
    this.submitProviderForm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }

}
