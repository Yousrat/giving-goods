var React = require("react");

var ShelterNavTab = React.createClass({
    render: function () {
        return (
            <ul className="nav nav-tabs">
                <li className="active"><a data-toggle="tab" href="#shelter-profile"><span className="glyphicon glyphicon-user"></span> My profile</a></li>
                <li><a data-toggle="tab" href="#add-people"><span className="glyphicon glyphicon-plus"></span> Add people</a></li>
                <li><a data-toggle="tab" href="#manage-people"><span className="glyphicon glyphicon-edit"></span> Manage people</a></li>
            </ul>
        );
    }
});
module.exports = ShelterNavTab;