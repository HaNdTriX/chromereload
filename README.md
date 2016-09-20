# Chromereload

A small chrome extension endpoint for [livereload](https://www.npmjs.com/package/gulp-livereload) I build for my [chrome-extension-kickstarter](https://github.com/HaNdTriX/generator-chrome-extension-kickstart/tree/master/app/templates).

## Install

```bash
npm install --save-dev chromereload
```

## Features

* reconnect after livereload restart
* reduce amout of reloads
* supports reload of non chrome pages 

## Usage

Include the module in your chrome extension context (backgroundscript/contentscript/etc.).

```javascript
import ChromeReload from 'chromereload';

new ChromeReload({
  host: 'localhost'
  port: 35729,
  reconnectTime: 3000 /* ms */,
  debug: true
});
```

For convenience you can also import the lib without configuring it:

```javascript
import 'chromereload/devonly';
```

this only works if `process.env.NODE_ENV` is set to `development`.
