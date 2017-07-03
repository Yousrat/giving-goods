var React = require("react");
var NotificationSystem = require('react-notification-system');
var helper = require("./../../../utils/helper");

var ManageUsers = React.createClass({
    _notificationSystem: null,
    getInitialState: function () {
        return {
            allUsersList: [],
            myId: this.props.myData._id
        }
    },
    componentDidMount: function () {
        helper.default.getAllUsers().then((allUsersInfo) => {
            this.setState({ allUsersList: allUsersInfo.data });
        });
        this._notificationSystem = this.refs.notificationSystem;
    },
    handleSuspend: function (userId, event) {
        event.preventDefault();
        helper.default.suspendUser({ id: userId }).then((userInfo) => {
            helper.default.getAllUsers().then((allUsersInfo) => {
                this.setState({ allUsersList: allUsersInfo.data });
            });
            this._notificationSystem.addNotification({
                message: 'Suspended the Account',
                level: 'warning',
                position: 'tr'
            });
        });
    },
    handleActivate: function (user, event) {
        event.preventDefault();
        var userRole = "";
        if (user.role === "admin") {
            userRole = 1;
        } else {
            userRole = 2;
        }
        helper.default.activateAcc({
            id: user._id,
            privilege: userRole
        }).then((userInfo) => {
            helper.default.getAllUsers().then((allUsersInfo) => {
                this.setState({ allUsersList: allUsersInfo.data });
            });
            this._notificationSystem.addNotification({
                message: 'Activated the Account',
                level: 'success',
                position: 'tr'
            });
        });
    },
    renderUsers: function () {
        return this.state.allUsersList.map((user, index) => {
            if (user._id !== this.state.myId) {
                if (user.privilege === 3) {
                    return (
                        <div className="people-block" key={index}>
                            <p>Role: {user.role}</p>
                            <p>Name: {user.name}</p>
                            <p>Emaid-id: {user.emailId}</p>
                            <p>Location: {user.location}</p>
                            <p>Address: {user.address}</p>
                            <p><span className="label label-success" onClick={this.handleActivate.bind(this, user)}>Activate</span></p>
                        </div>
                    );
                } else {
                    return (
                        <div className="people-block" key={index}>
                            <p>Role: {user.role}</p>
                            <p>Name: {user.name}</p>
                            <p>Emaid-id: {user.emailId}</p>
                            <p>Location: {user.location}</p>
                            <p>Address: {user.address}</p>
                            <p><span className="label label-warning" onClick={this.handleSuspend.bind(this, user._id)}>Suspend</span></p>
                        </div>
                    );
                }
            }
        });
    },
    render: function () {
        return (
            <div id="manage-user" className="tab-pane fade">
                <NotificationSystem ref="notificationSystem" />
                <div className="row">
                    <div id="people-list">
                        {this.renderUsers()}
                    </div>
                </div>
            </div>
        );
    }
});
module.exports = ManageUsers;