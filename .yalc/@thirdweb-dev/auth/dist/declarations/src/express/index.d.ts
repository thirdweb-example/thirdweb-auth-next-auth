import { ThirdwebAuthConfig, ThirdwebAuthUser } from "./types";
import { Express, Request } from "express";
export * from "./types";
export declare function getUser(req: Request): ThirdwebAuthUser | null;
export declare function ThirdwebAuth(app: Express, cfg: ThirdwebAuthConfig): void;
//# sourceMappingURL=index.d.ts.map