function isBabelLoader(caller) {
  return caller && caller.name === 'babel-loader'
}

module.exports = function(api) {
  if (api.env('test') && !api.caller(isBabelLoader)) {
    return {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: 'commonjs',
            targets: {
              node: 'current'
            }
          }
        ]
      ],
      plugins: [
        'syntax-dynamic-import',
        ['transform-runtime', {
          polyfill: false,
          regenerator: true
        }]
      ]
    }
  }
  return {}
}
