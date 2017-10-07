var React = require("react");
var createReactClass = require("create-react-class");
var Banner = require("./Banner");
var ContactUs = require("./ContactUs");
var AboutUS = require("./AboutUS");

var Home = createReactClass({
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