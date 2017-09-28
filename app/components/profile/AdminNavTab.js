var React = require("react");
var Link = require("react-router").Link;

var AdminNavTab = React.createClass({
    render: function () {
        return (
            <ul className="nav nav-tabs">
                <li className="active">
                    <Link data-toggle="tab" to={`#my-profile`}><span className="glyphicon glyphicon-user"></span> My Profile</Link>
                </li>
                <li>
                    <Link data-toggle="tab" to={`#add-user`}><span className="glyphicon glyphicon-plus"></span> Add User</Link>
                </li>
                <li>
                    <Link data-toggle="tab" to={`#manage-user`} ><span className="glyphicon glyphicon-edit"></span> Manage Users</Link>
                </li>
            </ul>
        );
    }
});
module.exports = AdminNavTab;