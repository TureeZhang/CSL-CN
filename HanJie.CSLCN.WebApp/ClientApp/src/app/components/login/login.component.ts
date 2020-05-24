import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInfoDto } from '../../models/user-info-dto';
import { UserInfoService } from '../../services/user-info.service';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    validateForm: FormGroup;

    constructor(private fb: FormBuilder,
        private userInfoService: UserInfoService,
        private globalService: GlobalService,
        private router: Router) {

    }


    ngOnInit(): void {
        this.buildFormValidator();
    }

    submitForm(): void {
        var host = this;
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }
        let userInfo: UserInfoDto = this.validateForm.value;
        this.userInfoService.login(userInfo).subscribe(res => {
            if (res.isLoginSuccess) {
                UserInfoService.CurrentUser = res;
                host.router.navigate(["/homepage"]);
                host.globalService.successTip(`欢迎 ${res.userName} ：登陆成功`);
            } else {

            }
        });
    }

    /**
     * 构建表单验证器。
     * */
    buildFormValidator(): void {
        this.validateForm = this.fb.group({
            userName: [null, [Validators.required]],
            password: [null, [Validators.required]],
            remember: [true]
        });
    }
}
