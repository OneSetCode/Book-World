export const oktaConfig = {
    clientId: '#',
    issuer: '#',
    redirectUri: '#',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
    language: 'en',
    username: 'testuser@email.com',
    i18n: {
        en: {
            'primaryauth.username.placeholder': 'Username: testuser@email.com',
            'primaryauth.password.placeholder': 'Password: test1234#',
        },
    },
}
