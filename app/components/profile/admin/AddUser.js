var React = require("react");
var NotificationSystem = require('react-notification-system');
var helper = require("./../../../utils/helper");

var AddUser = React.createClass({
    _notificationSystem: null,
    componentDidMount: function () {
        this._notificationSystem = this.refs.notificationSystem;
    },
    handleChange: function (event) {
        let newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    },
    handleSubmit: function (event) {
        event.preventDefault();
        var userPrivilege = null;
        if (this.state.newUserRole === "admin") {
            userPrivilege = 1;
        } else {
            userPrivilege = 2;
        }
        helper.default.addNewUser({
            role: this.state.newUserRole,
            privilege: userPrivilege,
            emailId: this.state.newUserEmailId,
            password: this.state.newUserPassword
        }).then((myUpdatedInfo) => {
            if (myUpdatedInfo) {
                this._notificationSystem.addNotification({
                    message: 'New user added',
                    level: 'success',
                    position: 'tr'
                });
            } else {
                this._notificationSystem.addNotification({
                    message: 'Error',
                    level: 'error',
                    position: 'tr'
                });
            }
        });
    },
    render: function () {
        return (
            <div id="add-user" className="tab-pane fade">
                <NotificationSystem ref="notificationSystem" />
                Add user
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="newUserEmailId">User Email-id:</label>
                                <input type="text" className="form-control" id="newUserEmailId" name="newUserEmailId" onChange={this.handleChange} required />
                            </div>
                            <div className="form-group">
                                <select className="form-control" name="newUserRole" onChange={this.handleChange} required>
                                    <option value="">Select</option>
                                    <option value="shelter">Shelter</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="newUserPassword">Temporary password:</label>
                                <input type="text" className="form-control" id="newUserPassword" name="newUserPassword" onChange={this.handleChange} required />
                            </div>
                            <button type="submit" className="btn btn-success" >Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});
module.exports = AddUser;