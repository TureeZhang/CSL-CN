import { Component, ContentChild, EventEmitter, Input, OnInit, Output, ViewRef } from '@angular/core';

@Component({
  selector: 'validate-code-modal',
  templateUrl: './validate-code-modal.component.html',
  styleUrls: ['./validate-code-modal.component.css']
})
export class ValidateCodeModalComponent implements OnInit {


  @Input()
  isVisiable: boolean = false;

  @Input()
  disabled: boolean = false;

  @Input()
  title: string = "人机验证";

  @Output()
  onValid: EventEmitter<null> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  handleCancel(): void {
    this.isVisiable = false;
  }

  handleOk(): void {
    this.isVisiable = false;
    this.onValid.emit();
  }

  showModal(e: Event): void {
    e.preventDefault();
    this.isVisiable = true;
  }

}
