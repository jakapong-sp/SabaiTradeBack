import { Member } from './member';
export class Order {
    MemberRef: string;
    OrderRef: string;
    Type: string;
    OrderSymbol: string;
    Price: number;
    PriceNow: number;
    Size: number;
    Balance: number;
    Equity: number;
    Margin: number;
    FreeMargin: number;
    Commission: number;
    Swap: number;
    Profit: number;
    SL: number;
    TP: number;
    Status: string;
    Time: string;
    CloseDate: string;
    CreateDate: string;
    MemberLookup: Member;
    Note: string;
  }
