import ChromeReload from './chromereload.js';

if (process.env.NODE_ENV === 'development') {
  new ChromeReload();
}
