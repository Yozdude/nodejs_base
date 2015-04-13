nodejs_base
===========

A base project to work off of when creating simple Node.js applications. Aims to be straightforward to begin using and to remove the tedious task of implementing the basic functionality that many projects share. Because of this, some functionality is left out (such as OAuth integration) because it requires additional setup outside of this project. I'm mostly writing this so I don't have to re-create a whole bunch of functionality for my own projects, but hopefully others will find it useful as a starting point.


Features
------------

TODO


Setup
------------

1. Install [Node.js][], [NPM][], [Bower][], and [Gulp][].
2. Run `bower install` to get bower packages
3. Run `npm install` to get Node.js packages
4. Run 'gulp' to run the program
5. Go to port `8000` (or whatever port you set in config.js) on the server


Things-To-Know
------------
- The default database `sails-disk` stores its data in `.tmp` in the base directory of the project.


Tech Stack
------------

- [Node.js][] - Server-side Javascript language
- [NPM][] - Node.js package manager
- [Bower][] - Package manager
- [Gulp][] - Build andnworkflow automation
- [Hapi][] - Web framework
- [Waterline][], [Dog Water][] - Abstracted ORM management and hook into web framework
- [Bluebird][] - Promises
- [Async][] - Command execution structuring
- [Joi][] - Verification of endpoint arguments
- [Nunjucks][], [Nunjucks Hapi][] - Templating engine and hook into web framework
- [Bootstrap][], [FontAwesome][] - HTML styling template and icons
- [SweetAlert][] - Nice-looking alerts


TODO
------------

- Load Preferences again now that Waterline is being used
- Remove async if it's really not being used anywhere
- Make models importable from a single file (as opposed to importing via the request object)
- Make the whole application single-page friendly (this may seem to go against the spirit of templating, but given that both are optional it would be a powerful feature to have)
- Minify HTML templates
- Add live-change updating (like nodemon, but detects changes in css, html, etc). BrowserSync perhaps?
- Move model-interaction to use promises (already provided in Waterline)
- Add caching
- Add the rest of the libraries used in package.json and bower.json
- Add actual logging (instead of just printing to console)
- Add some basic debug options


[Node.js]: https://nodejs.org/
[NPM]: https://www.npmjs.com/
[Bower]: http://bower.io/
[Gulp]: http://gulpjs.com/
[Hapi]: http://hapijs.com/
[Waterline]: https://github.com/balderdashy/waterline
[Dog Water]: https://github.com/devinivy/dogwater
[Bluebird]: https://github.com/petkaantonov/bluebird
[Async]: https://github.com/caolan/async
[Joi]: https://github.com/hapijs/joi
[Nunjucks]: http://mozilla.github.io/nunjucks/
[Nunjucks Hapi]: https://github.com/seldo/nunjucks-hapi
[Bootstrap]: http://getbootstrap.com/
[FontAwesome]: http://fortawesome.github.io/Font-Awesome/
[SweetAlert]: http://tristanedwards.me/sweetalert