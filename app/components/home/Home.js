var React = require("react");
var Banner = require("./Banner");
var ContactUs = require("./ContactUs");
var AboutUS = require("./AboutUS");

var Home = React.createClass({
    render: function () {
        return (
            <div className="container-fluid">
                <Banner />
                <AboutUS />
                <ContactUs />
            </div>
        );
    }
});
module.exports = Home;