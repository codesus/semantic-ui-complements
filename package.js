Package.describe({
  name: 'codesus:semantic-ui-complements',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Fragments of semantic-ui components to react.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/codesus/semantic-ui-complements',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.8.1');
  api.use('ecmascript');
  api.mainModule('client/main.js');
});