import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    name: v.string(),
    phone: v.string(),
    address: v.string(),
    message: v.optional(v.string()),
    sourcePath: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("registrations", {
      name: args.name,
      phone: args.phone,
      address: args.address,
      message: args.message,
      sourcePath: args.sourcePath,
      submittedAt: Date.now(),
    });
  },
});

export const listRecent = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = Math.max(1, Math.min(args.limit ?? 20, 100));
    return await ctx.db
      .query("registrations")
      .withIndex("by_submittedAt")
      .order("desc")
      .take(limit);
  },
});
