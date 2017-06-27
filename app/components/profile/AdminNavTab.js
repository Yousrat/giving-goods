var React = require("react");

var AdminNavTab = React.createClass({
    render: function () {
        return (
            <ul className="nav nav-tabs">
                <li className="active"><a data-toggle="tab" href="#my-profile"><span className="glyphicon glyphicon-user"></span> My profile</a></li>
                <li><a data-toggle="tab" href="#add-user"><span className="glyphicon glyphicon-plus"></span> Add user</a></li>
                <li><a data-toggle="tab" href="#manage-user"><span className="glyphicon glyphicon-edit"></span> Manage users</a></li>
            </ul>
        );
    }
});
module.exports = AdminNavTab;