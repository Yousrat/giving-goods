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
            password: this.state.newUserPassword,
            location: this.state.newUserLocation
        }).then((myUpdatedInfo) => {
            if (myUpdatedInfo) {
                this._notificationSystem.addNotification({
                    message: 'New User Added',
                    level: 'success',
                    position: 'tr'
                });
                helper.default.getAllUsers().then(function (allUsersInfo) {
                    this.props.resetUsers(allUsersInfo.data);
                }.bind(this));
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
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <h4>Enter User Details</h4>
                        <br />
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input type="text" placeholder="User Email Address" className="form-control" id="newUserEmailId" name="newUserEmailId" onChange={this.handleChange} required />
                            </div>
                            <div className="form-group">
                                <select className="form-control" id="newUserRole" name="newUserRole" onChange={this.handleChange} required>
                                    <option value="">Select Role</option>
                                    <option value="shelter">Shelter</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <input type="text" placeholder="Temporary Password" className="form-control" id="newUserPassword" name="newUserPassword" onChange={this.handleChange} required />
                            </div>
                            <div className="form-group">
                                <select className="form-control" id="newUserLocation" name="newUserLocation" onChange={this.handleChange} required>
                                    <option value="">Select Location</option>
                                    <option value="North Coast">North Coast</option>
                                    <option value="North Inland">North Inland</option>
                                    <option value="Central Coast">Central Coast</option>
                                    <option value="Central City">Central City</option>
                                    <option value="East County">East County</option>
                                    <option value="South Bay">South Bay</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-default btn-sm" >Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});
module.exports = AddUser;