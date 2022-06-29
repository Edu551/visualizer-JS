const requireModule = require.context(".", true, /\.js$/);

requireModule.keys().forEach((fileName) => {
    if (fileName === "./index.js") return;
});
