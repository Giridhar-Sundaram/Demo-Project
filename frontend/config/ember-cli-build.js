export default function (defaults) {
  let app = new EmberApp(defaults, {
    outputPaths: {
      app: {
        js: '/assets/ember-app.js',
        css: {
          app: '/assets/ember-app.css',
        },
      },
    },
  });

  return app.toTree();
}
