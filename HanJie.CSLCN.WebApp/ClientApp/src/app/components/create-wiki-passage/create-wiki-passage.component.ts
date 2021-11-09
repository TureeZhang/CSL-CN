import { Component, OnInit } from '@angular/core';
import { WikiCategoryService } from '../../services/wiki-category.service';
import { Observable, Observer } from 'rxjs';
import { WikiCategoryDto } from '../../models/wiki-category-dto';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { WikiPassageDto } from '../../models/wiki-passage-dto';
import { WikiPassageService } from '../../services/wiki-passage.service';
import { Router } from '@angular/router';

@Component({
    selector: 'create-wiki-passage',
    templateUrl: './create-wiki-passage.component.html',
    styleUrls: ['./create-wiki-passage.component.css']
})
export class CreateWikiPassageComponent implements OnInit {

    private categoryId: number;
    private timerForRoutePathDuplicated: NodeJS.Timeout;

    public isCreateModPassageShow: boolean = false;
    public isSubmitLoading: boolean = false;
    public categories: Observable<WikiCategoryDto[]>;
    public validateForm: FormGroup;
    public isLoadingCategory: boolean = true;


    constructor(private wikiCategoryService: WikiCategoryService,
        private wikiPassageService: WikiPassageService,
        private router: Router,
        private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.categories = this.wikiCategoryService.list();
        this.categories.subscribe(() => { this.isLoadingCategory = false; });
        this.buildForm();
    }

    buildForm(): void {
        this.validateForm = this.formBuilder.group(
            {
                categoryId: ['', [Validators.required]],
                title: ['', [Validators.required]],
                routePath: ['']
            }
        );
    }

    routePathAsyncValidator = (control: FormControl): Observable<any> => {
        return new Observable((observer: Observer<ValidationErrors | null>) => {
            if (control.value == null) {
                observer.next({ error: false, notwritter: true });
                observer.complete();
            }

            let regex: RegExp = /^[0-9a-zA-Z_-]{1,}$/;
            let valid: boolean = regex.test(control.value);
            if (!valid) {
                observer.next({ error: true, notwritter: true });
                observer.complete();
            } else {
                this.routePathDuplicatedValidator(control).subscribe(response => {
                    observer.next(response);
                    observer.complete();
                });
            }
        });
    }

    routePathDuplicatedValidator = (control: FormControl): Observable<any> => {
        return new Observable((observer: Observer<ValidationErrors | null>) => {
            if (this.timerForRoutePathDuplicated !== null) { //请求防抖
                clearTimeout(this.timerForRoutePathDuplicated);
            }
            let routePath: string = control.value;
            this.timerForRoutePathDuplicated = setTimeout(() => {
                this.wikiPassageService.isRoutePathDuplicated(routePath).subscribe(response => {
                    if (response === true) {
                        observer.next({ error: true, duplicated: true }); //必须返回 error:true 以标识此事件为校验错误
                    } else {
                        observer.next(null);
                    }
                    observer.complete();
                });
            }, 1000);
        });
    };


    createModPassage(): void {
        this.isCreateModPassageShow = true;
    }

    handleCancel(): void {
        this.isCreateModPassageShow = false;
    }

    submitForm(wikiPassage: WikiPassageDto): void {
        this.isSubmitLoading = true;
        for (const item in this.validateForm.controls) {
            this.validateForm.controls[item].markAsDirty();            //标记为已触碰并修改
            this.validateForm.controls[item].updateValueAndValidity(); //再次执行校验
        }

        if (!this.validateForm.valid) {
            return;
        }

        this.wikiPassageService.create(wikiPassage).subscribe(response => {
            this.isSubmitLoading = false;
            let url: string = `/wiki-passage/${response.routePath}`;
            this.router.navigate([url]);
        }, () => { this.isSubmitLoading = false });
    }

    replaceBlackSpace(): void {
        this.validateForm.value.routePath = this.validateForm.value.routePath.replace(" ", "-");
    }
}
