var React = require("react");
var helper = require("./../../../utils/helper");
var NotificationSystem = require('react-notification-system');

var ShelterProfile = React.createClass({
    _notificationSystem: null,
    getInitialState: function () {
        return {
            name: this.props.shelterInfo.name,
            role: this.props.shelterInfo.role,
            emailId: this.props.shelterInfo.emailId,
            address: this.props.shelterInfo.address,
            location: this.props.shelterInfo.location
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
            name: this.state.newShelterName,
            location: this.state.newShelterLocation,
            address: this.state.newShelterAddress
        }).then((user) => {
            helper.default.getMyInfo().then((userUpdated) => {
                this.setState({
                    name: userUpdated.data.name,
                    location: userUpdated.data.location,
                    address: userUpdated.data.address
                });
                this._notificationSystem.addNotification({
                    message: 'New information saved',
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
                                    <input type="text" defaultValue={this.state.name} className="form-control" id="newShelterName" onChange={this.handleChange} required />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="newShelterLocation">Location</label>
                                    <input type="text" defaultValue={this.state.location} className="form-control" id="newShelterLocation" onChange={this.handleChange} required />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="newShelterAddress">Address</label>
                                    <textarea defaultValue={this.state.address} className="form-control" id="newShelterAddress" onChange={this.handleChange} rows = "3" required />

                                </div>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
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
                    ShelterProfile
                    <p> {this.state.name} </p>
                    <p> {this.state.role} </p>
                    <p> {this.state.emailId} </p>
                    <p> {this.state.address} </p>
                    <p> {this.state.location} </p>
                    <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#shelter-profile-edit">Edit</button>
                    {this.renderEditModal()}
                </div>
            </div>
        );
    }
});
module.exports = ShelterProfile;