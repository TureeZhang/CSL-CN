import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, ValidationErrors, FormGroup, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { WikiPassageService } from '../../../../services/wiki-passage.service';
import { WikiPassageDto } from '../../../../models/wiki-passage-dto';
import { Key } from 'protractor';
import { NzDrawerRef } from 'ng-zorro-antd';
import { GlobalService } from '../../../../services/global.service';

@Component({
  selector: 'admin-create-wikipassage',
  templateUrl: './admin-create-wikipassage.component.html',
  styleUrls: ['./admin-create-wikipassage.component.css']
})
/** admin-create-wikipassage component*/
export class AdminCreateWikipassageComponent {

  private timerForRoutePathDuplicated: NodeJS.Timer;

  public wikiPassageForm: FormGroup;

  @Input()
  public prefix: string;
  @Input()
  public parentPassageId: number = 0;

  constructor(private formBuilder: FormBuilder,
    private wikiPassageService: WikiPassageService,
    private drawerRef: NzDrawerRef,
    private globalService: GlobalService) {
    this.wikiPassageForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      routePath: ['', [Validators.required], [this.routePathAsyncValidator]]
    });
  }

  routePathAsyncValidator = (control: FormControl): Observable<any> => {
    return new Observable((observer: Observer<ValidationErrors | null>) => {
      let regex: RegExp = /^[0-9a-zA-Z_-]{1,}$/;
      let valid: boolean = regex.test(control.value);
      console.log(`routePath-valid:${valid}`);
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
        this.wikiPassageService.isRoutePathDuplicated(this.prefix + routePath).subscribe(response => {
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

  submitForm(data: WikiPassageDto): void {
    for (const item in this.wikiPassageForm.controls) {
      this.wikiPassageForm.controls[item].markAsDirty();
      this.wikiPassageForm.controls[item].updateValueAndValidity();
    }
    console.log(data);
    data.routePath = `${this.prefix}${data.routePath}`;
    data.parentPassageId = this.parentPassageId;
    this.wikiPassageService.postWikiPassage(data).subscribe(response => {
      this.globalService.successTip(`创建子文档成功：《${response.title}》（/wiki-passage/${response.routePath}）`);
      this.drawerRef.close(response);
    });
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.wikiPassageForm.reset();
    for (const item in this.wikiPassageForm.controls) {
      this.wikiPassageForm.controls[item].markAsPristine();
      this.wikiPassageForm.controls[item].updateValueAndValidity();
    }
  }
}
