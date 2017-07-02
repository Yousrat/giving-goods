var React = require("react");
var helpers = require("./../../utils/helper");
import Login from "./Login";
import { browserHistory } from 'react-router';

var Shelter = React.createClass({
    getInitialState: function () {
        return {
            ifLoggedIn: undefined
        }
    },
    componentDidMount: function () {
        helpers.default.getMyInfo().then(function (userInfo) {
            if (userInfo.data) {
                this.setState({ ifLoggedIn: true });
                browserHistory.push('/profile');
            } else {
                this.setState({ ifLoggedIn: false });
            }
        }.bind(this));
    },
    render: function () {
        return (
            <div className="container" id="login-container">
                <h1>Shelter login</h1>
                <Login />
            </div>
        );
    }
});
module.exports = Shelter;