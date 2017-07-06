var React = require("react");
var NotificationSystem = require('react-notification-system');
var helper = require("./../../../utils/helper");

var AddPeople = React.createClass({
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
        var newUserInfo = {
            firstName: this.state.newPeopleFirstName,
            lastName: this.state.newPeopleLastName,
            peopleCode: this.state.newPeopleCode,
            peopleImage: this.state.newPeopleImage,
            ageGroup: this.state.newPeopleAgeGroup,
            gender: this.state.newPeopleGender,
            peopleNotes: this.state.newPeopleNotes
        };
        helper.default.addNewPeople(newUserInfo).then((newUser) => {
            if (newUser) {
                this._notificationSystem.addNotification({
                    message: 'New User Added',
                    level: 'success',
                    position: 'tr'
                });
                helper.default.findMyPeople().then(function (peopleArray) {
                    this.props.resetPeople(peopleArray.data);
                }.bind(this));
            } else {
                this._notificationSystem.addNotification({
                    message: 'Error',
                    level: 'error',
                    position: 'tr'
                });
            }
        });
        document.getElementById("add-people-form").reset();
    },
    render: function () {
        return (
            <div id="add-people" className="tab-pane fade">
                <NotificationSystem ref="notificationSystem" />

                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <form id="add-people-form" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input type="text" placeholder="First Name" className="form-control" name="newPeopleFirstName" onChange={this.handleChange} required />
                            </div>
                            <div className="form-group">
                                <input type="text" placeholder="Last Name" className="form-control" name="newPeopleLastName" onChange={this.handleChange} required />
                            </div>
                            <div className="form-group">
                                <input type="text" placeholder="Case ID" className="form-control" name="newPeopleCode" onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <input type="text" placeholder="Image URL" className="form-control" name="newPeopleImage" onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <select className="form-control" name="newPeopleAgeGroup" onChange={this.handleChange} required>
                                    <option value="">Age Group</option>
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
                                <select className="form-control" name="newPeopleGender" onChange={this.handleChange} required>
                                    <option value="">Gender</option>
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <textarea rows="4" placeholder="Short Bio" className="form-control" name="newPeopleNotes" onChange={this.handleChange} />
                            </div>
                            <button type="submit" className="btn btn-default btn-sm" >Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});
module.exports = AddPeople;