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

    var _args$host = args.host;
    var host = _args$host === undefined ? 'localhost' : _args$host;
    var _args$port = args.port;
    var port = _args$port === undefined ? 35729 : _args$port;
    var _args$reconnectTime = args.reconnectTime;
    var reconnectTime = _args$reconnectTime === undefined ? 3000 : _args$reconnectTime;
    var _args$debug = args.debug;
    var debug = _args$debug === undefined ? true : _args$debug;


    this.host = host;
    this.port = port;
    this.reconnectTime = reconnectTime;
    this.debug = debug;

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
      if (this.debug) {
        var _console;

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        (_console = console).log.apply(_console, ['%cChromeReload: ' + message, 'color: gray;'].concat(args));
      }
    }
  }]);

  return ChromeReload;
}();

exports.default = ChromeReload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jaHJvbWVyZWxvYWQuanMiXSwibmFtZXMiOlsiQ2hyb21lUmVsb2FkIiwiYXJncyIsImhvc3QiLCJwb3J0IiwicmVjb25uZWN0VGltZSIsImRlYnVnIiwiY29ubmVjdCIsImJpbmQiLCJvbmVycm9yIiwib25vcGVuIiwiX29ubWVzc2FnZSIsIm9ubWVzc2FnZSIsIm9uY2xvc2UiLCJzdGF0ZSIsImNvbm5lY3RlZCIsImNvbm5lY3Rpb25Mb3N0IiwicmVsb2FkaW5nIiwiY29ubmVjdGlvbiIsIldlYlNvY2tldCIsImxvZyIsImVycm9yIiwiZXZlbnQiLCJkYXRhIiwiSlNPTiIsInBhcnNlIiwiY29tbWFuZCIsInBhdGgiLCJzY3JpcHRyZWxvYWQiLCJ0ZXN0IiwicmVsb2FkIiwic2V0VGltZW91dCIsImNocm9tZSIsInJ1bnRpbWUiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsIm1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTUEsWTtBQUNKLDBCQUF1QjtBQUFBLFFBQVhDLElBQVcseURBQUosRUFBSTs7QUFBQTs7QUFBQSxxQkFNakJBLElBTmlCLENBRW5CQyxJQUZtQjtBQUFBLFFBRW5CQSxJQUZtQiw4QkFFWixXQUZZO0FBQUEscUJBTWpCRCxJQU5pQixDQUduQkUsSUFIbUI7QUFBQSxRQUduQkEsSUFIbUIsOEJBR1osS0FIWTtBQUFBLDhCQU1qQkYsSUFOaUIsQ0FJbkJHLGFBSm1CO0FBQUEsUUFJbkJBLGFBSm1CLHVDQUlILElBSkc7QUFBQSxzQkFNakJILElBTmlCLENBS25CSSxLQUxtQjtBQUFBLFFBS25CQSxLQUxtQiwrQkFLWCxJQUxXOzs7QUFRckIsU0FBS0gsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0MsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0MsYUFBTCxHQUFxQkEsYUFBckI7QUFDQSxTQUFLQyxLQUFMLEdBQWFBLEtBQWI7O0FBRUEsU0FBS0MsT0FBTCxHQUFlLEtBQUtBLE9BQUwsQ0FBYUMsSUFBYixDQUFrQixJ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Y0FDQztBQUFBOztBQUNiLDZCQUFRa0IsR0FBUix1Q0FBK0JnQixPQUEvQixFQUEwQyxjQUExQyxTQUE2RGxDLElBQTdEO0FBQ0Q7QUFDRjs7Ozs7O2tCQUdZRCxZIiwiZmlsZSI6ImNocm9tZXJlbG9hZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIENocm9tZVJlbG9hZCB7XG4gIGNvbnN0cnVjdG9yKGFyZ3MgPSB7fSkge1xuICAgIGNvbnN0IHtcbiAgICAgIGhvc3QgPSAnbG9jYWxob3N0JyxcbiAgICAgIHBvcnQgPSAzNTcyOSxcbiAgICAgIHJlY29ubmVjdFRpbWUgPSAzMDAwLFxuICAgICAgZGVidWcgPSB0cnVlXG4gICAgfSA9IGFyZ3M7XG5cbiAgICB0aGlzLmhvc3QgPSBob3N0O1xuICAgIHRoaXMucG9ydCA9IHBvcnQ7XG4gICAgdGhpcy5yZWNvbm5lY3RUaW1lID0gcmVjb25uZWN0VGltZTtcbiAgICB0aGlzLmRlYnVnID0gZGVidWc7XG5cbiAgICB0aGlzLmNvbm5lY3QgPSB0aGlzLmNvbm5lY3QuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uZXJyb3IgPSB0aGlzLm9uZXJyb3IuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9ub3BlbiA9IHRoaXMub25vcGVuLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25tZXNzYWdlID0gdGhpcy5fb25tZXNzYWdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbm1lc3NhZ2UgPSB0aGlzLm9ubWVzc2FnZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25jbG9zZSA9IHRoaXMub25jbG9zZS5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNvbm5lY3RlZDogZmFsc2UsXG4gICAgICBjb25uZWN0aW9uTG9zdDogZmFsc2UsXG4gICAgICByZWxvYWRpbmc6IGZhbHNlXG4gICAgfTtcblxuICAgIHRoaXMuY29ubmVjdCgpO1xuICB9XG5cbiAgY29ubmVjdCgpIHtcbiAgICB0aGlzLmNvbm5lY3Rpb24gPSBuZXcgV2ViU29ja2V0KGB3czovLyR7dGhpcy5ob3N0fToke3RoaXMucG9ydH0vbGl2ZXJlbG9hZGApO1xuICAgIHRoaXMuY29ubmVjdGlvbi5vbm9wZW4gPSB0aGlzLm9ub3BlbjtcbiAgICB0aGlzLmNvbm5lY3Rpb24ub25tZXNzYWdlID0gdGhpcy5fb25tZXNzYWdlO1xuICAgIHRoaXMuY29ubmVjdGlvbi5vbmVycm9yID0gdGhpcy5vbmVycm9yO1xuICAgIHRoaXMuY29ubmVjdGlvbi5vbmNsb3NlID0gdGhpcy5vbmNsb3NlO1xuICB9XG5cbiAgb25vcGVuKCkge1xuICAgIHRoaXMubG9nKCdFbmFibGVkJyk7XG4gICAgdGhpcy5zdGF0ZS5jb25uZWN0ZWQgPSB0cnVlO1xuICB9XG5cbiAgb25lcnJvcihlcnJvcikge1xuICAgIHRoaXMubG9nKCdDb25uZWN0aW9uIGVycm9yJyk7XG4gICAgdGhpcy5zdGF0ZS5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLnN0YXRlLmNvbm5lY3Rpb25Mb3N0ID0gdHJ1ZTtcbiAgfVxuXG4gIF9vbm1lc3NhZ2UoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQuZGF0YSkge1xuICAgICAgdGhpcy5vbm1lc3NhZ2UoXG4gICAgICAgIEpTT04ucGFyc2UoZXZlbnQuZGF0YSlcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgb25tZXNzYWdlKHtcbiAgICBjb21tYW5kLFxuICAgIHBhdGhcbiAgfSkge1xuICAgIGNvbnN0IGNvbm5lY3Rpb25Mb3N0ID0gdGhpcy5zdGF0ZS5jb25uZWN0aW9uTG9zdDtcbiAgICBjb25zdCBzY3JpcHRyZWxvYWQgPSAvXFwuanMkLy50ZXN0KHBhdGgpO1xuXG4gICAgaWYgKGNvbW1hbmQgPT09ICdyZWxvYWQnKSB7XG5cbiAgICAgIGlmIChjb25uZWN0aW9uTG9zdCAmJiAhc2NyaXB0cmVsb2FkKSB7XG4gICAgICAgIHRoaXMubG9nKCdXYWl0aW5nIGZvciBzY3JpcHRzIHRvIGJlIHJlYWR5LicpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc3RhdGUuY29ubmVjdGlvbkxvc3QgPSBmYWxzZTtcbiAgICAgIHRoaXMucmVsb2FkKCk7XG4gICAgfVxuICB9XG5cbiAgb25jbG9zZSgpIHtcbiAgICB0aGlzLmxvZygnQ29ubmVjdGlvbiBsb3N0LiBSZWNvbm5lY3RpbmcgaW4gJXNzJywgdGhpcy5yZWNvbm5lY3RUaW1lKTtcbiAgICBzZXRUaW1lb3V0KHRoaXMuY29ubmVjdCwgdGhpcy5yZWNvbm5lY3RUaW1lKTtcbiAgfVxuXG4gIHJlbG9hZCgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS5yZWxvYWRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zdGF0ZS5yZWxvYWRpbmcgPSB0cnVlO1xuICAgIHRoaXMubG9nKCdSZWxvYWRpbmcgLi4uJyk7XG4gICAgaWYgKGNocm9tZS5ydW50aW1lICYmIGNocm9tZS5ydW50aW1lLnJlbG9hZCkge1xuICAgICAgLy8gSWYgd2UgYXJlIG9uIGEgYmFja2dyb3VuZCBwYWdlXG4gICAgICAvLyB3ZSBzaG91bGQgcmVsb2FkIHRoZSBlbnRpcmUgcnVudGltZVxuICAgICAgY2hyb21lLnJ1bnRpbWUucmVsb2FkKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNvbWV0aW1lcyB3ZSBhcmUgb24gYSBkaWZmZXJlbnQgY29udGV4dFxuICAgICAgLy8gZm9yIGV4YW1wbGUgYSBjb250ZW50c2NyaXB0XG4gICAgICAvLyB0aGVyZWZvcmUgd2UgbmVlZCB0byByZWxvYWQgdmlhXG4gICAgICAvLyB3aW5kb3cubG9jYXRpb25cbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9XG4gIH1cblxuICBsb2cobWVzc2FnZSwgLi4uYXJncykge1xuICAgIGlmKHRoaXMuZGVidWcpIHtcbiAgICAgIGNvbnNvbGUubG9nKGAlY0Nocm9tZVJlbG9hZDogJHttZXNzYWdlfWAsICdjb2xvcjogZ3JheTsnLCAuLi5hcmdzKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hyb21lUmVsb2FkO1xuIl19