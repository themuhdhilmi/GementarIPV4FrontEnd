/** @type {import('next').NextConfig} */
module.exports = {
    output: 'standalone',
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
    secret: process.env.NEXTAUTH_SECRET
  }
  