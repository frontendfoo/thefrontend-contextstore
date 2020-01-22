let presets

if (process.env['NODE_ENV'] === 'cjs') {
  presets = ['@babel/preset-env', '@babel/preset-react']
}

if (process.env['NODE_ENV'] === 'es') {
  presets = [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
    '@babel/preset-react',
  ]
}

module.exports = { presets }
