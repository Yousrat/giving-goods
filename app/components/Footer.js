var React = require("react");
var Link = require("react-router").Link;

var Footer = React.createClass({
    render: function () {
        return (
            <div className="row text-center footer">
                <p>Copyright &copy; 2017 REMY</p>
                <Link to="https://github.com/Yousrat/giving-goods">
                    <img id="github" src="/assets/images/Github.png" alt="Github Code" />
                </Link>

            </div>
        );
    }
});
module.exports = Footer;