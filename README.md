# Chromereload

A small chrome extension endpoint for [livereload](https://www.npmjs.com/package/gulp-livereload) I build for my [chrome-extension-kickstarter](https://github.com/HaNdTriX/generator-chrome-extension-kickstart/tree/master/app/templates).

## Install

    npm install --save-dev chromereload

## Usage

Include the module in your chrome extension context (backgroundscript/contentscript/etc.).

    import ChromeReload from 'chromereload';

    new ChromeReload({
      host: 'localhost'
      port: 35729,
      reconnectTime: 3000 /* ms */
    });

For convenience you can also import the lib without configuring it:

    import 'chromereload/devonly';

this only works if `process.env.NODE_ENV` is set to `development`.
