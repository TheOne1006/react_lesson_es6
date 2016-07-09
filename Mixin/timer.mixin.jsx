/**
 * 简易 mixin
 */

var IntervalMixin = function (interval) {
  return {
    componentDidMount: function () {
      this._interval = setInterval(this.onTick, interval);
    },
    componentWillUnmount: function () {
      clearInterval(this._interval);
    }
  }
}

var Timer = React.createClass({
  mixins: [IntervalMixin(1000)],
  getInitialState: function() {
    return { secondsElapsed: 0 };
  },
  onTick: function() {
    this.setState({ secondsElapsed: this.state.secondsElapsed + 1 });
  },
  render: function () {
    return (
      <div>
        Seconds Elapsed: {this.state.secondsElapsed}
      </div>
    );
  }
});

ReactDOM.render(
  <Timer />,
  document.getElementById('content')
);



/**
 * 更易于扩展版
 */

var intervalMixin2 = {
  setInterval: function (callback, interval) {
    var token = setInterval(callback, interval);
    this._intervals.push(token);
    return token;
  },
  componentDidMount: function () {
    this._intervals = []
  },
  componentWillUnmount: function () {
    this._intervals.map(clearInterval);
  }
}


var Timer2 = React.createClass({
  mixins: [intervalMixin2],
  getInitialState: function() {
    return { secondsElapsed: 3 };
  },
  onTick: function() {
    this.setState({ secondsElapsed: this.state.secondsElapsed + 1 });
  },
  componentDidMount: function () {
    this.setInterval(this.onTick, 1000);
  },
  render: function () {
    return (
      <div>
        Seconds Elapsed: {this.state.secondsElapsed}
      </div>
    );
  }
});

ReactDOM.render(
  <Timer2 />,
  document.getElementById('content2')
);
