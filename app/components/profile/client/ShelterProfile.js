var React = require("react");
var createReactClass = require("create-react-class");
var helper = require("./../../../utils/helper");
var NotificationSystem = require('react-notification-system');

var ShelterProfile = createReactClass({
    _notificationSystem: null,
    getInitialState: function () {
        return {
            name: this.props.shelterInfo.name,
            role: this.props.shelterInfo.role,
            emailId: this.props.shelterInfo.emailId,
            address: this.props.shelterInfo.address,
            phone: this.props.shelterInfo.phone,
            location: this.props.shelterInfo.location
        }
    },
    componentDidMount: function () {
        this._notificationSystem = this.refs.notificationSystem;
    },

    handleChange: function (event) {
        var newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    },
    handleSubmit: function (event) {
        event.preventDefault();
        helper.default.updateMyInfo({
            name: this.state.newShelterName,
            location: this.state.newShelterLocation,
            address: this.state.newShelterAddress,
            phone: this.state.newShelterPhone
        }).then((user) => {
            helper.default.getMyInfo().then((userUpdated) => {
                this.setState({
                    name: userUpdated.data.name,
                    location: userUpdated.data.location,
                    address: userUpdated.data.address,
                    phone: userUpdated.data.phone,
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
            <div id="shelter-profile-edit" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Edit Your Info</h4>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="newShelterName">Name</label>
                                    <input type="text" defaultValue={this.state.name} className="form-control" id="newShelterName" name="newShelterName" onChange={this.handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="newShelterLocation">Location</label>
                                    <select className="form-control" defaultValue={this.state.location} id="newShelterLocation" name="newShelterLocation" onChange={this.handleChange} required>
                                        <option value="">Select location</option>
                                        <option value="North Coast">North Coast</option>
                                        <option value="North Inland">North Inland</option>
                                        <option value="Central Coast">Central Coast</option>
                                        <option value="Central City">Central City</option>
                                        <option value="East County">East County</option>
                                        <option value="South Bay">South Bay</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="newShelterAddress">Address</label>
                                    <textarea defaultValue={this.state.address} className="form-control" id="newShelterAddress" name="newShelterAddress" onChange={this.handleChange} rows="3" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="newShelterPhone">Phone</label>
                                    <input type="text" defaultValue={this.state.phone} className="form-control" id="newShelterPhone" name="newShelterPhone" onChange={this.handleChange} required />
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
            <div id="shelter-profile" className="tab-pane fade in active">
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
                                    <td><b>Phone:</b></td>
                                    <td>{this.state.phone}</td>
                                </tr>
                                <tr>
                                    <td><b>Location:</b></td>
                                    <td>{this.state.location}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="button" className="btn btn-default btn-sm" data-toggle="modal" data-target="#shelter-profile-edit">Edit</button>
                        {this.renderEditModal()}
                    </div>
                </div>
            </div>
        );
    }
});
module.exports = ShelterProfile;