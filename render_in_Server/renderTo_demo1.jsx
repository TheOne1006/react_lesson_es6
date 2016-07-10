var React = require('react');
var ReactDOMServer = require('react-dom/server');

class MyComponent extends React.Component {
  render() {
    return <div>Hello World</div>;
  }
}

var componentStr = ReactDOMServer.renderToString(<MyComponent />);

console.log('componentStr: %s', componentStr);
// output : <div data-reactroot="" data-reactid="1" data-react-checksum="999625590">Hello World</div>

/**
 * renderToStaticMarkup
 */

var componentStr2 = ReactDOMServer.renderToStaticMarkup(<MyComponent />);
console.log('componentStr2: %s', componentStr2);
