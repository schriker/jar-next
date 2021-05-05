// const WorkerPlugin = require('worker-plugin');

module.exports = {
  future: {
    webpack5: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /react-spring/,
      sideEffects: true,
    });
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    domains: ['i.ytimg.com', 'static-cdn.jtvnw.net'],
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
        source: '/:streamer((?!_next)[^/]+?)/:video',
        destination: '/:streamer/video/:video',
        permanent: true,
      },
    ];
  },
};
