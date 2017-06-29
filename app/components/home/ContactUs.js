var React = require("react");
var helpers = require("./../../utils/helper");
var NotificationSystem = require('react-notification-system');

var ContactUs = React.createClass({

    handleChange: function (event) {
        var newState = {};
        newState[event.target.id] = event.target.value;
        this.setState(newState);
    },

    handleSubmit: function (event) {
        event.preventDefault();
        helpers.default.contactAdmin({
            clientEmail: this.state.clientEmail,
            clientSubject: this.state.clientSubject,
            clientMessage: this.state.clientMessage
        }).then((mailStatus) => {
            console.log(mailStatus);
        });
    },

    render: function () {
        return (
            <div className="row" id="contact-us">
                <div className="col-md-6 col-md-offset-3">
                    <div className=" panel panel-default">
                        <div className="panel-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="clientEmail">Email</label>
                                    <input type="text" placeholder="Enter your email address" className="form-control" id="clientEmail" onChange={this.handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="clientSubject">Subject</label>
                                    <input type="text" placeholder="Enter Subject" className="form-control" id="clientSubject" onChange={this.handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="clientMessage">Message</label>
                                    <textarea placeholder="Write your message here" className="form-control" id="clientMessage" onChange={this.handleChange} rows = "5" required />
                                </div>
                                <button type="submit" className="btn btn-primary">Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
module.exports = ContactUs;