import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../../../../services/user-info.service';
import { UserInfoDto } from '../../../../models/user-info-dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd';
import { DonatorRankDto } from '../../../../models/donator-rank-dto';
import { AdminDonatorService } from '../../../../services/admin/admin-donator.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'admin-create-donator',
  templateUrl: './admin-create-donator.component.html',
  styleUrls: ['./admin-create-donator.component.css']
})
export class AdminCreateDonatorComponent implements OnInit {

  public donatorForm: FormGroup;
  public userInfoes: UserInfoDto[];
  public loadingUsers: boolean = true;

  constructor(private userInfoService: UserInfoService,
    private adminDonatorService: AdminDonatorService,
    private drawerRef: NzDrawerRef,
    private formBuilder: FormBuilder) {
    this.donatorForm = this.formBuilder.group({
      userId: ['', [Validators.required]],
      paymentCompany: ['', [Validators.required]],
      donateTotalCount: ['', [Validators.required, Validators.min(0.01)]],
      paymentUserNameSecretly: ['', [Validators.required]],
      paymentAccountSecretly: ['', [Validators.required]],
      orderId: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getUserInfoes();
  }

  getUserInfoes(): void {
    this.userInfoService.getUserInfoes().subscribe(response => {
      this.userInfoes = response;
      this.loadingUsers = false;
    });
  }

  submitForm(data: DonatorRankDto): void {
    for (const item in this.donatorForm.controls) {
      this.donatorForm.controls[item].markAsDirty();            //标记为已触碰并修改
      this.donatorForm.controls[item].updateValueAndValidity(); //再次执行校验
    }
    console.log(data);
    this.adminDonatorService.create(data).subscribe(response => {
      console.log(response);
      this.drawerRef.close(response);
    });
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.donatorForm.reset();
    for (const key in this.donatorForm.controls) {
      this.donatorForm.controls[key].markAsPristine();
      this.donatorForm.controls[key].updateValueAndValidity();
    }
  }

}
