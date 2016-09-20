class ChromeReload {
  constructor(args = {}) {
    const {
      host = 'localhost',
      port = 35729,
      reconnectTime = 3000,
      debug = true
    } = args;

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

  connect() {
    this.connection = new WebSocket(`ws://${this.host}:${this.port}/livereload`);
    this.connection.onopen = this.onopen;
    this.connection.onmessage = this._onmessage;
    this.connection.onerror = this.onerror;
    this.connection.onclose = this.onclose;
  }

  onopen() {
    this.log('Enabled');
    this.state.connected = true;
  }

  onerror(error) {
    this.log('Connection error');
    this.state.connected = false;
    this.state.connectionLost = true;
  }

  _onmessage(event) {
    if (event.data) {
      this.onmessage(
        JSON.parse(event.data)
      );
    }
  }

  onmessage({
    command,
    path
  }) {
    const connectionLost = this.state.connectionLost;
    const scriptreload = /\.js$/.test(path);

    if (command === 'reload') {

      if (connectionLost && !scriptreload) {
        this.log('Waiting for scripts to be ready.');
        return;
      }

      this.state.connectionLost = false;
      this.reload();
    }
  }

  onclose() {
    this.log('Connection lost. Reconnecting in %ss', this.reconnectTime);
    setTimeout(this.connect, this.reconnectTime);
  }

  reload() {
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

  log(message, ...args) {
    if(this.debug) {
      console.log(`%cChromeReload: ${message}`, 'color: gray;', ...args);
    }
  }
}

export default ChromeReload;
