import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N, zh_CN, isParentOption, NzUploadModule, NzMessageModule, NzEmptyModule, NzAlertModule, NzCardModule, NzListModule, NzCheckboxModule, NzSkeletonModule, NzLayoutModule, NzBreadCrumbModule, NzGridModule, NzFormModule, NzButtonModule, NzDividerModule, NzIconModule, NzAffixModule, NzDropDownModule, NzMenuModule, NzPaginationModule, NzInputModule, NzInputNumberModule, NzSelectModule, NzAvatarModule, NzCarouselModule, NzPopoverModule, NzStatisticModule, NzTableModule, NzToolTipModule, NzDrawerModule, NzSpinModule, NzAnchorModule, NzTabsModule, NzBadgeModule, NzDescriptionsModule, NzTableComponent, NzEmptyComponent, NzModalModule, NzTagModule, NzCollapseModule, NzPopconfirmModule } from 'ng-zorro-antd';
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
import { AdminDonatorsComponent } from './components/admin-components/admin-donators/admin-donators.component';
import { AdminCreateDonatorComponent } from './components/admin-components/admin-donators/admin-create-donator.component.ts/admin-create-donator.component';
import { AdminWikipassagesComponent } from './components/admin-components/admin-wikipassages/admin-wikipassages.component';
import { AdminCreateWikipassageComponent } from './components/admin-components/admin-wikipassages/admin-create-wikipassage/admin-create-wikipassage.component';
import { WikiListComponent } from './components/wiki-list/wiki-list.component';
import { HtmlRenderDirective } from './directives/html-render.directive';
import { AdminHomepageSettingsComponent } from './components/admin-components/admin-homepage-settings/admin-homepage-settings.component';
import { EditorDevoteInfoListComponent } from './components/editor-devote-info-list/editor-devote-info-list.component';
import { EditorListBoardComponent } from './components/editor-devote-info-list/editor-list-board/editor-list-board.component';
import { EditorComponent } from './components/editor/editor.component';
import { CreateWikiPassageComponent } from './components/create-wiki-passage/create-wiki-passage.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { QuestionComponent } from './components/question/question.component';
import { CreateQuestionComponent } from './components/create-question/create-question.component';
import { ValidateCodeModalComponent } from './components/validate-code-modal/validate-code-modal.component';

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
        AdminCreateUserInfoComponent,
        AdminDonatorsComponent,
        AdminCreateDonatorComponent,
        AdminWikipassagesComponent,
        AdminCreateWikipassageComponent,
        WikiListComponent,
        AdminHomepageSettingsComponent,
        EditorDevoteInfoListComponent,
        EditorListBoardComponent,
        EditorComponent,
        //指令
        HtmlRenderDirective,
        CreateWikiPassageComponent,
        QuestionComponent,
        CreateQuestionComponent,
        ValidateCodeModalComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
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
        NzSkeletonModule,
        NzLayoutModule,
        NzBreadCrumbModule,
        NzGridModule,
        NzFormModule,
        NzButtonModule,
        NzIconModule,
        NzDropDownModule,
        NzMenuModule,
        NzPaginationModule,
        NzCheckboxModule,
        NzInputModule,
        NzInputNumberModule,
        NzSelectModule,
        NzAvatarModule,
        NzCardModule,
        NzCarouselModule,
        NzEmptyModule,
        NzListModule,
        NzPopoverModule,
        NzStatisticModule,
        NzTableModule,
        NzToolTipModule,
        NzAlertModule,
        NzDrawerModule,
        NzMessageModule,
        NzSpinModule,
        NzAnchorModule,
        NzDividerModule,
        NzTabsModule,
        NzBadgeModule,
        NzDescriptionsModule,
        NzModalModule,
        NzTagModule,
        NzCollapseModule,
        CodemirrorModule,
        NzPopconfirmModule
    ],
    providers: [{ provide: NZ_I18N, useValue: zh_CN }],
    bootstrap: [AppComponent],
    entryComponents: [
        UploaderComponent,
        AdminCreateUserInfoComponent,
        AdminCreateDonatorComponent,
        AdminCreateWikipassageComponent,
        NzTableComponent,
        NzEmptyComponent
    ]
})
export class AppModule { }
