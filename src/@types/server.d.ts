declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";
declare module "*.webp";

declare interface ServerResponse {
    result?: any
    error?: number
}

declare interface ResultType {
    err: string
    result: string
}

interface StoreType {
    updated:        number
    loading?:       boolean
    currentAccountMail:    string
    currentAccountName:    string
    currentAccountAddress: string
    token:          string
    logined:        boolean
	lasttime:		number
}


interface useStoreTypes extends StoreType {
    update(payload: { [key: string]: string | number | boolean | PendingTypes | TxTypes | CoinTypes })
    call(url: string, params?: any, headerParams?: any): Promise<ServerResponse | null>
}

declare module 'react-notifications';