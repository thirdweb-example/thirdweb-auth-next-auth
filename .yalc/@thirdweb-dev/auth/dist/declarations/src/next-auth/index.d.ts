import { ThirdwebNextAuthConfig } from "./types";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
export declare function ThirdwebNextAuth(cfg: ThirdwebNextAuthConfig): {
    NextAuthHandler: (...args: [] | [NextApiRequest, NextApiResponse]) => any;
    getUser: (...args: [NextApiRequest, NextApiResponse] | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]) => Promise<Session | null>;
};
//# sourceMappingURL=index.d.ts.map