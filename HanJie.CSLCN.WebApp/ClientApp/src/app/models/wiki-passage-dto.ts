import { AnchorTitle } from './anchor-title';
import { UserInfoDto } from './user-info-dto';

export class WikiPassageDto {
  id: string;
  title: string;
  content: string;
  createDate: string;
  lastModifyDate: string;
  anchorTitles: AnchorTitle[];
  mainAuthors: UserInfoDto[];
  coAuthors: UserInfoDto[];
}
