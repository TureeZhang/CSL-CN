import { UserInfoDto } from './user-info-dto';
import { WikiPassageDto } from './wiki-passage-dto';

export class EditorDevoteInfoDto {
    userInfo: UserInfoDto;

    mainAuthPassages: WikiPassageDto[];

    cooAuthPassages: WikiPassageDto[];

    commitTimesCount: number;

    lastCommitDateTime: string;
}
