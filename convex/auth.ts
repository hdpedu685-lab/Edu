import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password({
      profile(params) {
        return {
          email: params.email as string,
          name: (params.name as string) || (params.email as string).split("@")[0],
        };
      },
    }),
  ],
  callbacks: {
    async afterUserCreatedOrUpdated(ctx, { userId, existingUserId }) {
      // Only create a profile for brand-new users (not updates / sign-ins)
      if (existingUserId != null) return;

      const existing = await (ctx.db as any)
        .query("profiles")
        .withIndex("by_userId", (q: any) => q.eq("userId", userId))
        .unique();
      if (existing) return;

      const user = await ctx.db.get(userId);
      // Use the name from the auth user, fallback to email prefix, never just "Student"
      const name = user?.name && user.name !== "Student" 
        ? user.name 
        : user?.email?.split("@")[0] || "Student";
      const username =
        name.toLowerCase().replace(/[^a-z0-9]/g, ".") +
        "-" +
        String(userId).slice(-4);

      await (ctx.db as any).insert("profiles", {
        userId,
        displayName: name,
        username,
        role: "Student",
        subjects: [],
      });
    },
  },
});
