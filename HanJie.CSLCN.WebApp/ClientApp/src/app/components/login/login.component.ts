import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInfoDto } from '../../models/user-info-dto';
import { UserInfoService } from '../../services/user-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;

  constructor(private fb: FormBuilder,
    private userInfoService: UserInfoService,
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
        UserInfoService.currentUser = res;
        host.router.navigate(["/homepage"]);
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
