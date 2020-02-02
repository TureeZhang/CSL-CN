import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN, isParentOption, NzUploadModule, NzMessageModule, NzEmptyModule, NzAlertModule, NzCardModule, NzListModule, NzCheckboxModule, NzSkeletonModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { HomepageComponent } from './components/homepage/homepage.component';
import { WikiPassageComponent, markedOptionsFactory } from './components/wiki-passage/wiki-passage.component';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DonatorRankComponent } from './components/donator-rank/donator-rank.component';
import { UploaderComponent } from './components/uploader/uploader.component';
import { ClipboardModule } from 'ngx-clipboard';
import { AdminHomepageComponent } from './components/admin-components/admin-homepage/admin-homepage.component';
import { AdminUserInfoesComponent } from './components/admin-components/admin-userinfoes/admin-userinfoes.component';
import { AdminCreateUserInfoComponent } from './components/admin-components/admin-create-userinfo/admin-create-userinfo.component';


registerLocaleData(zh);

@NgModule({
  declarations: [
    //主站组件
    AppComponent,
    HomepageComponent,
    WikiPassageComponent,
    RegisterComponent,
    LoginComponent,
    DonatorRankComponent,
    UploaderComponent,
    //管理界面组件
    AdminHomepageComponent,
    AdminUserInfoesComponent,
    AdminCreateUserInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory,
      }
    }),
    LMarkdownEditorModule,
    NzUploadModule,
    ClipboardModule,
    NzMessageModule,
    NzAlertModule,
    NzCardModule,
    NzListModule,
    NzCheckboxModule,
    NzSkeletonModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent],
  entryComponents: [UploaderComponent, AdminCreateUserInfoComponent]
})
export class AppModule { }
