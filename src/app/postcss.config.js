const commonPlugins = ["tailwindcss"];

module.exports = {
  plugins:
    process.env.NODE_ENV === 'production'
      ? [
        'postcss-preset-env',
        "@fullhuman/postcss-purgecss",
        "tailwindcss",
        {
          autoprefixer: {
            flexbox: 'no-2009',
          },
          stage: 3,
          features: {
            'custom-properties': false,
          },
        },
        ...commonPlugins
      ]
      : commonPlugins,
}
