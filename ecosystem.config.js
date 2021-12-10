module.exports = {
    apps: [
      {
        name: "api-app",
        script: "bin/www",
        // Specify which folder to watch
        watch: ["src"],
        // Specify delay between watch interval
        watch_delay: 500,
        // Specify which folder to ignore
        ignore_watch: ["node_modules"],
      },
    ],
  };