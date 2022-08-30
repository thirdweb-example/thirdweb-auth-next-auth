import { ThirdwebSDK } from "@thirdweb-dev/sdk";
export declare type ThirdwebAuthRoute = "login" | "logout" | "user";
export declare type ThirdwebAuthConfig = {
    privateKey: string;
    domain: string;
};
export declare type ThirdwebAuthContext = {
    sdk: ThirdwebSDK;
    domain: string;
};
export declare type ThirdwebAuthUser = {
    address: string;
};
//# sourceMappingURL=index.d.ts.map