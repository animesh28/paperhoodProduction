/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "css")],
  },
  devIndicators: {
    buildActivity: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    BASE_URL: "https://paperhood.netlify.app",
    LIVE_URL: "https://paperhood.netlify.app",
    MONGODB_URL:
      "mongodb+srv://db_root:db_pass_123@paperhoodcluster.mwdlljm.mongodb.net/?retryWrites=true&w=majority",
    ACCESS_TOKEN_SECRET: "gnzXQ3BCR48w4zrvR2vKiT9wjjYbUmEoYGBq",
    REFRESH_TOKEN_SECRET:
      "QfLyqbxtVh8WWp8zJbx6PyqFdmDnkgiv44ye4rCpyzy967qNkiyp",
    CLOUD_UPDATE_PRESET: "paperhood",
    CLOUD_NAME: "paperhoodimg",
    CLOUD_API: "https://api.cloudinary.com/v1_1/paperhoodimg/image/upload",
  },
};

module.exports = nextConfig;
