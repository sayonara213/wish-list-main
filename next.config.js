const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias['@components'] = path.join(__dirname, 'src/app/components');
    config.resolve.alias['@styles'] = path.join(__dirname, 'src/app/styles');
    config.resolve.alias['@constants'] = path.join(__dirname, 'src/app/constants');
    config.resolve.alias['@utils'] = path.join(__dirname, 'src/app/utils');

    return config;
  },
};

module.exports = nextConfig;
