const path = require("path");

module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    const shimDir = path.join(__dirname, "node_modules", "assemblyscript", "cli", "shim");

    // Browser shims
    plugins = [
      new webpack.NormalModuleReplacementPlugin(/^path$/, path.join(shimDir, "path")),
      new webpack.NormalModuleReplacementPlugin(/^process$/, path.join(shimDir, "process")),
      new webpack.NormalModuleReplacementPlugin(/^fs$/, path.join(shimDir, "fs"))
    ]

    config.plugins = config.plugins.concat(plugins)

    // Important: return the modified config
    return config
  },
}
