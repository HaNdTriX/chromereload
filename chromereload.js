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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jaHJvbWVyZWxvYWQuanMiXSwibmFtZXMiOlsiQ2hyb21lUmVsb2FkIiwiYXJncyIsImhvc3QiLCJwb3J0IiwicmVjb25uZWN0VGltZSIsImNvbm5lY3QiLCJiaW5kIiwib25lcnJvciIsIm9ub3BlbiIsIl9vbm1lc3NhZ2UiLCJvbm1lc3NhZ2UiLCJvbmNsb3NlIiwic3RhdGUiLCJjb25uZWN0ZWQiLCJjb25uZWN0aW9uTG9zdCIsInJlbG9hZGluZyIsImNvbm5lY3Rpb24iLCJXZWJTb2NrZXQiLCJsb2ciLCJlcnJvciIsImV2ZW50IiwiZGF0YSIsIkpTT04iLCJwYXJzZSIsImNvbW1hbmQiLCJwYXRoIiwic2NyaXB0cmVsb2FkIiwidGVzdCIsInJlbG9hZCIsInNldFRpbWVvdXQiLCJjaHJvbWUiLCJydW50aW1lIiwid2luZG93IiwibG9jYXRpb24iLCJtZXNzYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU1BLFk7QUFDSiwwQkFBdUI7QUFBQSxRQUFYQyxJQUFXLHlEQUFKLEVBQUk7O0FBQUE7O0FBQUEsUUFFbkJDLElBRm1CLEdBS2pCRCxJQUxpQixDQUVuQkMsSUFGbUI7QUFBQSxRQUduQkMsSUFIbUIsR0FLakJGLElBTGlCLENBR25CRSxJQUhtQjtBQUFBLFFBSW5CQyxhQUptQixHQUtqQkgsSUFMaUIsQ0FJbkJHLGFBSm1COzs7QUFPckIsU0FBS0YsSUFBTCxHQUFZQSxRQUFRLFdBQXBCO0FBQ0EsU0FBS0MsSUFBTCxHQUFZQSxRQUFRLEtBQXBCO0FBQ0EsU0FBS0MsYUFBTCxHQUFxQkEsaUJBQWlCLElBQXRDOztBQUVBLFNBQUtDLE9BQUwsR0FBZSxLQUFLQSxPQUFMLENBQWFDLElBQWIsQ0FBa0IsSUFBbEIsQ0FBZjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxLQUFLQSxPQUFMLENBQWFELElBQWIsQ0FBa0IsSUFBbEIsQ0FBZjtBQUNBLFNBQUtFLE1BQUwsR0FBYyxLQUFLQSxNQUFMLENBQVlGLElBQVosQ0FBaUIsSUFBakIsQ0FB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biAgY29uc3RydWN0b3IoYXJncyA9IHt9KSB7XG4gICAgY29uc3Qge1xuICAgICAgaG9zdCxcbiAgICAgIHBvcnQsXG4gICAgICByZWNvbm5lY3RUaW1lXG4gICAgfSA9IGFyZ3M7XG5cbiAgICB0aGlzLmhvc3QgPSBob3N0IHx8ICdsb2NhbGhvc3QnO1xuICAgIHRoaXMucG9ydCA9IHBvcnQgfHwgMzU3Mjk7XG4gICAgdGhpcy5yZWNvbm5lY3RUaW1lID0gcmVjb25uZWN0VGltZSB8fCAzMDAwO1xuXG4gICAgdGhpcy5jb25uZWN0ID0gdGhpcy5jb25uZWN0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbmVycm9yID0gdGhpcy5vbmVycm9yLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbm9wZW4gPSB0aGlzLm9ub3Blbi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX29ubWVzc2FnZSA9IHRoaXMuX29ubWVzc2FnZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25tZXNzYWdlID0gdGhpcy5vbm1lc3NhZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uY2xvc2UgPSB0aGlzLm9uY2xvc2UuYmluZCh0aGlzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjb25uZWN0ZWQ6IGZhbHNlLFxuICAgICAgY29ubmVjdGlvbkxvc3Q6IGZhbHNlLFxuICAgICAgcmVsb2FkaW5nOiBmYWxzZVxuICAgIH07XG5cbiAgICB0aGlzLmNvbm5lY3QoKTtcbiAgfVxuXG4gIGNvbm5lY3QoKSB7XG4gICAgdGhpcy5jb25uZWN0aW9uID0gbmV3IFdlYlNvY2tldChgd3M6Ly8ke3RoaXMuaG9zdH06JHt0aGlzLnBvcnR9L2xpdmVyZWxvYWRgKTtcbiAgICB0aGlzLmNvbm5lY3Rpb24ub25vcGVuID0gdGhpcy5vbm9wZW47XG4gICAgdGhpcy5jb25uZWN0aW9uLm9ubWVzc2FnZSA9IHRoaXMuX29ubWVzc2FnZTtcbiAgICB0aGlzLmNvbm5lY3Rpb24ub25lcnJvciA9IHRoaXMub25lcnJvcjtcbiAgICB0aGlzLmNvbm5lY3Rpb24ub25jbG9zZSA9IHRoaXMub25jbG9zZTtcbiAgfVxuXG4gIG9ub3BlbigpIHtcbiAgICB0aGlzLmxvZygnRW5hYmxlZCcpO1xuICAgIHRoaXMuc3RhdGUuY29ubmVjdGVkID0gdHJ1ZTtcbiAgfVxuXG4gIG9uZXJyb3IoZXJyb3IpIHtcbiAgICB0aGlzLmxvZygnQ29ubmVjdGlvbiBlcnJvcicpO1xuICAgIHRoaXMuc3RhdGUuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgdGhpcy5zdGF0ZS5jb25uZWN0aW9uTG9zdCA9IHRydWU7XG4gIH1cblxuICBfb25tZXNzYWdlKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmRhdGEpIHtcbiAgICAgIHRoaXMub25tZXNzYWdlKFxuICAgICAgICBKU09OLnBhcnNlKGV2ZW50LmRhdGEpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIG9ubWVzc2FnZSh7XG4gICAgY29tbWFuZCxcbiAgICBwYXRoXG4gIH0pIHtcbiAgICBjb25zdCBjb25uZWN0aW9uTG9zdCA9IHRoaXMuc3RhdGUuY29ubmVjdGlvbkxvc3Q7XG4gICAgY29uc3Qgc2NyaXB0cmVsb2FkID0gL1xcLmpzJC8udGVzdChwYXRoKTtcblxuICAgIGlmIChjb21tYW5kID09PSAncmVsb2FkJykge1xuXG4gICAgICBpZiAoY29ubmVjdGlvbkxvc3QgJiYgIXNjcmlwdHJlbG9hZCkge1xuICAgICAgICB0aGlzLmxvZygnV2FpdGluZyBmb3Igc2NyaXB0cyB0byBiZSByZWFkeS4nKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnN0YXRlLmNvbm5lY3Rpb25Mb3N0ID0gZmFsc2U7XG4gICAgICB0aGlzLnJlbG9hZCgpO1xuICAgIH1cbiAgfVxuXG4gIG9uY2xvc2UoKSB7XG4gICAgdGhpcy5sb2coJ0Nvbm5lY3Rpb24gbG9zdC4gUmVjb25uZWN0aW5nIGluICVzcycsIHRoaXMucmVjb25uZWN0VGltZSk7XG4gICAgc2V0VGltZW91dCh0aGlzLmNvbm5lY3QsIHRoaXMucmVjb25uZWN0VGltZSk7XG4gIH1cblxuICByZWxvYWQoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUucmVsb2FkaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc3RhdGUucmVsb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLmxvZygnUmVsb2FkaW5nIC4uLicpO1xuICAgIGlmIChjaHJvbWUucnVudGltZSAmJiBjaHJvbWUucnVudGltZS5yZWxvYWQpIHtcbiAgICAgIC8vIElmIHdlIGFyZSBvbiBhIGJhY2tncm91bmQgcGFnZVxuICAgICAgLy8gd2Ugc2hvdWxkIHJlbG9hZCB0aGUgZW50aXJlIHJ1bnRpbWVcbiAgICAgIGNocm9tZS5ydW50aW1lLnJlbG9hZCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTb21ldGltZXMgd2UgYXJlIG9uIGEgZGlmZmVyZW50IGNvbnRleHRcbiAgICAgIC8vIGZvciBleGFtcGxlIGEgY29udGVudHNjcmlwdFxuICAgICAgLy8gdGhlcmVmb3JlIHdlIG5lZWQgdG8gcmVsb2FkIHZpYVxuICAgICAgLy8gd2luZG93LmxvY2F0aW9uXG4gICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgfVxuICB9XG5cbiAgbG9nKG1lc3NhZ2UsIC4uLmFyZ3MpIHtcbiAgICBjb25zb2xlLmxvZyhgJWNDaHJvbWVSZWxvYWQ6ICR7bWVzc2FnZX1gLCAnY29sb3I6IGdyYXk7JywgLi4uYXJncyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hyb21lUmVsb2FkO1xuIl19