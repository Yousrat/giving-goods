var React = require("react");
var NotificationSystem = require('react-notification-system');
var helpers = require("./../../utils/helper");
import { browserHistory } from 'react-router';

var Login = React.createClass({
    _notificationSystem: null,
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
        helpers.default.loginUser({
            username: this.state.username,
            password: this.state.password,
        }).then((user) => {
            if (!user) {
                this._notificationSystem.addNotification({
                    message: 'Incorrect username/password',
                    level: 'error',
                    position: 'tl'
                });
                browserHistory.push('/shelter');
            } else {
                browserHistory.push('/profile');
            }
        });
    },
    render: function () {
        return (
            <div className="row" id="login">
                <NotificationSystem ref="notificationSystem" />
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input type="text" placeholder="Enter email-id" className="form-control" id="username" onChange={this.handleChange} required />
                    </div>
                    <div className="form-group">
                        <input type="password" placeholder="Enter password" className="form-control" id="password" onChange={this.handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary button-signin">Sign In</button>
                </form>
            </div>
        );
    }
});
module.exports = Login;