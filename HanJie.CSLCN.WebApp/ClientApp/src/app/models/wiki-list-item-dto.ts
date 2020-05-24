import { UserInfoDto } from './user-info-dto';

export class WikiListItemDto {
    id: number;
    title: string;
    description: string;
    routePath: string;
    coverUrl: string;
    lastModifyUser: UserInfoDto;
}
