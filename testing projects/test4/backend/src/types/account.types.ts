import { AccountType } from "../database/models/Account";

export interface AccountCreateRequest {
    name: string;
    type: AccountType;
    initialBalance: number;
    currency?: string;
}

export interface AccountUpdateRequest {
    name?: string;
    type?: AccountType;
}