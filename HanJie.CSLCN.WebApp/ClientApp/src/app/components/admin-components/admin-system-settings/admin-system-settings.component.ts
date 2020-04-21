import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SystemSettingsDto } from '../../../models/admin/system-settings-dto';
import { removeSummaryDuplicates } from '@angular/compiler';
import { AdminSystemSettingsService } from '../../../services/admin/admin-system-settings-service.service';
import { Router } from '@angular/router';
import { GlobalService } from '../../../services/global.service';

@Component({
    selector: 'app-admin-system-settings',
    templateUrl: './admin-system-settings.component.html',
    styleUrls: ['./admin-system-settings.component.css']
})
export class AdminSystemSettingsComponent implements OnInit {

    public systemSettingsForm: FormGroup;

    constructor(private adminSystemSettingsService: AdminSystemSettingsService,
        private formBuilder: FormBuilder,
        private router: Router,
        private globalService: GlobalService) {

        this.systemSettingsForm = this.formBuilder.group({
            homepageNews: ['', [Validators.required]]
        });
    }

    ngOnInit() {

    }

    initSystemSettingValues(): void {
        this.adminSystemSettingsService.
    }

    submitForm(data: SystemSettingsDto): void {
        for (const item in this.systemSettingsForm.controls) {
            this.systemSettingsForm.controls[item].markAsDirty();
            this.systemSettingsForm.controls[item].updateValueAndValidity();
        }

        this.adminSystemSettingsService.update(data).subscribe(response => {
            this.router.navigate(['/admin']);
            this.globalService.successTip("系统设置保存成功。");
        });

    }

    resetForm(e: MouseEvent): void {
        e.preventDefault();
        this.systemSettingsForm.reset();
        for (const key in this.systemSettingsForm.controls) {
            this.systemSettingsForm.controls[key].markAsPristine();
            this.systemSettingsForm.controls[key].updateValueAndValidity();
        }
    }

}
