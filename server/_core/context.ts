import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import { mockOfficerSession, sdk } from "./sdk";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | typeof mockOfficerSession | any | null;
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: any = null;

  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch {
    // In development mode or if OAUTH_SERVER_URL is unset, fallback to mock officer session
    if (process.env.NODE_ENV === "development" || !process.env.OAUTH_SERVER_URL) {
      user = mockOfficerSession;
    } else {
      user = null;
    }
  }

  if (!user && (process.env.NODE_ENV === "development" || !process.env.OAUTH_SERVER_URL)) {
    user = mockOfficerSession;
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
