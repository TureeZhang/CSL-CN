import { Component, ContentChild, EventEmitter, Input, OnInit, Output, ViewRef } from '@angular/core';
import { CSLHttpHelper } from 'src/app/commons/http-helper';

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
  onClickOk: EventEmitter<string> = new EventEmitter<string>();

  public validateCodeImgBase64: string;
  public userInputCode : string;

  constructor(private cslHttpHelper: CSLHttpHelper) { 


  }

  ngOnInit(): void {
    this.refreshValidateCode();
  }

  handleCancel(): void {
    this.isVisiable = false;
  }

  handleOk(): void {
    this.onClickOk.emit(this.userInputCode);
  }

  showModal(e: Event): void {
    e.preventDefault();
    this.isVisiable = true;
  }

  refreshValidateCode():void{
    this.cslHttpHelper.get<string>("/api/ValidateCode").subscribe(res => {
      this.validateCodeImgBase64 = res;
    });
  }

}
