module.exports = {
  // add more font or image formats if importing them to here.
  images: {
    domains: ["chpistel.sirv.com"],
  },
  webpack: (config, options) => {
    config.module.rules.push(
      {
        test: /\.(png|jpg|gif|woff|woff2|otf|ttf|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 100000,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|mp3|aif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "static/media/[name].[hash:8].[ext]",
            },
          },
        ],
      }
    );

    return config;
  },
};
