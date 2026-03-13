export default {
  providers: [
    {
      // CONVEX_SITE_URL is a Convex built-in env var, always correct for the
      // current deployment. Do NOT replace with NEXT_PUBLIC_* variables.
      domain: process.env.CONVEX_SITE_URL,
      applicationID: "convex",
    },
  ],
};