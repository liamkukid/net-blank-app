export const environment = {
  production: true,
  staging: false,
  type: 'prod',
  baseUrl: '',
  resourceApiURI: 'https://example.api.com',
  identityApiURI: 'https://example.identity.com',
  allowedDomainsRegex: /^.+@(gmail.com)$/,
  name: '',
  auth: {
    authority: 'https://example.identity.com',
    client_id: 'company_core_spa',
    redirect_uri: 'https://example.com/auth-callback',
    post_logout_redirect_uri: 'https://example.com/',
    response_type: 'id_token token',
    scope: 'openid profile email api',
    filterProtocolClaims: true,
    loadUserInfo: true,
    automaticSilentRenew: true,
    silent_redirect_uri: 'https://example.com/silent-refresh.html'
  }
};
