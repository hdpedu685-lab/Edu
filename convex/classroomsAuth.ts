import { query } from "./_generated/server";
import { v } from "convex/values";

export const canCreateClassroomByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const email = args.email.trim().toLowerCase();
    if (!email) return false;

    const user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", email))
      .first();

    if (!user) return false;

    return String((user as any).role || "").trim().toLowerCase() === "expert";
  },
});
