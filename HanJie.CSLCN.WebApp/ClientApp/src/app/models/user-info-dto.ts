import { AuditStatusEnum } from "./enums/audit-status-enum";

export class UserInfoDto {
    id: number;
    nickName: string;
    userName: string;
    password: string;
    remember: boolean;
    isLoginSuccess: boolean;
    isAdmin: boolean;
    statusMarkGuid: string;
    avatarUrl: string;
    personalHomepageUrl: string;
    personalTitle: string;
    descriptionWord: string;
    personalizedSignature: string;
    commitTimesCount: number;
    lastCommitDateTime: string;
    auditStatus: AuditStatusEnum;
    phoneNumber:string;
}
