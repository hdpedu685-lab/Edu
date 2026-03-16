import { query } from "./_generated/server";
import { v } from "convex/values";

export const canCreateClassroomByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const email = args.email.trim().toLowerCase();
    if (!email) return false;

    // Auth users table comes from convex auth tables.
    const users = await ctx.db.query("users").collect();
    const user = users.find((item: any) => {
      const candidate = String(item?.email || "").toLowerCase();
      return candidate === email;
    });

    if (!user) return false;

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .first();

    return String(profile?.role || "").toLowerCase() === "expert";
  },
});
