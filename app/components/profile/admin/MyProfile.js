var React = require("react");
var helper = require("./../../../utils/helper");
var NotificationSystem = require('react-notification-system');


var MyProfile = React.createClass({
    _notificationSystem: null,
    getInitialState: function () {
        return {
            name: this.props.myInfo.name,
            role: this.props.myInfo.role,
            emailId: this.props.myInfo.emailId,
            address: this.props.myInfo.address,
            location: this.props.myInfo.location
        }
    },
    componentDidMount: function () {
        this._notificationSystem = this.refs.notificationSystem;
    },

    handleChange: function (event) {
        var newState = {};
        newState[event.target.id] = event.target.value;
        this.setState(newState);
    },
    handleSubmit: function (event) {
        event.preventDefault();
        helper.default.updateMyInfo({
            name: this.state.newName,
            location: this.state.newLocation,
            address: this.state.newAddress
        }).then((user) => {
            helper.default.getMyInfo().then((userUpdated) => {
                this.setState({
                    name: userUpdated.data.name,
                    location: userUpdated.data.location,
                    address: userUpdated.data.address
                });
                this._notificationSystem.addNotification({
                    message: 'New Information Saved',
                    level: 'success',
                    position: 'tr'
                });
            });
        });
    },
    renderEditModal: function () {
        return (
            <div id="my-profile-edit" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Edit Your Info</h4>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="newName">Name</label>
                                    <input type="text" defaultValue={this.state.name} className="form-control" id="newName" onChange={this.handleChange} required />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="newLocation">Location</label>
                                    <input type="text" defaultValue={this.state.location} className="form-control" id="newLocation" onChange={this.handleChange} required />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="newAddress">Address</label>
                                    <textarea defaultValue={this.state.address} className="form-control" id="newAddress" onChange={this.handleChange} rows="3" required />

                                </div>
                                <button type="submit" className="btn btn-default btn-sm">Save</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default btn-sm" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    },

    render: function () {
        return (
            <div id="my-profile" className="tab-pane fade in active">
                <NotificationSystem ref="notificationSystem" />
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <table className="table">
                            <tbody>
                                <tr className="table-warning">
                                    <td className="no-border-top"> <b>Name:</b></td>
                                    <td className="no-border-top capitalize-name">{this.state.name}</td>
                                </tr>
                                <tr>
                                    <td><b>Role:</b></td>
                                    <td>{this.state.role}</td>
                                </tr>
                                <tr>
                                    <td><b>Email:</b></td>
                                    <td>{this.state.emailId}</td>
                                </tr>
                                <tr>
                                    <td><b>Address:</b></td>
                                    <td>{this.state.address}</td>
                                </tr>
                                <tr>
                                    <td><b>Location:</b></td>
                                    <td>{this.state.location}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="button" className="btn btn-default btn-sm" data-toggle="modal" data-target="#my-profile-edit">Edit</button>
                        {this.renderEditModal()}
                    </div>
                </div>
            </div>
        );
    }
});
module.exports = MyProfile;