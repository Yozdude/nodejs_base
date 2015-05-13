##### *"After me cometh a Builder. Tell him, I too have known!"*
-- *The Palace* by Rudyard Kipling, 1902

nodejs_base
===========

A base project to work off of when creating simple Node.js applications. Aims to be straightforward to begin using and to remove the tedious task of implementing the basic functionality that many projects share. Because of this, some functionality is left out (such as OAuth integration) because it requires additional setup outside of this project. I'm mostly writing this so I don't have to re-create a whole bunch of functionality for my own projects, but hopefully others will find it useful as a starting point.


Features
------------

- Simple URL route creation via [Hapi][].
- Powerful templating engine [Nunjucks][].
- Automated change detection and redeployment with [Nodemon][] and [BrowserSync][].
- Basic account creation and authentication using cookies.
- Abstracted datbase layer via [Waterline][].
- Use and ompilation of Sass for styling.
- Minification and concatentation of javascript and css.
- Comes with [Bootstrap][] and a simple initial layout.
- Uses the [United][] theme from [Bootswatch][].


Setup
------------

1. Install [Node.js][] and [NPM][].
2. Run `npm install` to get Node.js packages
3. Run `gulp` to install Bower packages, compile scss, concat+minify js+css, run the main program, run [BrowserSync][], and open your browser to view the page via BrowserSync. Alternatively, go directly to `localhost:8000` in your brower of choice to accress the site directly (assuming you haven't changed the default port to something other than 8000).

Common Tasks
------------
#### Adding Third-Party Libraries
- **CDN**: If the library offers it and you prefer to use a CDN, add it to [empty.html](html_templates/empty.html), which acts as a core template for all pages on the site.
- **Bower**: If the library can be installed via [Bower][], run the install command (with `--save` so it's stored in your bower.json). Then add the paths to the required js and css files to [config.js](config.js) under *thirdParty.js* and *thirdParty.css* tasks.
- **Manually**: Download the library and add it somewhere in this project (probably a new *third-party-libraries* folder). Then add the paths to the required js and css files to [config.js](config.js) under *thirdParty.js* and *thirdParty.css* tasks.

#### Editing [BrowserSync][] Configuration/Seeing Stats
- Go to the BrowserSync admin port, which is the regular port (3000 by default) plus 1, so 3001 by default.
- Edit the configuration and see all the statistics that BrowserSync has collected.

#### Manually Edit/Delete the database
- The default database `sails-disk` is stored in the `.tmp` directory at the base of the project.

#### View Logs
- All logs are stored in `logfile.log` in the base directory.


Known Issues
------------

- [BrowserSync][] is sometimes slow to reload in my development environment (taking over a minute). However, refreshing the page manually results in a regular near-instant reload.
- HTML minification has been disabled due to issues it caused with the templating engine.

Tech Stack
------------

- [Node.js][] - Server-side Javascript language
- [NPM][] - Node.js package manager
- [Bower][] - Package manager
- [Gulp][] - Build andnworkflow automation
- [Nodemon][] - Automated change detection and redeployment
- [BrowserSync][] - Coordinates changes across multiple simultanneous browsers and gathers statistics
- [Hapi][] - Web framework
- [Waterline][], [Dog Water][] - Abstracted database management and hook into web framework
- [Bluebird][], [Async][] - Promises and command-execution structuring
- [Joi][] - Verification of endpoint arguments
- [Winston][] - Logging
- [Nunjucks][], [Nunjucks Hapi][] - Templating engine and hook into web framework
- [Bootstrap][], [FontAwesome][] - HTML styling template and icons
- [SweetAlert][] - Nice-looking alerts


TODO
------------

- Figure out where html minification is breaking things and fix it.


[Node.js]: https://nodejs.org/
[NPM]: https://www.npmjs.com/
[Bower]: http://bower.io/
[Gulp]: http://gulpjs.com/
[BrowserSync]: http://www.browsersync.io/
[Nodemon]: http://nodemon.io/
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
[Bootswatch]: http://bootswatch.com/
[United]: http://bootswatch.com/united/
[FontAwesome]: http://fortawesome.github.io/Font-Awesome/
[SweetAlert]: http://tristanedwards.me/sweetalert