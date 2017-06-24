var React = require("react");
var Link = require("react-router").Link;
var helpers = require("./../../utils/helper");

var Profile = React.createClass({
    handleClick: function (event) {
        helpers.default.logoutUser();
    },
    render: function () {
        return (
            <div className="container">
                <Link to="/home" onClick={this.handleClick}><span className="glyphicon glyphicon-log-out"></span> Logout</Link>
                <h1>Profile page</h1>   
            </div>
        );
    }
});
module.exports = Profile;