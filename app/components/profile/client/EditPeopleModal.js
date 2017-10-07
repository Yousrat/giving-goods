var React = require("react");
var createReactClass = require("create-react-class");
var NotificationSystem = require('react-notification-system');
var helper = require("./../../../utils/helper");

var EditPeopleModal = createReactClass({
    _notificationSystem: null,
    getInitialState: function () {
        return {
            peopleDetails: []
        }
    },
    componentDidMount: function () {
        this._notificationSystem = this.refs.notificationSystem;
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({ peopleDetails: nextProps.peopleData });
    },
    handlePeopleEditChange: function (event) {
        var newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    },
    handlePeopleEditSubmit: function (event) {
        event.preventDefault();
        var peopleUpdatedInfo = {
            peopleId: this.state.peopleDetails._id,
            firstName: this.state.updatePeopleFirstName ? this.state.updatePeopleFirstName : this.state.peopleDetails.person_first_name,
            lastName: this.state.updatePeopleLastName ? this.state.updatePeopleLastName : this.state.peopleDetails.person_last_name,
            peopleCode: this.state.updatePeopleCode ? this.state.updatePeopleCode : this.state.peopleDetails.person_code,
            peopleImage: this.state.updatePeopleImage ? this.state.updatePeopleImage : this.state.peopleDetails.person_image,
            ageGroup: this.state.updatePeopleAgeGroup ? this.state.updatePeopleAgeGroup : this.state.peopleDetails.age_group,
            gender: this.state.updatePeopleGender ? this.state.updatePeopleGender : this.state.peopleDetails.gender,
            peopleNotes: this.state.updatePeopleNotes ? this.state.updatePeopleNotes : this.state.peopleDetails.notes
        };
        helper.default.updatePeople(peopleUpdatedInfo).then((peopleUpdated) => {
            if (peopleUpdated) {
                helper.default.findMyPeople().then(function (peopleArray) {
                    this.props.resetPeople(peopleArray.data);
                }.bind(this));
                this._notificationSystem.addNotification({
                    message: 'Updated Info',
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
        this.setState({
            updatePeopleFirstName: "",
            updatePeopleLastName: "",
            updatePeopleCode: "",
            updatePeopleImage: "",
            updatePeopleAgeGroup: "",
            updatePeopleGender: "",
            updatePeopleNotes: "",
        });
    },
    renderEditPeopleModal: function () {
        return (
            <div id="editPeopleModal" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Edit <span className="capitalize-name">{this.state.peopleDetails.person_first_name + " " + this.state.peopleDetails.person_last_name + "'s"} </span>Information</h4>
                        </div>
                        <div className="modal-body">
                            <form id="edit-people-form" onSubmit={this.handlePeopleEditSubmit}>
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input type="text" className="form-control" name="updatePeopleFirstName" id="updatePeopleFirstName" defaultValue={this.state.peopleDetails.person_first_name} onChange={this.handlePeopleEditChange} />
                                </div>
                                <div className="form-group">
                                    <label >Last Name</label>
                                    <input type="text" className="form-control" name="updatePeopleLastName" id="updatePeopleLastName" defaultValue={this.state.peopleDetails.person_last_name} onChange={this.handlePeopleEditChange} />
                                </div>
                                <div className="form-group">
                                    <label>Case ID</label>
                                    <input type="text" className="form-control" name="updatePeopleCode" id="updatePeopleCode" defaultValue={this.state.peopleDetails.person_code} onChange={this.handlePeopleEditChange} />
                                </div>
                                <div className="form-group">
                                    <label>Image URL</label>
                                    <input type="text" className="form-control" name="updatePeopleImage" id="updatePeopleImage" defaultValue={this.state.peopleDetails.person_image} onChange={this.handlePeopleEditChange} />
                                </div>
                                <div className="form-group">
                                    <label >Age Group</label>
                                    <select className="form-control" name="updatePeopleAgeGroup" id="updatePeopleAgeGroup" defaultValue={this.state.peopleDetails.age_group} onChange={this.handlePeopleEditChange} >
                                        <option value="">Select Age Group</option>
                                        <option value="01-05">01-05</option>
                                        <option value="06-12">06-12</option>
                                        <option value="13-19">13-19</option>
                                        <option value="20-40">20-40</option>
                                        <option value="41-50">41-50</option>
                                        <option value="51-60">51-60</option>
                                        <option value="60-Above">60-Above</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label >Gender</label>
                                    <select className="form-control" name="updatePeopleGender" id="updatePeopleGender" defaultValue={this.state.peopleDetails.gender} onChange={this.handlePeopleEditChange} >
                                        <option value="">Select Gender</option>
                                        <option value="Female">Female</option>
                                        <option value="Male">Male</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Short Bio</label>
                                    <textarea rows="4" className="form-control" name="updatePeopleNotes" id="updatePeopleNotes" defaultValue={this.state.peopleDetails.notes} onChange={this.handlePeopleEditChange} />
                                </div>
                                <button type="submit" className="btn btn-default btn-sm">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    render: function () {
        return (
            <div className="row">
                <NotificationSystem ref="notificationSystem" />
                {this.renderEditPeopleModal()}
            </div>
        );
    }
});
module.exports = EditPeopleModal;