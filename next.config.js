module.exports = {
  // add more font or image formats if importing them to here.
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(png|jpg|gif|woff|woff2|otf|svg)$/i,
      use: [
        {
          loader: "url-loader",
          options: {
            limit: 100000,
          },
        },
      ],
    });

    return config;
  },
};
