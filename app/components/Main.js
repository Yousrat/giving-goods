var React = require("react");
import Navbar from "./Navbar";
import Footer from "./Footer";

var Main = React.createClass({
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
