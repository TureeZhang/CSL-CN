import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfoDto } from '../../../models/user-info-dto';
import { AdminUserInfoService } from '../../../services/admin/admin-userinfo.service';

@Component({
  selector: 'admin-create-userinfo',
  templateUrl: './admin-create-userinfo.component.html',
  styleUrls: ['./admin-create-userinfo.component.css']
})
export class AdminCreateUserInfoComponent implements OnInit {

  public userInfo: UserInfoDto;

  constructor() {

  }


  ngOnInit(): void {

  }



}
