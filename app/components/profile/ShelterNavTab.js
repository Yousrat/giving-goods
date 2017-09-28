var React = require("react");
var Link = require("react-router").Link;

var ShelterNavTab = React.createClass({
    render: function () {
        return (
            <ul className="nav nav-tabs">
                <li className="active">
                    <Link data-toggle="tab" to={`#shelter-profile`} href="#shelter-profile"><span className="glyphicon glyphicon-user"></span> My Profile</Link>
                </li>
                <li>
                    <Link data-toggle="tab" to={`#add-people`}><span className="glyphicon glyphicon-plus"></span> Add People</Link>
                </li>
                <li>
                    <Link data-toggle="tab" to={`#manage-people`}><span className="glyphicon glyphicon-edit"></span> Manage People</Link>
                </li>
            </ul>
        );
    }
});
module.exports = ShelterNavTab;