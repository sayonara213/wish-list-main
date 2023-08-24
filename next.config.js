const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias['@components'] = path.join(__dirname, 'src/components');
    config.resolve.alias['@styles'] = path.join(__dirname, 'src/styles');
    config.resolve.alias['@constants'] = path.join(__dirname, 'src/constants');
    config.resolve.alias['@utils'] = path.join(__dirname, 'src/utils');
    config.resolve.alias['@lib'] = path.join(__dirname, 'src/lib');

    return config;
  },
};

module.exports = nextConfig;
