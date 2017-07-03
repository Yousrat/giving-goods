var React = require("react");
var Footer = React.createClass({
    render: function () {
        return (
            <div className="row text-center footer">
                <p>Copyright &copy; 2017 REMY</p>
                <img id="github" src="/assets/images/Github.png" alt="Github Code"/>
            </div>
        );
    }
});
module.exports = Footer;