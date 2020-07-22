import { ɵSWITCH_COMPILE_NGMODULE__POST_R3__ } from '@angular/core';

export class FormOjbect {
  text: string;
  fieldName: string;
  description: string;
  ngModel: any;

  constructor(text: string, fieldName: string, description: string, ngModel: any) {
    this.text = text;
    this.fieldName = fieldName;
    this.description = description;
    this.ngModel = ngModel;
  }
}
