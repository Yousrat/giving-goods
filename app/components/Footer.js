var React = require("react");
var createReactClass = require("create-react-class");
var Footer = createReactClass({
    render: function () {
        return (
            <div className="row text-center footer">
                <p>Copyright &copy; 2017 REMY</p>
                <a href="https://github.com/Yousrat/giving-goods">
                    <img id="github" src="/assets/images/Github.png" alt="Github Code" />
                </a>
            </div>
        );
    }
});
module.exports = Footer;