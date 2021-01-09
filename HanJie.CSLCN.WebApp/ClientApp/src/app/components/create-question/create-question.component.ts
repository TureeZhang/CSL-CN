import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {

  title: string;
  content: string;

  questionForm: FormGroup;

  constructor() {

  }

  ngOnInit(): void {

  }

  submitForm(): void {
    for (const item in this.questionForm.controls) {
      this.questionForm.controls[item].markAsDirty();            //标记为已触碰并修改
      this.questionForm.controls[item].updateValueAndValidity(); //再次执行校验
    }
  }
}
