import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN, isParentOption, NzUploadModule, NzMessageModule, NzEmptyModule, NzAlertModule } from 'ng-zorro-antd';
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

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    WikiPassageComponent,
    RegisterComponent,
    LoginComponent,
    DonatorRankComponent,
    UploaderComponent
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
    NzAlertModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent],
  entryComponents: [UploaderComponent]
})
export class AppModule { }
