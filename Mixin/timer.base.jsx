var Timer = React.createClass({
  getInitialState: function() {
    return { secondsElapsed: 0 };
  },
  tick: function() {
    this.setState({ secondsElapsed: this.state.secondsElapsed + 1 });
  },
  componentDidMount: function () {
    this.interval = setInterval(this.tick, 1000);
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
