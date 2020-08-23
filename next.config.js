const WorkerPlugin = require('worker-plugin');

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!isServer) {
      config.plugins.push(
        new WorkerPlugin({
          globalObject: 'self',
        })
      );
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/wonziu',
        permanent: true,
      },
      {
        source: '/favourite/page/1',
        destination: '/favourite',
        permanent: true,
      },
      {
        source: '/:streamer/page/1',
        destination: '/:streamer',
        permanent: true,
      },
      {
        source: '/:streamer/:video',
        destination: '/:streamer/video/:video',
        permanent: true,
      },
    ];
  },
};
