import { Member } from './member';

export class Asset {
    MemberRef: string;
    AssetRef: string;
    AssetType: string;
    Amount: string;
    AmountRequest: string;
    Status: string;
    CreateDate: Date;
    CreateBy: string;
    mem: Member;
}
