module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/wonziu',
        permanent: true
      }
    ]
  }
}