module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  'plugins': [
    '@babel/plugin-proposal-optional-chaining',
    [
      'component',
      {
        'libraryName': 'element-ui',
        'styleLibraryName': 'theme-chalk'
      }
    ],
    [
      "import",
      {libraryName: "ant-design-vue", libraryDirectory: "es", style: 'css'}
    ]
  ]
}
