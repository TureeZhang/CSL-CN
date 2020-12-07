import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-create-question',
    templateUrl: './create-question.component.html',
    styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {

    public title: string = "";
    public content: string = "";

    constructor() { }

    ngOnInit(): void {
    }

    submitForm(): void {
        for (const item in this.userInfoForm.controls) {
            this.userInfoForm.controls[item].markAsDirty();            //标记为已触碰并修改
            this.userInfoForm.controls[item].updateValueAndValidity(); //再次执行校验
        }
    }
}
