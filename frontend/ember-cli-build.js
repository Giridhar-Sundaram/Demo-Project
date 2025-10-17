'use strict';
// @ts-ignore
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const path = require('path');
const glob = require('glob');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    sassOptions: {
      includePaths: [
        path.join(__dirname, '../styles'), // Adjust path based on your folder location
      ],
    },
    emberData: {
      deprecations: {
        // New projects can safely leave this deprecation disabled.
        // If upgrading, to opt-into the deprecated behavior, set this to true and then follow:
        // https://deprecations.emberjs.com/id/ember-data-deprecate-store-extends-ember-object
        // before upgrading to Ember Data 6.0
        DEPRECATE_STORE_EXTENDS_EMBER_OBJECT: false,
      },
    },
    outputPath: '../public',
    outputPaths: {
      app: {
        js: '/assets/ember-app.js',
        css: {
          app: '/assets/ember-app.css',
        },
      },
    },
    // Add options here
  });
  // Define the path to the folder
  const scriptsPath = 'vendor/ruby-functionalities';

  // Use glob to find all .js files in that folder
  const filesToImport = glob.sync(`${scriptsPath}**/*.js`);

  // Iterate over the list of files and import each one
  filesToImport.forEach((file) => {
    // app.import() takes a path relative to the project root
    app.import(file);
  });
  return app.toTree();
};
