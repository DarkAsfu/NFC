/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
      authInterrupts: true,
    },
    // Image configurations
    images: {
      domains: ['i.ytimg.com', 'www.youtube.com', '127.0.0.1'],
    },
    
    // For Three.js SSR support
    serverExternalPackages: ['three'],
    
    // Webpack configuration (only used when not using Turbopack)
    webpack: (config) => {
      config.module.rules.push({
        test: /\.(glb|gltf)$/,
        use: {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/assets/',
            outputPath: 'static/assets/',
            name: '[name].[hash].[ext]',
          },
        },
      });
  
      config.module.rules.push({
        test: /\.(png|jpg|jpeg|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/images/',
            outputPath: 'static/images/',
            name: '[name].[hash].[ext]',
          },
        },
      });
  
      return config;
    },
  };
  
  export default nextConfig;