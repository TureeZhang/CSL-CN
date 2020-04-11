import { NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { WikiPassageComponent } from './components/wiki-passage/wiki-passage.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DonatorRankComponent } from './components/donator-rank/donator-rank.component';
import { UploaderComponent } from './components/uploader/uploader.component';
import { AdminHomepageComponent } from './components/admin-components/admin-homepage/admin-homepage.component';
import { AdminUserInfoesComponent } from './components/admin-components/admin-userinfoes/admin-userinfoes.component';
import { AdminDonatorsComponent } from './components/admin-components/admin-donators/admin-donators.component';
import { WikiListComponent } from './components/wiki-list/wiki-list.component';
import { AdminSystemSettingsComponent } from './components/admin-components/admin-homepage-settings/admin-system-settings.component';

const routes: Routes = [
    //主站路由
    { path: "", redirectTo: "/homepage", pathMatch: "full" },
    { path: "homepage", component: HomepageComponent },
    { path: "wiki-passage/:id", component: WikiPassageComponent },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "donator-rank", component: DonatorRankComponent },
    { path: "uploader", component: UploaderComponent },
    { path: "wiki-list", component: WikiListComponent },
    //管理界面路由
    { path: "admin", component: AdminHomepageComponent },
    { path: "admin/userinfoes", component: AdminUserInfoesComponent },
    { path: "admin/donators", component: AdminDonatorsComponent },
    { path: "admin/systemsettings", component: AdminSystemSettingsComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })],
    exports: [RouterModule]
})
export class AppRoutingModule implements OnInit {

    ngOnInit() {

    }

}
