import { AnchorTitle } from './anchor-title';
import { UserInfoDto } from './user-info-dto';
import { BreadCrumbDto } from './bread-crumb';
import { WikiPassageCommentDto } from './wiki-passage-comment-dto';

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
    categoryId: number;
    categoryUrl: string;
    breadCrumbs: BreadCrumbDto[];
    childPageBreadCrumbs: BreadCrumbDto[];
    editingUser: UserInfoDto;
    totalViewsCount: number;
    lastModifyDate: string;
    comments:WikiPassageCommentDto[];
}
