const WorkerPlugin = require('worker-plugin');

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!isServer) {
      config.plugins.push(
        new WorkerPlugin({
          // use "self" as the global object when receiving hot updates.
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
        source: '/:streamer/page/1',
        destination: '/:streamer',
        permanent: true,
      },
    ];
  },
};

// module.exports = {
//   async redirects() {
//     return [
//       {
//         source: '/',
//         destination: '/wonziu',
//         permanent: true,
//       },
//       {
//         source: '/:streamer/page/1',
//         destination: '/:streamer',
//         permanent: true,
//       },
//     ];
//   },
// };
