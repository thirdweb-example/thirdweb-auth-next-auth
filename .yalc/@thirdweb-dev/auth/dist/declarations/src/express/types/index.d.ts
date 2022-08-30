import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { Request } from "express";
export declare type ThirdwebAuthRoute = "login" | "user" | "logout";
export declare type ThirdwebAuthConfig = {
    privateKey: string;
    domain: string;
    authUrl?: string;
};
export declare type ThirdwebAuthContext = {
    sdk: ThirdwebSDK;
    domain: string;
};
export declare type ThirdwebAuthUser = {
    address: string;
};
export declare type RequestWithUser = Request & {
    user: ThirdwebAuthUser | null;
};
//# sourceMappingURL=index.d.ts.map