import { AuditStatusEnum } from "./enums/audit-status-enum";
import { UserInfoDto } from "./user-info-dto";
import { WikiPassageDto } from "./wiki-passage-dto";

export class WikiPassageCommentDto {

    id: number;

    content: string;

    wikiPassageId: number;

    user: UserInfoDto;

    auditStatus: AuditStatusEnum;

    auditRejectReason: string;

    createDate: string;
}