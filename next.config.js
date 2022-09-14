/** @type {import('next').NextConfig} */
const path = require("path");

const withBundleAnalyzer = process.env.ANALYZE === "true"
  ? require("@next/bundle-analyzer")({ enabled: true, openAnalyzer: true })
  : (config) => config;

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  webpack(config, options) {
    config.resolve.alias["@"] = path.join(__dirname, "src");
    return config;
  },
});
