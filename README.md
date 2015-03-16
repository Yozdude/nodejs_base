nodejs_base
===========

A base project to work off of when creating simple Node.js applications. Aims to be straightforward to begin using and to remove the tedious task of implementing the basic functionality that many projects share. Because of this, some functionality is left out (such as OAuth integration) because it requires additional setup outside of this project. I'm mostly writing this so I don't have to re-create a whole bunch of functionality for my own projects, but hopefully others will find it useful as a starting point.


Features
------------

TODO


Setup
------------

1. Install [Node.js][], [NPM][], [Bower][], and [Gulp][] if you haven't already.
2. TODO


Tech Stack
------------

- [Node.js][] - Server-side Javascript language
- [NPM][] - Node.js package manager
- [Bower][] - Package manager
- [Gulp][] - Build andnworkflow automation
- [MongoDB][], [Mongoose][] - Persistent storage database
- [Hapi][] - Web framework engine
- [Nunjucks][] - Templating engine
- [Bootstrap][], [FontAwesome][] - HTML styling template and icons
- [SweetAlert][] - Nice-looking alerts


TODO
------------

- Make the whole application single-page friendly (this may seem to go against the spirit of templating, but given that both are optional would be a powerful feature to have).
- Minify HTML templates
- Add live-change updating (like nodemon, but detects changes in css, html, etc). BrowserSync perhaps?
- Abstract promise-based commands for the database
- Abstract away generic paths for generic models
- Add caching
- Make more of the user routing login use promises
- Add actual logging (instead of just printing to console)
- Add some basic debug options


[Node.js]: https://nodejs.org/
[NPM]: https://www.npmjs.com/
[Bower]: http://bower.io/
[Gulp]: http://gulpjs.com/
[MongoDB]: http://www.mongodb.org/
[Mongoose]: http://mongoosejs.com/
[Hapi]: http://hapijs.com/
[Nunjucks]: http://mozilla.github.io/nunjucks/
[Bootstrap]: http://getbootstrap.com/
[FontAwesome]: http://fortawesome.github.io/Font-Awesome/
[SweetAlert]: http://tristanedwards.me/sweetalert