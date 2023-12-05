module.exports = {
  async rewrites() {
    return [
      {
        source: '/oidc/jwks',
        destination: '/api/oidc/jwks',
      },
    ]
  },
}
