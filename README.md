nodejs_base
===========

A base project to work off of when creating simple Node.js applications. Aims to be straightforward to begin using and to remove the tedious task of implementing the basic functionality that many projects share. Because of this, some functionality is left out (such as OAuth integration) because it requires additional setup outside of this project. I'm mostly writing this so I don't have to re-create a whole bunch of functionality for my own projects, but hopefully others will find it useful as a starting point.


Features
------------

TODO


Setup
------------

1. Install [Node.js][] and [NPM][].
2. Run `npm install` to get Node.js packages
3. Run `gulp` to error-check javascript, Bower packages, and compile + minify code.
4. Run `node main` to run the program
5. Open a web browser and go to `localhost:8000` (replace 8000 if you altered config.js with whatever your new server.port number is)

Common Tasks
------------
#### Adding Third-Party Libraries
- **CDN**: If the library offers it and you prefer to use a CDN, add it to [empty.html](html_templates/empty.html), which acts as a core template for all pages on the site.
- **Bower**: If the library can be installed via [Bower][], run the install command (with `--save` so it's stored in your bower.json). Then, depending on how the library's Bower file is formatted its files may be added autmatically when running `gulp`. To check this, open [gulpfile.js](gulpfile.js) and check the *third-party-css* and *third-party-scripts* tasks. the first line in each of these functions uses wildcards to check for css and js files in Bower libraries. If these wildcard checks don't resolve to the locations of the css and js files of the library you just installed (now in the *bower_components* folder), add a new path so that it does.
- **Manually**: Download the library and add it somewhere in this project (probably a new *third-party-libraries* folder). Then edit the [gulpfile](gulpfile.js) *third-party-css* and *third-party-scripts* tasks to include the css and js files for this library.

Miscellaneous Things To Know
------------
- The default database `sails-disk` stores its data in `.tmp` in the base directory of the project.
- All logs are automatically written to `logfile.log`


Tech Stack
------------

- [Node.js][] - Server-side Javascript language
- [NPM][] - Node.js package manager
- [Bower][] - Package manager
- [Gulp][] - Build andnworkflow automation
- [Hapi][] - Web framework
- [Waterline][], [Dog Water][] - Abstracted ORM management and hook into web framework
- [Bluebird][], [Async][] - Promises and command-execution structuring
- [Joi][] - Verification of endpoint arguments
- [Winston][] - Logging
- [Nunjucks][], [Nunjucks Hapi][] - Templating engine and hook into web framework
- [Bootstrap][], [FontAwesome][] - HTML styling template and icons
- [SweetAlert][] - Nice-looking alerts


TODO
------------

- Make the whole application single-page friendly (this may seem to go against the spirit of templating, but given that both are optional it would be a powerful feature to have)
- Minify HTML templates
- Add live-change updating (like nodemon, but detects changes in css, html, etc). BrowserSync perhaps?
- Add caching
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
[Winston]: https://github.com/winstonjs/winston
[Nunjucks]: http://mozilla.github.io/nunjucks/
[Nunjucks Hapi]: https://github.com/seldo/nunjucks-hapi
[Bootstrap]: http://getbootstrap.com/
[FontAwesome]: http://fortawesome.github.io/Font-Awesome/
[SweetAlert]: http://tristanedwards.me/sweetalert