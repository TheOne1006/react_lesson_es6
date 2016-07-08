var CountryDropdown = React.createClass({
  getInitialState: function () {
    return {
      showOptions: false
    };
  },
  render: function () {
    var options;

    if (this.state.showOptions) {
      options = (
        <ul className='options'>
          <li>United States of America</li>
          <li>Neww Zealand</li>
          <li>Denmark</li>
        </ul>
      );
    }

    return (
      <div className="dropdown" onClick={this.handleClick}>
        <label> Choose a country </label>. {options}
      </div>
    );
  },

  handleClick: function () {

    this.setState({
      showOptions: !(this.state.showOptions)
    });
  }
});

ReactDOM.render( <CountryDropdown />,
	document.getElementById('content')
	);
