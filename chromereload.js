'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChromeReload = function () {
  function ChromeReload() {
    var args = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, ChromeReload);

    var host = args.host;
    var port = args.port;
    var reconnectTime = args.reconnectTime;


    this.host = host || 'localhost';
    this.port = port || 35729;
    this.reconnectTime = reconnectTime || 3000;

    this.connect = this.connect.bind(this);
    this.onerror = this.onerror.bind(this);
    this.onopen = this.onopen.bind(this);
    this._onmessage = this._onmessage.bind(this);
    this.onmessage = this.onmessage.bind(this);
    this.onclose = this.onclose.bind(this);

    this.state = {
      connected: false,
      connectionLost: false,
      reloading: false
    };

    this.connect();
  }

  _createClass(ChromeReload, [{
    key: 'connect',
    value: function connect() {
      this.connection = new WebSocket('ws://' + this.host + ':' + this.port + '/livereload');
      this.connection.onopen = this.onopen;
      this.connection.onmessage = this._onmessage;
      this.connection.onerror = this.onerror;
      this.connection.onclose = this.onclose;
    }
  }, {
    key: 'onopen',
    value: function onopen() {
      this.log('Enabled');
      this.state.connected = true;
    }
  }, {
    key: 'onerror',
    value: function onerror(error) {
      this.log('Connection error');
      this.state.connected = false;
      this.state.connectionLost = true;
    }
  }, {
    key: '_onmessage',
    value: function _onmessage(event) {
      if (event.data) {
        this.onmessage(JSON.parse(event.data));
      }
    }
  }, {
    key: 'onmessage',
    value: function onmessage(_ref) {
      var command = _ref.command;
      var path = _ref.path;

      var connectionLost = this.state.connectionLost;
      var scriptreload = /\.js$/.test(path);

      if (command === 'reload') {

        if (connectionLost && !scriptreload) {
          this.log('Waiting for scripts to be ready.');
          return;
        }

        this.state.connectionLost = false;
        this.reload();
      }
    }
  }, {
    key: 'onclose',
    value: function onclose() {
      this.log('Connection lost. Reconnecting in %ss', this.reconnectTime);
      setTimeout(this.connect, this.reconnectTime);
    }
  }, {
    key: 'reload',
    value: function reload() {
      if (this.state.reloading) {
        return;
      }
      this.state.reloading = true;
      this.log('Reloading ...');
      if (chrome.runtime && chrome.runtime.reload) {
        // If we are on a background page
        // we should reload the entire runtime
        chrome.runtime.reload();
      } else {
        // Sometimes we are on a different context
        // for example a contentscript
        // therefore we need to reload via
        // window.location
        window.location.reload();
      }
    }
  }, {
    key: 'log',
    value: function log(message) {
      var _console;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      (_console = console).log.apply(_console, ['%cChromeReload: ' + message, 'color: gray;'].concat(args));
    }
  }]);

  return ChromeReload;
}();

exports.default = ChromeReload;