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
    Approve1Date: Date;
    Approve1By: string;
    Approve2Date: Date;
    Approve2By: string;
    MemberLookup: Member;
    Note: string;
}
