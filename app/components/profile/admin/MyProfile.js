var React = require("react");
var helper = require("./../../../utils/helper");



var MyProfile = React.createClass({

    getInitialState: function () {
        return {
            name: this.props.myInfo.name,
            role: this.props.myInfo.role,
            emailId: this.props.myInfo.emailId,
            address: this.props.myInfo.address,
            location: this.props.myInfo.location
        }
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
            this.setState({
                name: this.state.newName,
                location: this.state.newLocation,
                address: this.state.newAddress
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
                                    <label htmlFor="newAddress">Address</label>
                                    <input type="text" defaultValue={this.state.address} className="form-control" id="newAddress" onChange={this.handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="newLocation">Location</label>
                                    <input type="text" defaultValue={this.state.location} className="form-control" id="newLocation" onChange={this.handleChange} required />
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
            <div id="my-profile" className="tab-pane fade in active">
                <div className="row">
                    MyProfile
                    <p> {this.state.name} </p>
                    <p> {this.state.role} </p>
                    <p> {this.state.emailId} </p>
                    <p> {this.state.address} </p>
                    <p> {this.state.location} </p>
                    <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#my-profile-edit">Edit</button>
                    {this.renderEditModal()}
                </div>
            </div>
        );
    }
});
module.exports = MyProfile;