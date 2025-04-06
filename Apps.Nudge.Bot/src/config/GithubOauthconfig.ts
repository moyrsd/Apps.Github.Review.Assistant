export const GithubOauthconfig = {
    alias: "github-app",
    accessTokenUri: "https://github.com/login/oauth/access_token",
    authUri: "https://github.com/login/oauth/authorize",
    refreshTokenUri: "https://github.com/login/oauth/access_token",
    revokeTokenUri: `https://api.github.com/applications/client_id/token`,
    defaultScopes: ["users", "repo"],
};
