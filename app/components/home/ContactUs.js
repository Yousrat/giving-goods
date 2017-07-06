var React = require("react");
var helpers = require("./../../utils/helper");
var NotificationSystem = require('react-notification-system');

var ContactUs = React.createClass({
    _notificationSystem: null,
    handleChange: function (event) {
        var newState = {};
        newState[event.target.id] = event.target.value;
        this.setState(newState);
    },
    componentDidMount: function () {
        this._notificationSystem = this.refs.notificationSystem;
    },

    handleSubmit: function (event) {
        event.preventDefault();
        helpers.default.contactAdmin({
            clientEmail: this.state.clientEmail,
            clientSubject: this.state.clientSubject,
            clientMessage: this.state.clientMessage
        }).then((mailStatus) => {
            console.log(mailStatus);
            this._notificationSystem.addNotification({
                message: 'Message sent, we will get back to you shortly',
                level: 'success',
                position: 'tr'
            });
        });
    },

    render: function () {
        return (
            <div className="row" id="contact-us">
                <NotificationSystem ref="notificationSystem" />
                <div className="col-md-6 col-md-offset-3">
                    <h2>Contact Giving Good(s)</h2>
                    <div className=" panel panel-default">
                        <div className="panel-body" id="contact-us-panel">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <input type="text" placeholder="Your Email Address" className="form-control" id="clientEmail" onChange={this.handleChange} required />
                                </div>
                                <div className="form-group">
                                    <input type="text" placeholder="Subject" className="form-control" id="clientSubject" onChange={this.handleChange} required />
                                </div>
                                <div className="form-group">
                                    <textarea placeholder="Your Message" className="form-control" id="clientMessage" onChange={this.handleChange} rows="5" required />
                                </div>
                                <button type="submit" className="btn btn-default btn-sm">Send</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
module.exports = ContactUs;


