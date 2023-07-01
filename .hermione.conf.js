module.exports = {
  sets: {
    desktop: {
      files: "test/hermione",
    },
  },

  browsers: {
    chrome: {
      automationProtocol: "devtools",
      desiredCapabilities: {
        browserName: "chrome",
      },
      windowSize: "1920x1080",
    },
  },
  plugins: {
    "html-reporter/hermione": {
      enabled: true,
    },
  },
};
