module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/wonziu',
        permanent: true
      },
      {
        source: '/:streamer/page/1',
        destination: '/:streamer',
        permanent: true
      }
    ]
  }
}