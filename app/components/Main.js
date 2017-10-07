var React = require("react");
var createReactClass = require("create-react-class");
import Navbar from "./Navbar";
import Footer from "./Footer";

var Main = createReactClass({
  render: function () {
    return (
      <div className="container-fluid" id="main-container">
        <Navbar />
        {this.props.children}
        <Footer />
      </div>
    );
  }
});

module.exports = Main;
