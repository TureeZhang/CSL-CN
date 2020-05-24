import { AnchorTitle } from './anchor-title';
import { UserInfoDto } from './user-info-dto';
import { BreadCrumbDto } from './bread-crumb';

export class WikiPassageDto {
    id: number;
    title: string;
    content: string;
    routePath: string;
    createDate: string;
    lastModifyUser: UserInfoDto;
    anchorTitles: AnchorTitle[];
    mainAuthors: UserInfoDto[];
    coAuthors: UserInfoDto[];
    parentPassageId: number;
    breadCrumbs: BreadCrumbDto[];
    childPageBreadCrumbs: BreadCrumbDto[];
    editingUser: UserInfoDto;
    totalViewsCount: number;
}
