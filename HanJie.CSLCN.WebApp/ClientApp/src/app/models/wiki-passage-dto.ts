import { AnchorTitle } from './anchor-title';

export class WikiPassageDto {
  id: string;
  title: string;
  content: string;
  author: string;
  createDate: string;
  lastModifyDate: string;
  anchorTitles: AnchorTitle[]
}
