import { ThirdwebAuthConfig } from "./types";
import { NextApiRequest, NextApiResponse } from "next";
import { NextAuthOptions } from "next-auth";
export declare function ThirdwebAuth(cfg: ThirdwebAuthConfig): {
    ThirdwebProvider: (req: NextApiRequest, res: NextApiResponse) => import("next-auth/providers/credentials").CredentialsConfig<{
        payload: {
            label: string;
            type: string;
            placeholder: string;
        };
    }>;
    authOptions: (req: NextApiRequest, res: NextApiResponse) => Omit<NextAuthOptions, "providers">;
};
//# sourceMappingURL=index.d.ts.map